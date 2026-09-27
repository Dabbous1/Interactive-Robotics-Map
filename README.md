# Retail Robotics Market Map

An interactive world map of the **on-demand retail autonomous robotics market**: which companies operate in each city and country, how much has been invested, and exactly which technologies they develop and use.

It covers six technology families: sidewalk delivery robots, road-going autonomous delivery vehicles, delivery drones, middle-mile autonomous trucks, in-store retail robots, and unmanned robotic stores with micro-fulfilment automation.

## Live website

The site is published with GitHub Pages at **https://dabbous1.github.io/Interactive-Robotics-Map/** and redeploys automatically from `main` through `.github/workflows/pages.yml`.

## Run it locally

Everything is static and self-contained, so any file server works. Clone the repository, then from its folder run one of:

```sh
npm start                      # Node: serves http://localhost:8000 and opens the browser
python3 -m http.server 8000    # Python: then open http://localhost:8000
```

Opening `index.html` directly from disk also works. There is no build step, and no network access is required apart from Google Fonts (falls back to system fonts) and the showcase photos and videos, which load from Wikimedia Commons and YouTube.

## What you can do

- **Explore the map**: pan, scroll-zoom, use the zoom buttons or jump to a region. Countries are shaded by a selectable metric (disclosed funding, players present, deployments, cities). City bubbles are sized by deployment count and coloured by the dominant technology; dashed rings are pilots, faded bubbles are ended programmes.
- **Filter** by technology, deployment status and player role. Double-click a chip to isolate it. Legend swatches toggle technologies too.
- **Replay the timeline** from 2016 to 2026 with the slider or the Play button. Deployments appear the year they launched and disappear after they end.
- **Open profiles**: click a country for its investment tier, regulatory context, players by role, technology developed locally versus imported, and cities. Click a city for its deployments and history. Click a player for funding, in-house versus third-party technology, partners and footprint. Selecting a player highlights its footprint on the map.
- **Showcase media**: every player profile, city drawer and country drawer carries a photo or a video of the robots in operation. Videos play inline (they open on YouTube when the page runs inside a sandboxed frame), photos come from Wikimedia Commons with a credit link to the file page, and a line drawing of the machine type stands in when an image cannot load. Operators without their own footage show the partner technology they deploy, labelled as such.
- **Gallery view** lists every player matching the filters as a media card with links to the website, video, newsroom and photo source.
- **Search** players, cities, countries and technologies (press `/`).
- **Table view** lists every deployment matching the filters, sortable by column.
- Deep links: `#c-USA` (country), `#t-tokyo` (city), `#p-serve` (player).
- Light and dark themes follow the system setting, with a manual toggle.

## Project layout

| Path | Purpose |
|---|---|
| `index.html` | Page shell |
| `css/styles.css` | Design tokens (light and dark), layout and components |
| `js/data.js` | The dataset: technology taxonomy, players, countries, cities and deployments |
| `js/media.js` | Showcase media per player: website, YouTube video, Wikimedia Commons photo, newsroom, city-specific videos |
| `js/illustrations.js` | Fallback line illustrations, one per technology family |
| `js/app.js` | Map rendering (D3 + TopoJSON), filters, timeline, drawer, search and table |
| `data/world-50m.js` | Natural Earth 1:50m country geometry from `world-atlas`, wrapped as a script |
| `vendor/` | Pinned D3 7.9.0 and topojson-client 3.1.0 builds (see `vendor/LICENSES.md`) |
| `.github/workflows/pages.yml` | GitHub Pages deployment on every push to `main` |

## Editing the data

All content lives in `js/data.js`:

- `players` — one entry per company with `role` (developer, operator, retailer), `categories`, `fundingUSDm` (set `corporate: true` for internally funded programmes so they are not summed), `develops` (in-house technology) and `uses` (third-party technology).
- `countries` — ISO numeric code (`iso`) used to match the map geometry, plus regulation and summary text.
- `cities` — coordinates and a list of `deployments` referencing a player, a technology, a start year (`since`), optional end year (`until`), status, partner and note.

A quick consistency check:

```sh
node -e 'global.window={};require("./js/data.js");const M=window.MARKET;const P=M.players;const ids=new Set(M.countries.map(c=>c.id));M.cities.forEach(c=>c.deployments.forEach(d=>{if(!P[d.player]||!M.tech[d.tech]||!ids.has(c.country))throw new Error(c.id)}));console.log("ok")'
```

### Media

`js/media.js` holds one entry per player: `site`, `video` (YouTube watch URL and title), `channel`, `image` (a Wikimedia Commons `File:` title plus its page URL), `press`, optional `deploymentVideos` (city-specific clips) and, for operators without their own footage, `proxy` naming the technology partner whose media to show. Images are loaded through Commons' `Special:FilePath` redirect, so only the file title is needed. Every URL was taken from a public search result; nothing is guessed.

## Data caveats

Figures are approximate and compiled from public announcements, filings and trade press up to September 2026. Funding totals are rounded and exclude undisclosed rounds; corporate programmes (Amazon, Alphabet, Meituan, JD, Walmart and others) are flagged rather than estimated. Deployment years mark the first public operation in a city. Showcase videos are official or press uploads hosted on YouTube and remain the property of their uploaders; Commons photos carry their own free licences, stated on the linked file pages. A few images show the partner's machine rather than the operator's own (flagged with a note in the media file).
