#!/usr/bin/env node
/* Merge a research segment file into js/data.js and js/media.js.
   Usage: node scripts/merge-segment.js path/to/segment.json [more.json ...]
   Segment shape: { players:{id:{...}}, cities:[...], countries:[...], media:{id:{...}} }
   New players/countries/cities are appended; deployments for an existing city id are
   added to that city. Existing players are never overwritten. */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const dataPath = path.join(root, "js/data.js"), mediaPath = path.join(root, "js/media.js");

function load(file) { const w = {}; global.window = w; delete require.cache[require.resolve(file)]; require(file); return w; }
const js = (v, indent) => JSON.stringify(v, null, 2).split("\n").map((l, i) => (i ? indent : "") + l).join("\n");

let data = fs.readFileSync(dataPath, "utf8");
const media = load(mediaPath).MEDIA;
const M = load(dataPath).MARKET;
const yt = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
const report = { players: [], cities: [], countries: [], deployments: 0, skipped: [] };

for (const file of process.argv.slice(2)) {
  const seg = JSON.parse(fs.readFileSync(file, "utf8"));
  const countryIds = new Set(M.countries.map(c => c.id));
  /* countries */
  for (const c of seg.countries || []) {
    if (countryIds.has(c.id)) continue;
    if (!/^\d{3}$/.test(c.iso)) { report.skipped.push(`country ${c.id}: bad iso`); continue; }
    M.countries.push(c); countryIds.add(c.id); report.countries.push(c.id);
    data = data.replace(/\n  \],\n\n  \/\* -+ \*\/\n  \/\* Each city lists/, `\n    ${js(c, "    ")},\n  ],\n\n  /* ---------------------------------------------------------------- */\n  /* Each city lists`);
  }
  /* players */
  for (const [id, p] of Object.entries(seg.players || {})) {
    if (M.players[id]) { report.skipped.push(`player ${id}: exists`); continue; }
    if (!countryIds.has(p.country)) { report.skipped.push(`player ${id}: unknown country ${p.country}`); continue; }
    if (!(p.categories || []).every(t => M.tech[t])) { report.skipped.push(`player ${id}: bad category`); continue; }
    for (const k of ["develops", "uses", "partners"]) p[k] = p[k] || [];
    M.players[id] = p; report.players.push(id);
    data = data.replace(/\n  \},\n\n  \/\* -+ \*\/\n  countries: \[/, `\n    ${id}: ${js(p, "    ")},\n  },\n\n  /* ---------------------------------------------------------------- */\n  countries: [`);
  }
  /* cities & deployments */
  for (const c of seg.cities || []) {
    const deps = (c.deployments || []).filter(d => {
      const ok = M.players[d.player] && M.tech[d.tech] && Number.isInteger(d.since) && ["active", "pilot", "ended"].includes(d.status);
      if (!ok) report.skipped.push(`deployment ${c.id}/${d.player}: invalid`);
      return ok;
    });
    if (!deps.length) continue;
    const existing = M.cities.find(x => x.id === c.id);
    if (existing) {
      const fresh = deps.filter(d => !existing.deployments.some(e => e.player === d.player && e.tech === d.tech));
      if (!fresh.length) continue;
      existing.deployments.push(...fresh); report.deployments += fresh.length;
      const re = new RegExp(`(\\{ id: "${c.id}",[\\s\\S]*?deployments: \\[)`);
      if (!re.test(data)) { report.skipped.push(`city ${c.id}: could not locate in data.js`); continue; }
      data = data.replace(re, `$1\n${fresh.map(d => `        ${JSON.stringify(d)},`).join("\n")}`);
    } else {
      if (!countryIds.has(c.country) || typeof c.lat !== "number" || typeof c.lon !== "number") { report.skipped.push(`city ${c.id}: bad country or coords`); continue; }
      c.deployments = deps; M.cities.push(c); report.cities.push(c.id); report.deployments += deps.length;
      const block = `    { id: ${JSON.stringify(c.id)}, name: ${JSON.stringify(c.name)}, country: ${JSON.stringify(c.country)}, lat: ${c.lat}, lon: ${c.lon},\n      deployments: [\n${deps.map(d => `        ${JSON.stringify(d)},`).join("\n")}\n      ] },`;
      data = data.replace(/\n  \],\n\};\s*$/, `\n${block}\n  ],\n};\n`);
    }
  }
  /* media */
  for (const [id, m] of Object.entries(seg.media || {})) {
    if (!M.players[id] || media[id]) continue;
    if (m.video && !(m.video.url && yt.test(m.video.url))) m.video = null;
    if (m.video) m.video.url = `https://www.youtube.com/watch?v=${yt.exec(m.video.url)[1]}`;
    if (m.image && m.image.file) { if (!m.image.file.startsWith("File:")) m.image.file = "File:" + m.image.file; m.image.page = m.image.page || "https://commons.wikimedia.org/wiki/" + m.image.file.replace(/ /g, "_"); } else m.image = null;
    m.deploymentVideos = (m.deploymentVideos || []).filter(v => v && v.url && yt.test(v.url)).map(v => ({ city: v.city, url: `https://www.youtube.com/watch?v=${yt.exec(v.url)[1]}`, title: v.title || "" }));
    media[id] = m;
  }
}
fs.writeFileSync(dataPath, data);
const header = fs.readFileSync(mediaPath, "utf8").split("window.MEDIA")[0];
fs.writeFileSync(mediaPath, header + "window.MEDIA = " + JSON.stringify(media, null, 2) + ";\n");
/* verify the rewritten data file still loads and cross-references */
const check = load(dataPath).MARKET;
const ids = new Set(check.countries.map(c => c.id));
check.cities.forEach(c => c.deployments.forEach(d => { if (!check.players[d.player] || !check.tech[d.tech] || !ids.has(c.country)) throw new Error("bad reference in " + c.id); }));
console.log(JSON.stringify(report, null, 2));
console.log(`now ${Object.keys(check.players).length} players, ${check.cities.length} cities, ${check.countries.length} countries`);
