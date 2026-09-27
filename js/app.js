/* ==================================================================
   Retail Autonomous Robotics Market Map — application
   Depends on: d3 v7, topojson-client, window.WORLD_TOPO, window.MARKET
   ================================================================== */
(function () {
  "use strict";
  const M = window.MARKET;
  const TECH_IDS = Object.keys(M.tech);
  const STATUS_IDS = Object.keys(M.statuses);
  const ROLE_IDS = Object.keys(M.roles);
  const YEAR_MIN = 2016, YEAR_MAX = 2026;
  const countryById = Object.fromEntries(M.countries.map(c => [c.id, c]));
  const countryByIso = Object.fromEntries(M.countries.map(c => [c.iso, c]));
  const cityById = Object.fromEntries(M.cities.map(c => [c.id, c]));

  const REGIONS = [
    { id: "world", label: "World" },
    { id: "namerica", label: "North America", bbox: [[-130, 18], [-60, 55]] },
    { id: "europe", label: "Europe", bbox: [[-12, 35], [32, 62]] },
    { id: "mideast", label: "Middle East", bbox: [[26, 12], [62, 42]] },
    { id: "eastasia", label: "East Asia", bbox: [[100, 15], [146, 46]] },
    { id: "sasia", label: "South & SE Asia", bbox: [[66, -8], [110, 32]] },
    { id: "oceania", label: "Oceania", bbox: [[112, -45], [156, -10]] },
    { id: "africa", label: "Africa", bbox: [[-20, -12], [45, 20]] },
    { id: "latam", label: "Latin America", bbox: [[-85, -35], [-34, 15]] },
  ];

  /* ---------------- state ---------------- */
  const state = {
    tech: new Set(TECH_IDS),
    status: new Set(STATUS_IDS),
    role: new Set(ROLE_IDS),
    year: YEAR_MAX,
    metric: "funding",
    view: "map",
    selection: null,      // { type: 'country'|'city'|'player', id }
    focusPlayer: null,    // player id whose footprint is highlighted
    playing: null,
    sort: { key: "since", dir: "desc" },
  };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtMoney = (m) => m >= 1000 ? `$${(m / 1000).toFixed(m >= 10000 ? 0 : 1)}B` : `$${Math.round(m)}M`;
  const techVar = (t) => `var(--c-${t})`;
  const playerName = (id) => (M.players[id] || {}).name || id;

  /* ---------------- showcase media helpers ---------------- */
  const MEDIA = window.MEDIA || {};
  const ILL = window.ILLUSTRATIONS || {};
  /* Inline video embeds only when the page is the top document; inside a sandboxed frame we link out instead. */
  const embedAllowed = (() => { try { return window.self === window.top; } catch (e) { return false; } })();
  const PLAY_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
  const EXT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
  function ytId(url) { const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/.exec(url || ""); return m ? m[1] : null; }
  function commonsUrl(file, w = 640) { const t = file.replace(/^File:/, "").replace(/ /g, "_"); return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(t)}?width=${w}`; }
  const mediaFor = (id) => MEDIA[id] || {};
  function cityVideo(id, city) {
    const dv = (mediaFor(id).deploymentVideos || []).find(v => v.city && city && (v.city === city.id || city.name.toLowerCase().includes(v.city.toLowerCase()) || v.city.toLowerCase().includes(city.name.split(/[ (–&\/]/)[0].toLowerCase())));
    return dv && ytId(dv.url) ? dv : null;
  }
  function pickMedia(id, city) {
    const own = mediaFor(id);
    const hasOwn = (own.video && ytId(own.video.url)) || (own.image && own.image.file);
    const via = !hasOwn && own.proxy && MEDIA[own.proxy] ? own.proxy : null;
    const m = via ? MEDIA[via] : own;
    const video = (city && cityVideo(id, city)) || (m.video && ytId(m.video.url) ? m.video : null);
    let img = null;
    if (m.image && m.image.file) img = { src: commonsUrl(m.image.file), credit: m.image.page, label: "Photo · Wikimedia Commons" };
    else if (video) img = { src: `https://i.ytimg.com/vi/${ytId(video.url)}/hqdefault.jpg`, credit: video.url, label: "Video still · YouTube" };
    return { video, img, via, tech: (M.players[id].categories || [])[0] || "sidewalk" };
  }
  function illus(tech) { return ILL[tech] || ILL.sidewalk || ""; }
  function playControl(video) {
    const label = `Play video: ${video.title || "showcase"}`;
    return embedAllowed
      ? `<button class="play" data-play="${esc(video.url)}" aria-label="${esc(label)}"><span>${PLAY_SVG}</span></button>`
      : `<a class="play" href="${esc(video.url)}" target="_blank" rel="noopener" aria-label="${esc(label)} (opens YouTube)"><span>${PLAY_SVG}</span></a>`;
  }
  /* A 16:9 card: photo (or video still) over a line illustration that shows through when the image cannot load. */
  function mediaCard(id, opts = {}) {
    const { video, img, via, tech } = pickMedia(id, opts.city);
    const p = M.players[id];
    const badge = via ? `Partner tech · ${playerName(via)}` : video ? "Video" : img ? "Photo" : "Illustration";
    const title = via ? `${p.name} deploys ${playerName(via)} robots` : video ? (video.title || p.name) : (opts.city ? `${p.name} · ${opts.city.name}` : p.name);
    return `<div class="media-card" style="--sw:${techVar(tech)}" ${opts.goPlayer ? `data-go-player="${id}"` : ""}>
      <div class="frame">${illus(tech)}${img ? `<img src="${esc(img.src)}" alt="${esc(p.name)} ${esc(M.tech[tech].short.toLowerCase())}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}${video ? playControl(video) : ""}<span class="badge">${badge}</span></div>
      <div class="cap"><span class="ttl" title="${esc(title)}">${esc(title)}</span>${img ? `<a href="${esc(img.credit)}" target="_blank" rel="noopener" title="${esc(img.label)}">${img.label.split(" · ")[1]}</a>` : `<span>${esc(M.tech[tech].short)}</span>`}</div>
    </div>`;
  }
  function thumb(id, tech, city) {
    const { video, img } = pickMedia(id, city);
    return `<span class="thumb" style="--sw:${techVar(tech)}">${illus(tech)}${img ? `<img src="${esc(img.src.replace("width=640", "width=160").replace("hqdefault", "mqdefault"))}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}${video ? `<span class="mini-play">${PLAY_SVG}</span>` : ""}</span>`;
  }
  function mediaLinks(id) {
    const m = mediaFor(id); const out = [];
    if (m.site) out.push(`<a href="${esc(m.site)}" target="_blank" rel="noopener">${EXT_SVG}Website</a>`);
    if (m.video && m.video.url) out.push(`<a href="${esc(m.video.url)}" target="_blank" rel="noopener">${PLAY_SVG}Watch on YouTube</a>`);
    else if (m.proxy && MEDIA[m.proxy] && MEDIA[m.proxy].video) out.push(`<a href="${esc(MEDIA[m.proxy].video.url)}" target="_blank" rel="noopener">${PLAY_SVG}Watch ${esc(playerName(m.proxy))} robots</a>`);
    if (m.channel) out.push(`<a href="${esc(m.channel)}" target="_blank" rel="noopener">${EXT_SVG}YouTube channel</a>`);
    if (m.press) out.push(`<a href="${esc(m.press)}" target="_blank" rel="noopener">${EXT_SVG}Newsroom &amp; photos</a>`);
    if (m.image && m.image.page) out.push(`<a href="${esc(m.image.page)}" target="_blank" rel="noopener">${EXT_SVG}Photo source</a>`);
    const seen = new Set();
    (m.deploymentVideos || []).filter(v => ytId(v.url)).forEach(v => { const label = (cityById[v.city] || {}).name || v.city; if (seen.has(label) || seen.size >= 3) return; seen.add(label); out.push(`<a href="${esc(v.url)}" target="_blank" rel="noopener" title="${esc(v.title || "")}">${PLAY_SVG}${esc(label)}</a>`); });
    return out.length ? `<div class="media-links">${out.join("")}</div>` : "";
  }
  /* Delegated: play buttons swap the frame for an embedded player. */
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-play]");
    if (!btn) return;
    ev.preventDefault(); ev.stopPropagation();
    const id = ytId(btn.dataset.play); if (!id) return;
    const frame = btn.closest(".frame");
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Showcase video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }, true);

  /* ---------------- derived data ---------------- */
  function deploymentVisible(d) {
    const p = M.players[d.player];
    if (!state.tech.has(d.tech)) return false;
    if (!state.role.has(p.role)) return false;
    if (d.since > state.year) return false;
    return state.status.has(effectiveStatus(d));
  }
  /* A deployment that later ended is shown as it was in the selected year. */
  function effectiveStatus(d) {
    if (d.until != null && d.until < state.year) return "ended";
    if (d.status === "ended" && d.until != null) return "active";
    return d.status;
  }

  function visibleDeployments() {
    const out = [];
    for (const c of M.cities) for (const d of c.deployments) {
      if (deploymentVisible(d)) out.push({ ...d, city: c, effective: effectiveStatus(d) });
    }
    return out;
  }

  function cityRows(city) {
    return city.deployments.filter(d => deploymentVisible(d)).map(d => ({ ...d, city, effective: effectiveStatus(d) }));
  }

  function playerMatchesFilters(p) {
    return state.role.has(p.role) && p.categories.some(t => state.tech.has(t));
  }

  function countryAgg() {
    const agg = {};
    for (const c of M.countries) agg[c.id] = { id: c.id, deployments: 0, cities: 0, players: new Set(), hqPlayers: [], funding: 0, corporate: 0, techCount: {}, statusCount: { active: 0, pilot: 0, ended: 0 } };
    for (const c of M.cities) {
      const rows = cityRows(c);
      if (!rows.length) continue;
      const a = agg[c.country];
      a.cities += 1; a.deployments += rows.length;
      for (const r of rows) {
        a.players.add(r.player);
        a.techCount[r.tech] = (a.techCount[r.tech] || 0) + 1;
        a.statusCount[r.effective] += 1;
      }
    }
    for (const [id, p] of Object.entries(M.players)) {
      if (!playerMatchesFilters(p)) continue;
      if (p.founded > state.year) continue;
      const a = agg[p.country];
      a.hqPlayers.push(id);
      if (p.corporate) a.corporate += 1; else a.funding += p.fundingUSDm || 0;
    }
    return agg;
  }

  function metricValue(a) {
    switch (state.metric) {
      case "funding": return a.funding;
      case "players": return a.players.size;
      case "deployments": return a.deployments;
      case "cities": return a.cities;
    }
    return 0;
  }
  const METRIC_LABEL = { funding: "Disclosed funding (USD)", players: "Players present", deployments: "Deployments", cities: "Cities" };
  const fmtMetric = (v) => state.metric === "funding" ? (v ? fmtMoney(v) : "—") : String(v);

  function fundingTier(m, corporate) {
    if (m >= 2000) return { label: "Tier 1 · $2B+", step: 6 };
    if (m >= 500) return { label: "Tier 2 · $500M–2B", step: 5 };
    if (m >= 100) return { label: "Tier 3 · $100–500M", step: 4 };
    if (m >= 20) return { label: "Tier 4 · $20–100M", step: 3 };
    if (m > 0) return { label: "Tier 5 · under $20M", step: 2 };
    if (corporate) return { label: "Corporate-funded programmes only", step: 1 };
    return { label: "No locally headquartered companies", step: 0 };
  }

  /* ---------------- map setup ---------------- */
  const svg = d3.select("#map");
  const gRoot = svg.append("g");
  const gSphere = gRoot.append("g");
  const gCountries = gRoot.append("g");
  const gCities = gRoot.append("g");
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const world = topojson.feature(window.WORLD_TOPO, window.WORLD_TOPO.objects.countries);
  let width = 0, height = 0, k = 1;

  const zoom = d3.zoom().scaleExtent([1, 40]).on("zoom", (ev) => {
    k = ev.transform.k;
    gRoot.attr("transform", ev.transform);
    updateBubbleGeometry();
  });
  svg.call(zoom).on("dblclick.zoom", null);

  function size() {
    const r = $("mapWrap").getBoundingClientRect();
    width = Math.max(320, r.width); height = Math.max(240, r.height);
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    projection.fitExtent([[8, 8], [width - 8, height - 8]], { type: "Sphere" });
    gSphere.selectAll("path.sphere").data([{ type: "Sphere" }]).join("path").attr("class", "sphere").attr("d", path);
    gSphere.selectAll("path.graticule").data([d3.geoGraticule10()]).join("path").attr("class", "graticule").attr("d", path);
    gCountries.selectAll("path").attr("d", path);
    updateBubbleGeometry();
  }

  gCountries.selectAll("path").data(world.features).join("path")
    .attr("class", "country")
    .attr("data-iso", d => d.id)
    .on("mousemove", (ev, d) => { const c = countryByIso[d.id]; if (c) showTooltip(ev, countryTooltip(c)); })
    .on("mouseleave", hideTooltip)
    .on("click", (ev, d) => { const c = countryByIso[d.id]; if (c) select({ type: "country", id: c.id }); });

  const cityG = gCities.selectAll("g.city").data(M.cities, d => d.id).join("g").attr("class", "city");
  cityG.append("circle").attr("class", "bubble");
  cityG.append("circle").attr("class", "hit");
  cityG.append("text").attr("dy", "-0.9em").attr("text-anchor", "middle");
  cityG.on("mousemove", (ev, d) => showTooltip(ev, cityTooltip(d)))
    .on("mouseleave", hideTooltip)
    .on("click", (ev, d) => { ev.stopPropagation(); select({ type: "city", id: d.id }); });

  let cityCache = {};   // id -> rows
  function updateBubbleGeometry() {
    cityG.attr("transform", d => { const p = projection([d.lon, d.lat]); return `translate(${p[0]},${p[1]})`; });
    cityG.each(function (d) {
      const rows = cityCache[d.id] || [];
      const n = rows.length;
      const r = n ? (4 + 3.2 * Math.sqrt(n)) / Math.sqrt(k) : 0;
      const g = d3.select(this);
      g.select("circle.bubble").attr("r", r);
      g.select("circle.hit").attr("r", Math.max(r, 10 / k));
      const isSel = state.selection && state.selection.type === "city" && state.selection.id === d.id;
      const showLabel = n && (k >= 4.5 || (k >= 2.2 && n >= 3) || n >= 8 || isSel);
      g.select("text").attr("dy", `${-(r + 4 / k)}px`).style("font-size", `${11 / k}px`).text(showLabel ? d.name : "");
    });
  }

  /* ---------------- render ---------------- */
  let agg = {};
  function render() {
    agg = countryAgg();
    cityCache = {};
    for (const c of M.cities) cityCache[c.id] = cityRows(c);

    /* choropleth */
    const vals = M.countries.map(c => metricValue(agg[c.id])).filter(v => v > 0);
    const max = d3.max(vals) || 1;
    const scale = d3.scaleQuantize().domain([0, Math.sqrt(max)]).range([1, 2, 3, 4, 5, 6]);
    gCountries.selectAll("path").each(function (d) {
      const c = countryByIso[d.id];
      const el = d3.select(this);
      const v = c ? metricValue(agg[c.id]) : 0;
      const has = !!c;
      el.classed("has-data", has);
      el.classed("is-selected", !!(state.selection && state.selection.type === "country" && c && state.selection.id === c.id));
      if (!c || (v <= 0 && agg[c.id].deployments === 0 && agg[c.id].hqPlayers.length === 0)) { el.style("fill", null); }
      else if (v <= 0) { el.style("fill", "var(--seq-0)"); }
      else { el.style("fill", `var(--seq-${scale(Math.sqrt(v))})`); }
      /* focus dimming */
      let dim = false;
      if (state.focusPlayer && c) {
        const p = M.players[state.focusPlayer];
        dim = !(p.country === c.id || M.cities.some(ct => ct.country === c.id && ct.deployments.some(dd => dd.player === state.focusPlayer)));
      }
      el.classed("is-dim", dim);
    });

    /* bubbles */
    cityG.each(function (d) {
      const rows = cityCache[d.id];
      const g = d3.select(this);
      const counts = d3.rollup(rows, v => v.length, r => r.tech);
      const dominant = counts.size ? [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0] : null;
      const statuses = new Set(rows.map(r => r.effective));
      const st = statuses.has("active") ? "active" : statuses.has("pilot") ? "pilot" : "ended";
      g.attr("class", `city status-${st}`)
        .classed("is-selected", !!(state.selection && state.selection.type === "city" && state.selection.id === d.id))
        .classed("is-dim", !!(state.focusPlayer && !rows.some(r => r.player === state.focusPlayer)))
        .style("display", rows.length ? null : "none");
      g.select("circle.bubble").style("fill", dominant ? techVar(dominant) : "transparent");
    });
    updateBubbleGeometry();

    renderLegend(max);
    renderStats();
    renderPlayersList();
    renderSpark();
    if (state.view === "table") renderTable();
    if (state.view === "gallery") renderGallery();
    if (state.selection) renderDrawer(); /* keep drawer in sync with filters */
  }

  function renderLegend(max) {
    const steps = [1, 2, 3, 4, 5, 6].map(i => `<span style="background:var(--seq-${i})"></span>`).join("");
    const cats = TECH_IDS.map(t => `<button data-tech="${t}" aria-pressed="${state.tech.has(t)}" style="--sw:${techVar(t)}"><span class="sw"></span>${esc(M.tech[t].short)}</button>`).join("");
    $("legend").innerHTML = `
      <h3>${esc(METRIC_LABEL[state.metric])}</h3>
      <div class="ramp">${steps}</div>
      <div class="ramp-labels"><span>${state.metric === 'funding' ? '>$0' : '1'}</span><span>${esc(fmtMetric(max))}</span></div>
      <h3 style="margin-top:10px">Dominant technology in city</h3>
      <div class="cats">${cats}</div>
      <div class="sizes">
        <span><i style="width:10px;height:10px"></i></span><span>1 deployment</span>
        <span><i style="width:18px;height:18px"></i></span><span>5</span>
        <span><i style="width:26px;height:26px"></i></span><span>12+</span>
      </div>
      <div class="keyline"><span class="k-active">commercial</span><span class="k-pilot">pilot</span><span class="k-ended">ended</span></div>`;
    $("legend").querySelectorAll("button[data-tech]").forEach(b => b.addEventListener("click", () => toggleSet(state.tech, b.dataset.tech, TECH_IDS)));
  }

  function renderStats() {
    const rows = visibleDeployments();
    const countries = new Set(rows.map(r => r.city.country));
    const cities = new Set(rows.map(r => r.city.id));
    const players = new Set(rows.map(r => r.player));
    let funding = 0;
    for (const id of players) { const p = M.players[id]; if (!p.corporate && playerMatchesFilters(p)) funding += p.fundingUSDm || 0; }
    const active = rows.filter(r => r.effective === "active").length;
    $("stats").innerHTML = `
      <div class="stat"><div class="v">${countries.size}</div><div class="l">countries</div></div>
      <div class="stat"><div class="v">${cities.size}</div><div class="l">cities</div></div>
      <div class="stat"><div class="v">${players.size}</div><div class="l">players</div></div>
      <div class="stat"><div class="v">${rows.length}</div><div class="l">deployments · ${active} commercial</div></div>
      <div class="stat wide"><div class="v">${funding ? fmtMoney(funding) : "—"}</div><div class="l">disclosed funding of players in view (excl. corporate programmes)</div></div>`;
  }

  function renderPlayersList() {
    const rows = visibleDeployments();
    const byPlayer = d3.rollup(rows, v => new Set(v.map(r => r.city.id)).size, r => r.player);
    const list = [...byPlayer.entries()].sort((a, b) => b[1] - a[1] || playerName(a[0]).localeCompare(playerName(b[0])));
    $("playerCount").textContent = list.length ? `(${list.length})` : "";
    $("playersList").innerHTML = list.map(([id, n]) => {
      const p = M.players[id];
      return `<button class="player-row" data-player="${id}" style="--sw:${techVar(p.categories[0])}"><span class="dot"></span><span class="name">${esc(p.name)}</span><span class="meta num">${n} ${n === 1 ? "city" : "cities"}</span></button>`;
    }).join("") || `<div class="stat"><div class="l">No players match the current filters.</div></div>`;
    $("playersList").querySelectorAll("[data-player]").forEach(b => b.addEventListener("click", () => select({ type: "player", id: b.dataset.player })));
  }

  function renderSpark() {
    const counts = [];
    for (let y = YEAR_MIN; y <= YEAR_MAX; y++) {
      let n = 0;
      for (const c of M.cities) for (const d of c.deployments) {
        if (!state.tech.has(d.tech) || !state.role.has(M.players[d.player].role)) continue;
        if (d.since <= y && (d.until == null || d.until >= y)) n++;
      }
      counts.push(n);
    }
    const max = d3.max(counts) || 1;
    $("spark").innerHTML = counts.map((n, i) => `<i style="height:${Math.max(1, Math.round(n / max * 14))}px" class="${YEAR_MIN + i === state.year ? "is-cur" : ""}" title="${YEAR_MIN + i}: ${n}"></i>`).join("");
  }

  /* ---------------- tooltips ---------------- */
  const tip = $("tooltip");
  function showTooltip(ev, html) {
    tip.innerHTML = html; tip.classList.add("is-on");
    const pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
    let x = ev.clientX + pad, y = ev.clientY + pad;
    if (x + w > window.innerWidth - 8) x = ev.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = ev.clientY - h - pad;
    tip.style.left = `${x}px`; tip.style.top = `${y}px`;
  }
  function hideTooltip() { tip.classList.remove("is-on"); }

  function countryTooltip(c) {
    const a = agg[c.id];
    const tier = fundingTier(a.funding, a.corporate);
    const techs = Object.entries(a.techCount).sort((x, y) => y[1] - x[1]).map(([t, n]) => `<li class="row"><span class="dot" style="--sw:${techVar(t)}"></span>${esc(M.tech[t].short)} <span class="muted">· ${n}</span></li>`).join("");
    return `<div class="t">${esc(c.name)}</div>
      <div>${a.deployments} deployment${a.deployments === 1 ? "" : "s"} in ${a.cities} cit${a.cities === 1 ? "y" : "ies"} · ${a.players.size} players</div>
      <div class="muted">${esc(tier.label)}${a.funding ? ` · ${fmtMoney(a.funding)} disclosed` : ""}</div>
      ${techs ? `<ul>${techs}</ul>` : ""}
      <div class="more">Click for players, investment and technology</div>`;
  }
  function cityTooltip(city) {
    const rows = cityCache[city.id] || [];
    const shown = rows.slice(0, 6).map(r => `<li class="row"><span class="dot" style="--sw:${techVar(r.tech)}"></span><span>${esc(playerName(r.player))}${r.partner ? ` <span class="muted">· ${esc(r.partner)}</span>` : ""}</span><span class="muted num" style="margin-left:auto">${r.since}</span></li>`).join("");
    return `<div class="t">${esc(city.name)}</div><div class="muted">${esc(countryById[city.country].name)} · ${rows.length} deployment${rows.length === 1 ? "" : "s"}</div>
      <ul>${shown}</ul>${rows.length > 6 ? `<div class="more">+${rows.length - 6} more — click for details</div>` : `<div class="more">Click for details</div>`}`;
  }

  /* ---------------- selection & drawer ---------------- */
  const drawer = $("drawer");
  function select(sel, opts = {}) {
    state.selection = sel;
    state.focusPlayer = sel && sel.type === "player" ? sel.id : null;
    if (sel) {
      try { history.replaceState(null, "", `#${sel.type[0]}-${sel.id}`); } catch (e) { /* ignore */ }
      if (!opts.noZoom) zoomToSelection(sel);
    } else {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ignore */ }
    }
    render();
    drawer.classList.toggle("is-open", !!sel);
    drawer.setAttribute("aria-hidden", sel ? "false" : "true");
    if (sel) $("drawerBody").scrollTop = 0;
  }

  function zoomToSelection(sel) {
    if (sel.type === "country") {
      const f = world.features.find(x => x.id === countryById[sel.id].iso);
      if (f) zoomToBounds(path.bounds(f), sel.id === "USA" || sel.id === "CAN" ? 0.9 : 0.6);
    } else if (sel.type === "city") {
      const c = cityById[sel.id];
      const p = projection([c.lon, c.lat]);
      const target = Math.max(k, 5);
      const vp = viewport();
      svg.transition().duration(650).call(zoom.transform, d3.zoomIdentity.translate(vp.ox + vp.w / 2 - p[0] * target, vp.oy + vp.h / 2 - p[1] * target).scale(target));
    } else if (sel.type === "player") {
      const pts = M.cities.filter(c => c.deployments.some(d => d.player === sel.id)).map(c => projection([c.lon, c.lat]));
      if (pts.length) zoomToBounds([[d3.min(pts, p => p[0]), d3.min(pts, p => p[1])], [d3.max(pts, p => p[0]), d3.max(pts, p => p[1])]], 0.7);
    }
  }
  /* Visible map area once the detail drawer is open (desktop: right 420px; mobile: bottom 70%). */
  function viewport() {
    const open = !!state.selection;
    if (!open) return { w: width, h: height, ox: 0, oy: 0 };
    if (window.innerWidth <= 960) return { w: width, h: height * 0.3, ox: 0, oy: 0 };
    return { w: Math.max(200, width - 420), h: height, ox: 0, oy: 0 };
  }
  function zoomToBounds([[x0, y0], [x1, y1]], padFactor = 0.8) {
    const vp = viewport();
    const dx = Math.max(x1 - x0, 20), dy = Math.max(y1 - y0, 20);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const scale = Math.min(40, Math.max(1, padFactor / Math.max(dx / vp.w, dy / vp.h)));
    svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(vp.ox + vp.w / 2 - cx * scale, vp.oy + vp.h / 2 - cy * scale).scale(scale));
  }
  function zoomToRegion(rg) {
    if (!rg.bbox) { svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity); return; }
    const [[lon0, lat0], [lon1, lat1]] = rg.bbox;
    const p0 = projection([lon0, lat1]), p1 = projection([lon1, lat0]);
    zoomToBounds([[Math.min(p0[0], p1[0]), Math.min(p0[1], p1[1])], [Math.max(p0[0], p1[0]), Math.max(p0[1], p1[1])]], 0.85);
  }

  function statusPill(s) { return `<span class="pill status-${s}"><span class="sw"></span>${esc(M.statuses[s])}</span>`; }
  function techPill(t) { return `<span class="pill" style="--sw:${techVar(t)}"><span class="sw"></span>${esc(M.tech[t].short)}</span>`; }
  function head(kicker, title, sub, extraBtn = "") {
    return `<div><div class="kicker">${esc(kicker)}</div><h2 class="title">${esc(title)}</h2>${sub ? `<div class="sub">${sub}</div>` : ""}</div>
      <div class="actions">${extraBtn}<button class="icon-btn" id="drawerClose" aria-label="Close details"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`;
  }

  function renderDrawer() {
    const sel = state.selection; if (!sel) return;
    if (sel.type === "country") renderCountry(countryById[sel.id]);
    else if (sel.type === "city") renderCity(cityById[sel.id]);
    else renderPlayer(sel.id, M.players[sel.id]);
    $("drawerClose").addEventListener("click", () => select(null));
    $("drawerBody").querySelectorAll("[data-go-player]").forEach(b => b.addEventListener("click", (ev) => { if (ev.target.closest("a, [data-play]")) return; select({ type: "player", id: b.dataset.goPlayer }); }));
    $("drawerBody").querySelectorAll("[data-go-city]").forEach(b => b.addEventListener("click", () => select({ type: "city", id: b.dataset.goCity })));
    $("drawerBody").querySelectorAll("[data-go-country]").forEach(b => b.addEventListener("click", () => select({ type: "country", id: b.dataset.goCountry })));
    $("drawerBody").querySelectorAll("[data-tech-desc]").forEach(b => b.addEventListener("click", () => { state.tech = new Set([b.dataset.techDesc]); syncChips(); render(); }));
  }

  function techMix(counts) {
    const total = d3.sum(Object.values(counts)) || 1;
    const ordered = TECH_IDS.filter(t => counts[t]);
    return `<div class="tech-mix">${ordered.map(t => `<span style="--sw:${techVar(t)};flex:${counts[t]}"></span>`).join("")}</div>
      <div class="tech-mix-labels">${ordered.map(t => `<span><span class="sw" style="--sw:${techVar(t)}"></span>${esc(M.tech[t].short)} <span class="num">${counts[t]}</span> <span style="color:var(--ink-3)">(${Math.round(counts[t] / total * 100)}%)</span></span>`).join("")}</div>`;
  }

  function playerItem(id, meta, right) {
    const p = M.players[id];
    return `<button class="item" data-go-player="${id}" style="--sw:${techVar(p.categories[0])}"><span class="dot"></span><span><div class="n">${esc(p.name)}</div><div class="d">${meta}</div></span><span class="r">${right || ""}</span></button>`;
  }

  function renderCountry(c) {
    const a = agg[c.id];
    const tier = fundingTier(a.funding, a.corporate);
    const cities = M.cities.filter(ct => ct.country === c.id).map(ct => ({ ct, rows: cityCache[ct.id] })).filter(x => x.rows.length).sort((x, y) => y.rows.length - x.rows.length);
    const presentPlayers = [...a.players];
    const hq = a.hqPlayers.slice().sort((x, y) => (M.players[y].fundingUSDm || 0) - (M.players[x].fundingUSDm || 0));
    const byRole = (role, ids) => ids.filter(id => M.players[id].role === role);
    const fundingMax = d3.max(M.countries, cc => agg[cc.id].funding) || 1;
    const develops = new Set(), uses = new Set();
    for (const id of hq) { (M.players[id].develops || []).forEach(x => develops.add(`${x} — ${M.players[id].name}`)); }
    for (const id of presentPlayers) { (M.players[id].uses || []).slice(0, 2).forEach(x => uses.add(`${x} — ${M.players[id].name}`)); }
    const firstYear = d3.min(M.cities.filter(ct => ct.country === c.id).flatMap(ct => ct.deployments.map(d => d.since)));

    $("drawerHead").innerHTML = head(c.region, c.name, `${a.deployments} deployments · ${a.cities} cities · ${a.players.size} players${firstYear ? ` · active since ${firstYear}` : ""}`);
    const showcase = presentPlayers.slice().sort((x, y) => cities.filter(ct => ct.rows.some(r => r.player === y)).length - cities.filter(ct => ct.rows.some(r => r.player === x)).length).slice(0, 6);
    $("drawerBody").innerHTML = `
      <section><p>${esc(c.summary)}</p>
        ${showcase.length ? `<div class="strip">${showcase.map(id => mediaCard(id, { goPlayer: true })).join("")}</div>` : ""}
      </section>
      <section>
        <h3>Level of investment</h3>
        <div class="kv">
          <div class="cell wide">
            <div class="tier" style="--sw:var(--seq-${tier.step})"><span class="sw"></span>${esc(tier.label)}</div>
            <div class="bar"><i style="width:${Math.max(a.funding ? 3 : 0, Math.round(Math.sqrt(a.funding / fundingMax) * 100))}%"></i></div>
            <div class="l" style="font-size:12px;color:var(--ink-3);margin-top:6px">${a.funding ? `${fmtMoney(a.funding)} disclosed equity raised by ${hq.filter(id => !M.players[id].corporate).length} locally headquartered compan${hq.filter(id => !M.players[id].corporate).length === 1 ? "y" : "ies"}` : "No disclosed venture funding for locally headquartered companies"}${a.corporate ? ` · ${a.corporate} corporate programme${a.corporate === 1 ? "" : "s"} funded internally` : ""}</div>
          </div>
          <div class="cell"><div class="v">${a.statusCount.active}</div><div class="l">commercial deployments</div></div>
          <div class="cell"><div class="v">${a.statusCount.pilot}</div><div class="l">pilots</div></div>
        </div>
        ${hq.length ? `<div class="group-title">Companies headquartered here</div><div class="list">${hq.map(id => { const p = M.players[id]; return playerItem(id, esc(p.hq), p.corporate ? "corporate" : (p.fundingUSDm ? fmtMoney(p.fundingUSDm) : "undisclosed")); }).join("")}</div>` : ""}
      </section>
      <section>
        <h3>Technology mix</h3>
        ${Object.keys(a.techCount).length ? techMix(a.techCount) : "<p>No deployments match the current filters.</p>"}
        <div class="group-title">Regulatory context</div>
        <p>${esc(c.regulation)}</p>
      </section>
      <section>
        <h3>Main players operating here</h3>
        ${ROLE_IDS.map(role => { const ids = byRole(role, presentPlayers); if (!ids.length) return ""; return `<div class="group-title">${esc(M.roles[role])}</div><div class="list">${ids.map(id => { const p = M.players[id]; const n = cities.filter(x => x.rows.some(r => r.player === id)).length; return playerItem(id, esc(p.hq), `${n} cit${n === 1 ? "y" : "ies"}`); }).join("")}</div>`; }).join("")}
      </section>
      <section>
        <h3>Technology developed & used</h3>
        <div class="two-col">
          <div><div class="group-title">Developed locally</div>${develops.size ? `<ul class="tech-list">${[...develops].slice(0, 10).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p>—</p>"}</div>
          <div><div class="group-title">Used / imported</div>${uses.size ? `<ul class="tech-list uses">${[...uses].slice(0, 10).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p>—</p>"}</div>
        </div>
      </section>
      <section>
        <h3>Cities</h3>
        <div class="list">${cities.map(({ ct, rows }) => { const counts = d3.rollup(rows, v => v.length, r => r.tech); const dom = [...counts.entries()].sort((x, y) => y[1] - x[1])[0][0]; return `<button class="item" data-go-city="${ct.id}" style="--sw:${techVar(dom)}"><span class="dot"></span><span><div class="n">${esc(ct.name)}</div><div class="d">${rows.map(r => esc(playerName(r.player))).slice(0, 4).join(", ")}${rows.length > 4 ? ` +${rows.length - 4}` : ""}</div></span><span class="r">${rows.length}</span></button>`; }).join("") || "<p>No cities match the current filters.</p>"}</div>
      </section>`;
  }

  function renderCity(city) {
    const rows = cityCache[city.id] || [];
    const all = city.deployments.slice().sort((a, b) => a.since - b.since);
    const c = countryById[city.country];
    const counts = d3.rollup(rows, v => v.length, r => r.tech);
    $("drawerHead").innerHTML = head(c.name, city.name, `${rows.length} deployment${rows.length === 1 ? "" : "s"} in view · <button class="inline-btn" data-go-country="${c.id}">Country profile</button>`);
    const showcase = [...new Set(rows.map(r => r.player))].slice(0, 6);
    $("drawerBody").innerHTML = `
      ${showcase.length ? `<section><h3>Showcase</h3><div class="strip">${showcase.map(id => mediaCard(id, { city, goPlayer: true })).join("")}</div></section>` : ""}
      <section>
        <h3>Technology mix</h3>
        ${counts.size ? techMix(Object.fromEntries(counts)) : "<p>No deployments in this city match the current filters. Adjust the year or technology filters.</p>"}
      </section>
      <section>
        <h3>Players & deployments</h3>
        <div class="list">${rows.map(r => { const p = M.players[r.player]; return `<button class="item with-thumb" data-go-player="${r.player}" style="--sw:${techVar(r.tech)}">${thumb(r.player, r.tech, city)}<span class="dot"></span><span><div class="n">${esc(p.name)} <span style="color:var(--ink-3);font-weight:500;font-size:12px">· ${esc(M.roles[p.role])}</span></div><div class="d">${esc(M.tech[r.tech].short)}${r.partner ? ` · with ${esc(r.partner)}` : ""}${r.note ? `<br>${esc(r.note)}` : ""}</div><div class="status-line" style="margin-top:6px">${statusPill(r.effective)}</div></span><span class="r">${r.since}${r.until ? `–${r.until}` : ""}</span></button>`; }).join("")}</div>
      </section>
      <section>
        <h3>Timeline</h3>
        <div class="tl">${all.map(d => `<div class="ev" style="--sw:${techVar(d.tech)}"><div class="y">${d.since}${d.until ? ` – ${d.until}` : ""}</div><div class="n">${esc(playerName(d.player))}</div><div class="d">${esc(M.tech[d.tech].short)}${d.partner ? ` · ${esc(d.partner)}` : ""}${d.note ? ` — ${esc(d.note)}` : ""}</div></div>`).join("")}</div>
      </section>`;
  }

  function renderPlayer(id, p) {
    const cities = M.cities.filter(c => c.deployments.some(d => d.player === id));
    const deps = cities.flatMap(c => c.deployments.filter(d => d.player === id).map(d => ({ ...d, city: c })));
    const countries = new Set(cities.map(c => c.country));
    const c = countryById[p.country];
    $("drawerHead").innerHTML = head(`${M.roles[p.role]} · founded ${p.founded}`, p.name, `${esc(p.hq)} · <button class="inline-btn" data-go-country="${p.country}">${esc(c.name)}</button>`);
    $("drawerBody").innerHTML = `
      <section>
        ${mediaCard(id)}
        ${mediaLinks(id)}
        ${mediaFor(id).note ? `<div class="credit">${esc(mediaFor(id).note)}</div>` : ""}
        <div class="status-line" style="margin-top:12px">${statusPill(p.status)}${p.categories.map(techPill).join("")}</div>
        <p style="margin-top:10px">${esc(p.scale)}</p>
      </section>
      <section>
        <h3>Investment</h3>
        <div class="kv">
          <div class="cell"><div class="v">${p.corporate ? "Corp." : (p.fundingUSDm ? fmtMoney(p.fundingUSDm) : "—")}</div><div class="l">${p.corporate ? "internally funded programme" : "disclosed funding raised"}</div></div>
          <div class="cell"><div class="v">${cities.length}</div><div class="l">cities · ${countries.size} countr${countries.size === 1 ? "y" : "ies"}</div></div>
          <div class="cell wide"><div class="l" style="margin-top:0">${esc(p.fundingNote)}</div></div>
        </div>
      </section>
      <section>
        <h3>Technology</h3>
        <div class="two-col">
          <div><div class="group-title">Develops in-house</div>${p.develops.length ? `<ul class="tech-list">${p.develops.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p>Deploys partner technology; no in-house robotics stack.</p>"}</div>
          <div><div class="group-title">Uses from third parties</div>${p.uses.length ? `<ul class="tech-list uses">${p.uses.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p>—</p>"}</div>
        </div>
        <div class="group-title">Technology families</div>
        <div class="tags">${p.categories.map(t => `<button class="tag" data-tech-desc="${t}" title="${esc(M.tech[t].desc)}" style="border-left:3px solid ${techVar(t)}">${esc(M.tech[t].label)}</button>`).join("")}</div>
      </section>
      ${p.partners && p.partners.length ? `<section><h3>Key partners</h3><div class="tags">${p.partners.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div></section>` : ""}
      <section>
        <h3>Footprint</h3>
        <div class="list">${deps.sort((a, b) => a.since - b.since).map(d => `<button class="item" data-go-city="${d.city.id}" style="--sw:${techVar(d.tech)}"><span class="dot"></span><span><div class="n">${esc(d.city.name)} <span style="color:var(--ink-3);font-weight:500;font-size:12px">· ${esc(countryById[d.city.country].name)}</span></div><div class="d">${esc(M.tech[d.tech].short)}${d.partner ? ` · with ${esc(d.partner)}` : ""}${d.note ? `<br>${esc(d.note)}` : ""}</div><div class="status-line" style="margin-top:6px">${statusPill(d.status)}</div></span><span class="r">${d.since}${d.until ? `–${d.until}` : ""}</span></button>`).join("")}</div>
      </section>`;
  }

  /* ---------------- table view ---------------- */
  function renderTable() {
    const rows = visibleDeployments();
    const key = state.sort.key, dir = state.sort.dir === "asc" ? 1 : -1;
    const val = (r) => ({ country: countryById[r.city.country].name, city: r.city.name, player: playerName(r.player), role: M.roles[M.players[r.player].role], tech: M.tech[r.tech].short, partner: r.partner || "", since: r.since, status: r.effective, funding: M.players[r.player].fundingUSDm || 0 })[key];
    rows.sort((a, b) => { const x = val(a), y = val(b); return (x > y ? 1 : x < y ? -1 : 0) * dir; });
    const cols = [["country", "Country"], ["city", "City"], ["player", "Player"], ["role", "Role"], ["tech", "Technology"], ["partner", "Partner / customer"], ["since", "Since"], ["status", "Status"], ["funding", "Player funding"]];
    $("tableWrap").innerHTML = `<table class="deploy"><thead><tr>${cols.map(([k2, l]) => `<th data-key="${k2}" ${state.sort.key === k2 ? `aria-sort="${state.sort.dir === "asc" ? "ascending" : "descending"}"` : 'aria-sort="none"'}>${l}</th>`).join("")}<th>Media</th><th>Notes</th></tr></thead>
      <tbody>${rows.map(r => { const p = M.players[r.player]; return `<tr>
        <td><button class="link" data-go-country="${r.city.country}">${esc(countryById[r.city.country].name)}</button></td>
        <td><button class="link" data-go-city="${r.city.id}">${esc(r.city.name)}</button></td>
        <td><button class="link" data-go-player="${r.player}">${esc(p.name)}</button></td>
        <td>${esc(M.roles[p.role])}</td>
        <td>${techPill(r.tech)}</td>
        <td>${esc(r.partner || "—")}</td>
        <td class="num">${r.since}${r.until ? `–${r.until}` : ""}</td>
        <td>${statusPill(r.effective)}</td>
        <td class="num">${p.corporate ? "corporate" : (p.fundingUSDm ? fmtMoney(p.fundingUSDm) : "—")}</td>
        <td>${(() => { const m = mediaFor(r.player); const v = cityVideo(r.player, r.city) || m.video; const out = []; if (v && ytId(v.url)) out.push(`<a href="${esc(v.url)}" target="_blank" rel="noopener" title="${esc(v.title || "Video")}" class="link" style="display:inline-flex;align-items:center;gap:3px">${PLAY_SVG.replace("<svg ", "<svg style=\"width:12px;height:12px\" ")}Video</a>`); if (m.image && m.image.page) out.push(`<a href="${esc(m.image.page)}" target="_blank" rel="noopener" class="link">Photo</a>`); if (m.site) out.push(`<a href="${esc(m.site)}" target="_blank" rel="noopener" class="link">Site</a>`); return out.join(" · ") || "—"; })()}</td>
        <td style="min-width:220px;color:var(--ink-2)">${esc(r.note || "")}</td></tr>`; }).join("")}</tbody></table>
      <p style="color:var(--ink-3);font-size:12px;margin:10px 4px">${rows.length} deployments match the current filters (year ≤ ${state.year}).</p>`;
    $("tableWrap").querySelectorAll("th[data-key]").forEach(th => th.addEventListener("click", () => {
      const k2 = th.dataset.key;
      state.sort = state.sort.key === k2 ? { key: k2, dir: state.sort.dir === "asc" ? "desc" : "asc" } : { key: k2, dir: k2 === "since" || k2 === "funding" ? "desc" : "asc" };
      renderTable();
    }));
    $("tableWrap").querySelectorAll("[data-go-player]").forEach(b => b.addEventListener("click", () => { setView("map"); select({ type: "player", id: b.dataset.goPlayer }); }));
    $("tableWrap").querySelectorAll("[data-go-city]").forEach(b => b.addEventListener("click", () => { setView("map"); select({ type: "city", id: b.dataset.goCity }); }));
    $("tableWrap").querySelectorAll("[data-go-country]").forEach(b => b.addEventListener("click", () => { setView("map"); select({ type: "country", id: b.dataset.goCountry }); }));
  }

  function renderGallery() {
    const rows = visibleDeployments();
    const byPlayer = d3.rollup(rows, v => new Set(v.map(r => r.city.id)), r => r.player);
    const list = [...byPlayer.entries()].sort((a, b) => b[1].size - a[1].size || playerName(a[0]).localeCompare(playerName(b[0])));
    const withMedia = list.filter(([id]) => { const m = mediaFor(id); return (m.video && ytId(m.video.url)) || (m.image && m.image.file); }).length;
    $("galleryWrap").innerHTML = `
      <div class="gallery-head"><h2>Project showcase</h2><p>${list.length} players match the current filters · ${withMedia} with photo or video · year ≤ ${state.year}</p></div>
      <div class="gallery">${list.map(([id, cities]) => { const p = M.players[id]; const countries = new Set([...cities].map(c => cityById[c].country)); return `<article class="gcard">
        ${mediaCard(id)}
        <div class="body">
          <div class="n"><button data-go-player="${id}">${esc(p.name)}</button></div>
          <div class="m">${esc(M.roles[p.role])} · ${esc(p.hq)}</div>
          <div class="pills">${p.categories.map(techPill).join("")}${statusPill(p.status)}</div>
          <div class="d">${esc(p.scale)}</div>
          ${mediaLinks(id)}
          <div class="foot"><span><span class="num">${cities.size}</span> cit${cities.size === 1 ? "y" : "ies"} · <span class="num">${countries.size}</span> countr${countries.size === 1 ? "y" : "ies"}</span><span class="num">${p.corporate ? "corporate" : (p.fundingUSDm ? fmtMoney(p.fundingUSDm) + " raised" : "")}</span></div>
        </div></article>`; }).join("") || "<p>No players match the current filters.</p>"}</div>`;
    $("galleryWrap").querySelectorAll("[data-go-player]").forEach(b => b.addEventListener("click", () => { setView("map"); select({ type: "player", id: b.dataset.goPlayer }); }));
  }

  function setView(v) {
    state.view = v;
    if (v !== "map" && state.selection) select(null);
    $("viewMap").setAttribute("aria-pressed", v === "map");
    $("viewGallery").setAttribute("aria-pressed", v === "gallery");
    $("viewTable").setAttribute("aria-pressed", v === "table");
    $("tableWrap").hidden = v !== "table";
    $("galleryWrap").hidden = v !== "gallery";
    const mapOnly = v === "map" ? "" : "none";
    $("legend").style.display = mapOnly;
    $("regionJump").style.display = mapOnly;
    document.querySelector(".map-controls").style.display = mapOnly;
    if (v === "table") renderTable();
    if (v === "gallery") renderGallery();
  }

  /* ---------------- filters UI ---------------- */
  function chip(kind, id, label, sw, glyph) {
    return `<button class="chip ${kind}" data-kind="${kind}" data-id="${id}" aria-pressed="true" style="--sw:${sw}">${glyph ? `<span class="glyph">${glyph}</span>` : `<span class="sw"></span>`}${esc(label)}</button>`;
  }
  $("techChips").innerHTML = TECH_IDS.map(t => chip("tech", t, M.tech[t].short, techVar(t), M.tech[t].glyph)).join("");
  $("statusChips").innerHTML = STATUS_IDS.map(s => chip("status", s, M.statuses[s], `var(--st-${s})`)).join("");
  $("roleChips").innerHTML = ROLE_IDS.map(r => chip("role", r, M.roles[r], "var(--ink-3)")).join("");
  document.querySelectorAll(".chip").forEach(b => {
    b.title = b.dataset.kind === "tech" ? M.tech[b.dataset.id].desc : "";
    b.addEventListener("click", () => {
      const set = state[b.dataset.kind]; const all = b.dataset.kind === "tech" ? TECH_IDS : b.dataset.kind === "status" ? STATUS_IDS : ROLE_IDS;
      toggleSet(set, b.dataset.id, all);
    });
    b.addEventListener("dblclick", () => { state[b.dataset.kind] = new Set([b.dataset.id]); syncChips(); render(); });
  });
  function toggleSet(set, id, all) {
    if (set.has(id)) set.delete(id); else set.add(id);
    if (set.size === 0) all.forEach(x => set.add(x)); /* never leave an empty filter */
    syncChips(); render();
  }
  function syncChips() {
    document.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", state[b.dataset.kind].has(b.dataset.id)));
  }
  $("techAll").addEventListener("click", () => { state.tech = new Set(TECH_IDS); syncChips(); render(); });
  $("techNone").addEventListener("click", () => { state.tech = new Set([TECH_IDS[0]]); syncChips(); render(); });
  $("metric").addEventListener("change", (e) => { state.metric = e.target.value; render(); });

  /* region jump */
  $("regionJump").innerHTML = REGIONS.map(r => `<button data-region="${r.id}" class="${r.id === "world" ? "is-on" : ""}">${esc(r.label)}</button>`).join("");
  $("regionJump").querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    $("regionJump").querySelectorAll("button").forEach(x => x.classList.toggle("is-on", x === b));
    zoomToRegion(REGIONS.find(r => r.id === b.dataset.region));
  }));
  $("zoomIn").addEventListener("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1.8));
  $("zoomOut").addEventListener("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1 / 1.8));
  $("zoomReset").addEventListener("click", () => { svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity); select(null); });
  svg.on("click", (ev) => { if (ev.target === svg.node() || ev.target.classList.contains("sphere") || ev.target.classList.contains("graticule")) select(null); });

  /* view toggle */
  $("viewMap").addEventListener("click", () => setView("map"));
  $("viewGallery").addEventListener("click", () => setView("gallery"));
  $("viewTable").addEventListener("click", () => setView("table"));

  /* ---------------- timeline ---------------- */
  const yearInput = $("year");
  yearInput.min = YEAR_MIN; yearInput.max = YEAR_MAX; yearInput.value = YEAR_MAX;
  $("ticks").innerHTML = d3.range(YEAR_MIN, YEAR_MAX + 1).map(y => `<span>${String(y).slice(2)}</span>`).join("");
  function setYear(y) { state.year = +y; yearInput.value = y; $("yearLabel").textContent = y; render(); }
  yearInput.addEventListener("input", (e) => setYear(e.target.value));
  $("play").addEventListener("click", () => {
    if (state.playing) { clearInterval(state.playing); state.playing = null; $("play").textContent = "▶ Play timeline"; $("play").setAttribute("aria-pressed", "false"); return; }
    if (state.year >= YEAR_MAX) setYear(YEAR_MIN);
    $("play").textContent = "❚❚ Pause"; $("play").setAttribute("aria-pressed", "true");
    state.playing = setInterval(() => {
      if (state.year >= YEAR_MAX) { clearInterval(state.playing); state.playing = null; $("play").textContent = "▶ Play timeline"; $("play").setAttribute("aria-pressed", "false"); return; }
      setYear(state.year + 1);
    }, 1100);
  });

  /* ---------------- search ---------------- */
  const searchInput = $("search"), results = $("searchResults");
  const index = [
    ...Object.entries(M.players).map(([id, p]) => ({ type: "player", id, label: p.name, meta: p.hq, text: `${p.name} ${p.hq} ${p.partners.join(" ")} ${p.categories.map(t => M.tech[t].label).join(" ")}`.toLowerCase() })),
    ...M.cities.map(c => ({ type: "city", id: c.id, label: c.name, meta: countryById[c.country].name, text: `${c.name} ${countryById[c.country].name}`.toLowerCase() })),
    ...M.countries.map(c => ({ type: "country", id: c.id, label: c.name, meta: c.region, text: `${c.name} ${c.region}`.toLowerCase() })),
    ...TECH_IDS.map(t => ({ type: "tech", id: t, label: M.tech[t].label, meta: "technology filter", text: M.tech[t].label.toLowerCase() })),
  ];
  let activeIdx = -1, current = [];
  function runSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { results.hidden = true; searchInput.setAttribute("aria-expanded", "false"); return; }
    const rank = (x) => { const l = x.label.toLowerCase(); return l === q ? 0 : l.startsWith(q) ? 1 : l.includes(q) ? 2 : 3; };
    current = index.filter(x => x.text.includes(q)).sort((a, b) => rank(a) - rank(b)).slice(0, 14);
    activeIdx = current.length ? 0 : -1;
    const groups = d3.group(current, x => x.type);
    const order = ["player", "city", "country", "tech"], names = { player: "Players", city: "Cities", country: "Countries", tech: "Technology" };
    results.innerHTML = current.length ? order.filter(t => groups.has(t)).map(t => `<div class="group">${names[t]}</div>${groups.get(t).map(x => `<button role="option" data-i="${current.indexOf(x)}" class="${current.indexOf(x) === activeIdx ? "is-active" : ""}">${esc(x.label)}<span class="meta">${esc(x.meta)}</span></button>`).join("")}`).join("") : `<div class="group">No matches</div>`;
    results.hidden = false; searchInput.setAttribute("aria-expanded", "true");
    results.querySelectorAll("button").forEach(b => b.addEventListener("mousedown", (e) => { e.preventDefault(); choose(current[+b.dataset.i]); }));
  }
  function choose(x) {
    if (!x) return;
    results.hidden = true; searchInput.value = ""; searchInput.setAttribute("aria-expanded", "false");
    if (x.type === "tech") { state.tech = new Set([x.id]); syncChips(); render(); return; }
    setView("map"); select({ type: x.type, id: x.id });
  }
  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("focus", runSearch);
  searchInput.addEventListener("blur", () => setTimeout(() => { results.hidden = true; }, 120));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!current.length) return; activeIdx = (activeIdx + (e.key === "ArrowDown" ? 1 : -1) + current.length) % current.length; results.querySelectorAll("button").forEach(b => b.classList.toggle("is-active", +b.dataset.i === activeIdx)); }
    else if (e.key === "Enter") { choose(current[activeIdx]); }
    else if (e.key === "Escape") { results.hidden = true; searchInput.blur(); }
  });

  /* ---------------- misc UI ---------------- */
  $("railToggle").addEventListener("click", () => { const open = $("rail").classList.toggle("is-open"); $("railToggle").setAttribute("aria-expanded", open); });
  $("mapWrap").addEventListener("pointerdown", () => { if (window.innerWidth <= 960) $("rail").classList.remove("is-open"); });
  $("aboutBtn").addEventListener("click", () => { $("modal").hidden = false; });
  $("modalClose").addEventListener("click", () => { $("modal").hidden = true; });
  $("modal").addEventListener("click", (e) => { if (e.target === $("modal")) $("modal").hidden = true; });
  $("updated").textContent = M.meta.updated;

  const root = document.documentElement;
  function applyTheme(t) { if (t) root.setAttribute("data-theme", t); else root.removeAttribute("data-theme"); try { if (t) localStorage.setItem("rrm-theme", t); else localStorage.removeItem("rrm-theme"); } catch (e) { /* ignore */ } }
  try { const saved = localStorage.getItem("rrm-theme"); if (saved) applyTheme(saved); } catch (e) { /* ignore */ }
  $("themeBtn").addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(isDark ? "light" : "dark");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (!$("modal").hidden) $("modal").hidden = true; else if (state.selection) select(null); }
    if (e.key === "/" && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
  });

  /* ---------------- boot ---------------- */
  size();
  window.addEventListener("resize", () => { size(); });
  render();
  /* deep link: #c-USA, #t-tokyo, #p-serve */
  const m = /^#([ctp])-([A-Za-z0-9_-]+)$/.exec(location.hash || "");
  if (m) {
    const type = { c: "country", t: "city", p: "player" }[m[1]];
    const ok = type === "country" ? countryById[m[2]] : type === "city" ? cityById[m[2]] : M.players[m[2]];
    if (ok) setTimeout(() => select({ type, id: m[2] }), 150);
  }
})();
