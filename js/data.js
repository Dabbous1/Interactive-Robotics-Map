/* ------------------------------------------------------------------
   Retail Autonomous Robotics Market Map — dataset
   ------------------------------------------------------------------
   Scope: autonomous robots that fulfil on-demand retail orders
   (food, grocery, convenience, parcels): sidewalk robots, road-going
   delivery vehicles, delivery drones, middle-mile trucks, in-store
   robots and micro-fulfilment automation.

   Figures are approximate, compiled from public announcements,
   filings and press coverage up to Q3 2026. "Funding" means publicly
   disclosed equity raised by companies headquartered in the country;
   corporate programmes (Amazon, Meituan, JD, Alphabet…) are funded
   internally and are shown as "corporate" rather than summed.
   ------------------------------------------------------------------ */
window.MARKET = {
  meta: {
    updated: "September 2026",
    title: "Retail Autonomous Robotics Market Map",
  },

  /* Technology categories — colour slots follow the validated palette */
  tech: {
    sidewalk: { label: "Sidewalk delivery robot", short: "Sidewalk robot", glyph: "◆",
      desc: "Small electric robots (10–50 kg payload) that travel on pavements and bike lanes at walking speed to deliver food, grocery and convenience orders." },
    road:     { label: "Road autonomous delivery vehicle", short: "Road vehicle", glyph: "▲",
      desc: "Zero-occupant or driver-out vehicles operating on public roads (Level 4) with remote supervision; includes robotaxi fleets used for delivery." },
    drone:    { label: "Delivery drone", short: "Drone", glyph: "✦",
      desc: "Autonomous uncrewed aircraft (multirotor, hybrid VTOL or fixed-wing) delivering parcels of 1–5 kg, typically lowered by tether or dropped at a hub." },
    middle:   { label: "Middle-mile autonomous truck", short: "Middle-mile", glyph: "■",
      desc: "Driver-out box trucks moving goods between distribution centres, dark stores and retail outlets on fixed, repeatable routes." },
    instore:  { label: "In-store retail robot", short: "In-store", glyph: "●",
      desc: "Autonomous robots inside stores: shelf-scanning and inventory, hazard detection, floor care with inventory sensing, service and delivery within venues." },
    mfc:      { label: "Robotic store & micro-fulfilment automation", short: "Robotic store / MFC", glyph: "◎",
      desc: "Unmanned robotic stores, nano- and micro-fulfilment centres and warehouse robots that pick, store and dispense on-demand retail orders without staff." },
  },

  roles: {
    developer: "Technology developer",
    operator:  "Delivery platform / operator",
    retailer:  "Retailer / brand deploying",
  },

  statuses: {
    active: "Commercial operations",
    pilot:  "Pilot / trial",
    ended:  "Ended / paused",
  },

  /* ---------------------------------------------------------------- */
  players: {
    /* ============================ USA ============================ */
    serve: { name: "Serve Robotics", hq: "Redwood City, California", country: "USA", founded: 2017, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 350, fundingNote: "≈$350M+ raised; Nasdaq-listed (SERV) since 2024. Spun out of Postmates/Uber in 2021.",
      status: "active", scale: "2,000-robot fleet target reached end of 2025; Uber Eats, DoorDash and 7-Eleven orders across five US metros.",
      develops: ["Gen 3 sidewalk robot with Level 4 autonomy (no continuous remote pilot)", "Multimodal navigation AI trained on delivery data", "Fleet orchestration integrated with Uber Eats & DoorDash APIs", "Autocado kitchen automation (via Vebu acquisition)"],
      uses: ["NVIDIA Jetson Orin edge compute", "Ouster digital lidar + stereo cameras", "Magna International contract manufacturing", "Wing drone hand-off for long-range legs (Dallas)"],
      partners: ["Uber Eats", "DoorDash", "7-Eleven", "Shake Shack", "Wing"] },

    coco: { name: "Coco Robotics", hq: "Los Angeles, California", country: "USA", founded: 2020, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 120, fundingNote: "≈$120M raised, incl. $80M round in 2025 with backing from Sam Altman and Max Altman.",
      status: "active", scale: "500,000+ deliveries; ~1,000 robots across Los Angeles, Chicago, Miami and Helsinki.",
      develops: ["Coco 1 four-wheel cargo robot (90 L insulated bay)", "Remote-piloting platform transitioning to autonomy", "Real-world driving dataset partnership with OpenAI for autonomy models"],
      uses: ["Segway-built drivetrain/chassis", "OpenAI models for perception & planning research", "4G/5G teleoperation links", "Uber Eats & DoorDash order integration"],
      partners: ["Uber Eats", "DoorDash", "Wolt", "OpenAI"] },

    starship: { name: "Starship Technologies", hq: "San Francisco (engineering in Tallinn)", country: "USA", founded: 2014, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 230, fundingNote: "≈$230M raised, incl. $90M Series C (2025) led by Plural and Iconical.",
      status: "active", scale: "8M+ autonomous deliveries; 2,000+ robots on ~50 US campuses, UK towns, Estonia and Finland.",
      develops: ["Six-wheel sidewalk robot (10 kg payload, 6 km/h)", "Camera-first Level 4 autonomy (>99% autonomous, remote assist for edge cases)", "Wireless charging docks", "Starship Deliveries consumer app & campus integration"],
      uses: ["Bosch and TDK sensor components", "4G cellular connectivity", "Grubhub, Co-op, Tesco and Bolt ordering channels"],
      partners: ["Grubhub", "Co-op", "Tesco", "Bolt", "Sodexo"] },

    nuro: { name: "Nuro", hq: "Mountain View, California", country: "USA", founded: 2016, role: "developer",
      categories: ["road"], fundingUSDm: 2200, fundingNote: "≈$2.2B raised (SoftBank, Google, Tiger Global); $6B valuation at $106M Series E (2025).",
      status: "active", scale: "Pivoted in 2024–25 from own delivery fleet to licensing the Nuro Driver; robotaxi programme with Uber and Lucid; retail pilots with Kroger, Walmart, Domino's, 7-Eleven, FedEx.",
      develops: ["Nuro Driver Level 4 stack (lidar, radar, camera fusion, in-house AI)", "R2/R3 zero-occupant delivery vehicles", "Remote-assist teleoperations", "Safety case for occupant-less road use (first FMVSS exemption, 2020)"],
      uses: ["NVIDIA DRIVE Thor compute", "BYD-built R3 vehicle platform", "Lucid Gravity vehicles (robotaxi)", "Uber network for demand"],
      partners: ["Uber", "Lucid", "Kroger", "Walmart", "Domino's", "7-Eleven", "FedEx"] },

    kiwibot: { name: "Kiwibot", hq: "Miami, Florida (R&D in Medellín)", country: "USA", founded: 2017, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 35, fundingNote: "≈$35M raised; Sodexo strategic investment.",
      status: "active", scale: "500+ robots on 30+ US university campuses; advertising-robot business added 2024.",
      develops: ["Kiwibot 4.x sidewalk robot", "Semi-autonomous navigation with remote supervisors in Colombia", "Campus ordering integrations"],
      uses: ["Camera-based perception", "Cellular teleoperation", "Sodexo and Grubhub campus dining platforms"],
      partners: ["Sodexo", "Grubhub", "Rappi"] },

    cartken: { name: "Cartken", hq: "Oakland, California", country: "USA", founded: 2019, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 20, fundingNote: "≈$20M raised (Series A 2023).",
      status: "active", scale: "Uber Eats and Grubhub deliveries in Miami, Fairfax and Columbus; first Level 4 sidewalk robot approved under Japan's 2023 rules (with Mitsubishi Electric); shifted focus toward industrial logistics in 2024–25.",
      develops: ["Model C six-wheel robot", "Camera-only autonomy (no lidar) from ex-Google robotics team", "Fleet management software licensed to partners"],
      uses: ["Six RGB cameras + AI perception", "Mitsubishi Electric operations in Japan", "Uber Eats / Grubhub order flow"],
      partners: ["Uber Eats", "Grubhub", "Mitsubishi Electric", "Rakuten"] },

    ottonomy: { name: "Ottonomy.IO", hq: "New York (R&D in India)", country: "USA", founded: 2020, role: "developer",
      categories: ["sidewalk", "instore"], fundingUSDm: 8, fundingNote: "≈$8M seed funding.",
      status: "active", scale: "Ottobot deployments at airports (Cincinnati, Pittsburgh, Rome Fiumicino) and retail curbside pickup.",
      develops: ["Ottobot Yeti indoor/outdoor robot with self-opening cargo", "Contextual AI navigation (lidar + camera SLAM)", "Curbside and in-terminal retail delivery workflows"],
      uses: ["NVIDIA Jetson compute", "3D lidar + depth cameras", "Airport retail concessions partners"],
      partners: ["Aeroporti di Roma", "CVG Airport", "Pittsburgh Airport", "Posten Bring"] },

    avride: { name: "Avride", hq: "Austin, Texas", country: "USA", founded: 2024, role: "developer",
      categories: ["sidewalk", "road"], fundingUSDm: 375, fundingNote: "Nebius committed $375M (2024–25); Uber strategic investment (2025). Formerly Yandex Self-Driving Group.",
      status: "active", scale: "Uber Eats sidewalk deliveries in Austin, Dallas and Jersey City; Grubhub campus robots (Ohio State); robotaxi launch in Dallas with Uber; Rakuten robots in Tokyo.",
      develops: ["4th-generation sidewalk robot (lidar + cameras, 4-wheel steering)", "Level 4 driving stack shared across robots and robotaxis", "Remote-assist and fleet tooling"],
      uses: ["Hyundai IONIQ 5 robotaxi platform", "Uber Eats & Grubhub demand", "Nebius cloud & AI compute"],
      partners: ["Uber", "Grubhub", "Rakuten", "Hyundai", "Nebius"] },

    zipline: { name: "Zipline", hq: "South San Francisco, California", country: "USA", founded: 2014, role: "developer",
      categories: ["drone"], fundingUSDm: 1000, fundingNote: "≈$1B+ raised; $4.2B valuation (2023).",
      status: "active", scale: "1.5M+ commercial deliveries and 100M+ autonomous miles; Walmart home delivery in Dallas–Fort Worth and Arkansas; national health networks in Rwanda, Ghana, Nigeria, Kenya, Côte d'Ivoire.",
      develops: ["Platform 1 fixed-wing long-range drone (P1)", "Platform 2 hybrid VTOL with tethered 'Zip' droid for precise doorstep drop (P2)", "Acoustic detect-and-avoid system", "Autonomous logistics & fleet-management software"],
      uses: ["FAA Part 135 air carrier certificate and BVLOS approvals", "Walmart store-side loading docks", "Sweetgreen, Panera, Chipotle order integrations"],
      partners: ["Walmart", "Sweetgreen", "Panera", "Toyota Tsusho", "Governments of Rwanda & Ghana"] },

    wing: { name: "Wing (Alphabet)", hq: "Palo Alto, California", country: "USA", founded: 2012, role: "developer",
      categories: ["drone"], fundingUSDm: 0, corporate: true, fundingNote: "Funded internally by Alphabet (undisclosed).",
      status: "active", scale: "450,000+ deliveries; Walmart partnership expanding to 100+ stores in Dallas–Fort Worth, Atlanta, Charlotte, Houston, Orlando and Tampa; DoorDash in Australia and the US.",
      develops: ["Hybrid VTOL delivery drone (1.1–2.3 kg payload)", "Wing Delivery Network fleet software", "OpenSky UTM (unmanned traffic management)", "AutoLoader curbside loading station"],
      uses: ["FAA Part 135 certificate & BVLOS waivers", "Walmart and DoorDash order systems", "Serve Robotics robots for sidewalk hand-off (Dallas)"],
      partners: ["Walmart", "DoorDash", "Coles", "Serve Robotics"] },

    flytrex: { name: "Flytrex", hq: "Tel Aviv (US operations in Texas & North Carolina)", country: "ISR", founded: 2013, role: "developer",
      categories: ["drone"], fundingUSDm: 60, fundingNote: "≈$60M raised (Series C $40M, 2021).",
      status: "active", scale: "Backyard drone delivery in Dallas–Fort Worth suburbs and North Carolina; DoorDash and Uber Eats integrations (2025).",
      develops: ["Six-rotor drone with tethered lowering (3 kg payload)", "Cloud flight-control and order-routing system", "Backyard delivery UX"],
      uses: ["FAA Part 135 via Causey Aviation Unmanned", "DoorDash, Uber Eats and restaurant partner order flow"],
      partners: ["DoorDash", "Uber Eats", "Walmart", "Chick-fil-A"] },

    amazon: { name: "Amazon (Prime Air & Scout)", hq: "Seattle, Washington", country: "USA", founded: 2013, role: "operator",
      categories: ["drone", "sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; Amazon has invested billions in Prime Air since 2013. Scout sidewalk robot was shut down in 2022.",
      status: "active", scale: "MK30 drone deliveries in Arizona, Texas, Missouri; UK (Darlington) and Italy sites approved; target 500M drone deliveries per year by 2030.",
      develops: ["MK30 hybrid drone (2.3 kg payload, 60-minute delivery)", "Sense-and-avoid and safety-case system (FAA BVLOS approval 2024)", "Scout six-wheel sidewalk robot (discontinued 2022)"],
      uses: ["Amazon same-day fulfilment sites as launch pads", "FAA Part 135 certificate", "UK CAA sandbox approval"],
      partners: [] },

    doordash: { name: "DoorDash (DoorDash Labs, Dot)", hq: "San Francisco, California", country: "USA", founded: 2013, role: "operator",
      categories: ["sidewalk", "road", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (NYSE: DASH); owns Wolt.",
      status: "active", scale: "Own 'Dot' road-and-sidewalk delivery robot launched in Phoenix metro (2025); autonomous delivery marketplace 'Dash Autonomy' with Wing, Flytrex, Manna, Coco, Serve and Waymo.",
      develops: ["Dot autonomous delivery robot (road-going up to 32 km/h, 13 kg payload)", "Autonomous Delivery Platform dispatching human, robot and drone couriers", "Merchant-side loading workflows"],
      uses: ["Wing, Flytrex and Manna drones", "Coco and Serve sidewalk robots", "Waymo robotaxis (Phoenix pilot)"],
      partners: ["Wing", "Flytrex", "Manna", "Coco", "Serve Robotics", "Waymo"] },

    uber: { name: "Uber Eats (Autonomous)", hq: "San Francisco, California", country: "USA", founded: 2014, role: "operator",
      categories: ["sidewalk", "road"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (NYSE: UBER); strategic investments in Avride, Nuro, Wayve, Serve.",
      status: "active", scale: "Largest aggregator of third-party delivery robots: Serve, Coco, Cartken, Avride, Nuro; Mitsubishi Electric/Cartken robots in Tokyo; Flytrex drones.",
      develops: ["Autonomous-delivery dispatch layer matching orders to robot fleets", "Consumer hand-off UX (unlock robot via app)"],
      uses: ["Serve, Coco, Cartken and Avride sidewalk robots", "Nuro Driver vehicles", "Flytrex drones"],
      partners: ["Serve Robotics", "Coco", "Cartken", "Avride", "Nuro", "Mitsubishi Electric", "Flytrex"] },

    waymo: { name: "Waymo (Alphabet)", hq: "Mountain View, California", country: "USA", founded: 2009, role: "developer",
      categories: ["road"], fundingUSDm: 0, corporate: true, fundingNote: "Primarily robotaxi; $5.6B round (2024) led by Alphabet. Not counted in retail-robotics funding totals.",
      status: "pilot", scale: "Autonomous DoorDash deliveries in Phoenix metro using Waymo robotaxis (2025 pilot).",
      develops: ["Waymo Driver Level 4 stack (5th/6th gen lidar, radar, cameras)", "Fully driverless operations at scale"],
      uses: ["Jaguar I-PACE and Zeekr vehicle platforms", "DoorDash order flow"],
      partners: ["DoorDash", "Uber"] },

    gatik: { name: "Gatik", hq: "Mountain View, California", country: "USA", founded: 2017, role: "developer",
      categories: ["middle"], fundingUSDm: 300, fundingNote: "≈$300M raised (Isuzu $30M 2024; Goodyear, Ryder, Koch).",
      status: "active", scale: "Driver-out box trucks for Walmart (Arkansas since 2021), Kroger and Sam's Club (Dallas–Fort Worth), Loblaw (Toronto).",
      develops: ["Level 4 middle-mile autonomy for fixed routes", "Freight-Only driver-out operations", "Route-constrained safety case"],
      uses: ["Isuzu N-Series box trucks", "NVIDIA DRIVE compute", "Lidar, radar and camera suite"],
      partners: ["Walmart", "Kroger", "Sam's Club", "Loblaw", "Isuzu"] },

    simbe: { name: "Simbe Robotics", hq: "San Francisco, California", country: "USA", founded: 2014, role: "developer",
      categories: ["instore"], fundingUSDm: 100, fundingNote: "≈$100M raised (Series C 2024, Series D 2025).",
      status: "active", scale: "Tally robots chain-wide at BJ's Wholesale, Schnucks, SpartanNash; pilots with Albertsons, Wakefern and Carrefour.",
      develops: ["Tally autonomous shelf-scanning robot", "Computer-vision + RFID out-of-stock and price-compliance detection", "Store Intelligence analytics platform"],
      uses: ["Depth cameras and lidar for navigation", "Retailer planogram and pricing data feeds"],
      partners: ["BJ's Wholesale", "Schnucks", "SpartanNash", "Carrefour", "Albertsons"] },

    braincorp: { name: "Brain Corp", hq: "San Diego, California", country: "USA", founded: 2009, role: "developer",
      categories: ["instore"], fundingUSDm: 400, fundingNote: "≈$400M raised (SoftBank Vision Fund; $36M in 2024).",
      status: "active", scale: "30,000+ BrainOS robots; inventory-scanning towers on floor scrubbers across ~600 Sam's Club stores.",
      develops: ["BrainOS autonomous navigation OS for commercial robots", "Inventory Scan tower (shelf imaging while cleaning)", "Fleet analytics"],
      uses: ["Tennant and Nilfisk floor-care machines", "Retailer inventory systems"],
      partners: ["Sam's Club", "Walmart", "Kroger", "Tennant"] },

    badger: { name: "Badger Technologies (Jabil)", hq: "Nicholasville, Kentucky", country: "USA", founded: 2016, role: "developer",
      categories: ["instore"], fundingUSDm: 0, corporate: true, fundingNote: "Subsidiary of Jabil.",
      status: "active", scale: "Marty hazard-detection and inventory robots in ~500 Giant, Stop & Shop, Woodman's and Busy Beaver stores.",
      develops: ["Marty autonomous in-store robot", "Hazard (spill) detection and shelf-condition imaging"],
      uses: ["Jabil manufacturing", "Retailer store systems"],
      partners: ["Ahold Delhaize (Giant, Stop & Shop)", "Woodman's"] },

    walmart: { name: "Walmart", hq: "Bentonville, Arkansas", country: "USA", founded: 1962, role: "retailer",
      categories: ["drone", "middle", "mfc", "road"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate investments; acquired Alert Innovation (2022); backed Gatik, Cruise and DroneUp.",
      status: "active", scale: "Largest retail drone-delivery programme in the US (Wing & Zipline, 100+ stores by 2026); Gatik middle-mile; Alphabot micro-fulfilment.",
      develops: ["Alphabot automated fulfilment system (via Alert Innovation)", "Store-side drone loading operations"],
      uses: ["Wing and Zipline drones", "Gatik autonomous trucks", "Brain Corp inventory scanners (Sam's Club)", "Nuro & Cruise vehicles (pilots ended)"],
      partners: ["Wing", "Zipline", "Gatik", "Brain Corp"] },

    kroger: { name: "Kroger", hq: "Cincinnati, Ohio", country: "USA", founded: 1883, role: "retailer",
      categories: ["mfc", "road", "middle"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate investment; Ocado partnership since 2018 (multi-billion CFC programme).",
      status: "active", scale: "Ocado-powered automated customer fulfilment centres; Nuro delivery pilots (Scottsdale, Houston); Gatik middle-mile in Dallas.",
      develops: [],
      uses: ["Ocado Smart Platform grid robots", "Nuro vehicles", "Gatik trucks"],
      partners: ["Ocado", "Nuro", "Gatik"] },

    grubhub: { name: "Grubhub (Wonder)", hq: "Chicago, Illinois", country: "USA", founded: 2004, role: "operator",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; acquired by Wonder Group in 2025.",
      status: "active", scale: "Campus robot delivery on 50+ US universities with Starship, Cartken, Avride and Kiwibot.",
      develops: ["Campus dining integration for robot hand-off"],
      uses: ["Starship, Cartken, Avride and Kiwibot robots"],
      partners: ["Starship", "Cartken", "Avride", "Kiwibot"] },

    droneup: { name: "DroneUp", hq: "Virginia Beach, Virginia", country: "USA", founded: 2016, role: "developer",
      categories: ["drone"], fundingUSDm: 50, fundingNote: "≈$50M raised; Walmart minority investment.",
      status: "ended", scale: "Ran Walmart drone hubs in Arkansas, Texas, Arizona and Florida (2021–24); wound down most hubs in 2024 and pivoted to autonomy technology.",
      develops: ["Drone hub ground infrastructure", "Autonomous delivery software"],
      uses: ["Walmart store sites"],
      partners: ["Walmart"] },

    alert: { name: "Alert Innovation / Walmart Alphabot", hq: "Salem, New Hampshire", country: "USA", founded: 2013, role: "developer",
      categories: ["mfc"], fundingUSDm: 0, corporate: true, fundingNote: "Acquired by Walmart in 2022.",
      status: "active", scale: "Alphabot micro-fulfilment systems attached to Walmart stores for online grocery pickup.",
      develops: ["Alphabot autonomous tote-shuttling bots on 3D grid"],
      uses: ["Walmart store footprint"],
      partners: ["Walmart"] },

    bear: { name: "Bear Robotics", hq: "Redwood City, California (LG-controlled)", country: "USA", founded: 2017, role: "developer",
      categories: ["instore"], fundingUSDm: 200, fundingNote: "≈$200M raised; LG Electronics took a controlling stake ($60M, 2024).",
      status: "active", scale: "Servi service robots in restaurants and retail venues in the US, Korea and Japan.",
      develops: ["Servi and Servi Plus autonomous tray-carrying robots", "Indoor navigation and fleet software"],
      uses: ["LG Electronics manufacturing and distribution"],
      partners: ["LG Electronics"] },

    fabric: { name: "Fabric", hq: "Tel Aviv & New York", country: "ISR", founded: 2015, role: "developer",
      categories: ["mfc"], fundingUSDm: 336, fundingNote: "≈$336M raised (Series C $200M, 2021).",
      status: "active", scale: "Robotic micro-fulfilment centres for grocery and pharmacy in Israel and the US.",
      develops: ["Fabric MFC robots and software (grid-based picking)", "Order-orchestration platform"],
      uses: ["Retailer OMS integrations"],
      partners: ["Super-Pharm", "Instacart (ended)"] },

    tinymile: { name: "Tiny Mile", hq: "Miami, Florida (founded in Toronto)", country: "CAN", founded: 2019, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 5, fundingNote: "≈$5M raised.",
      status: "active", scale: "Remotely-piloted 'Geoffrey' robots; left Toronto after the 2021 sidewalk-robot ban and relocated to Miami.",
      develops: ["Geoffrey lightweight teleoperated robot", "Low-cost remote-piloting stack"],
      uses: ["Cellular teleoperation", "Local restaurant partners"],
      partners: [] },

    attabotics: { name: "Attabotics", hq: "Calgary, Alberta", country: "CAN", founded: 2016, role: "developer",
      categories: ["mfc"], fundingUSDm: 165, fundingNote: "≈$165M raised (Ontario Teachers', Export Development Canada); entered receivership in 2025.",
      status: "ended", scale: "3D vertical micro-fulfilment robots; ceased operations 2025.",
      develops: ["Attabot 3D storage & retrieval robots"],
      uses: [],
      partners: [] },

    /* ====================== UK / Ireland / Nordics ====================== */
    wayve: { name: "Wayve", hq: "London", country: "GBR", founded: 2017, role: "developer",
      categories: ["road"], fundingUSDm: 1300, fundingNote: "≈$1.3B raised, incl. $1.05B Series C (2024, SoftBank, NVIDIA, Microsoft) and Uber investment.",
      status: "active", scale: "Grocery-van delivery trials with Asda and Ocado in London (2021–23); now licensing embodied-AI driving to OEMs and Uber robotaxis.",
      develops: ["End-to-end learned driving (AV2.0) without HD maps", "GAIA generative world model for simulation", "Lingo language-driving models"],
      uses: ["NVIDIA compute", "Ocado and Asda delivery vans for data collection"],
      partners: ["Ocado", "Asda", "Uber", "Nissan"] },

    ocado: { name: "Ocado Group", hq: "Hatfield, Hertfordshire", country: "GBR", founded: 2000, role: "developer",
      categories: ["mfc"], fundingUSDm: 0, corporate: true, fundingNote: "LSE-listed; £1B+ cumulative technology capex; invested in Oxbotica (£10M) and Wayve (£10M).",
      status: "active", scale: "Ocado Smart Platform powering Kroger (US), Sobeys, Coles, Aeon and Casino automated fulfilment centres; Ocado Zoom rapid grocery.",
      develops: ["Grid-based 'Hive' swarm robots (3,000+ per CFC)", "Robotic picking arms", "On-Grid Robotic Pick", "Ocado Smart Platform software"],
      uses: ["Oxa autonomous vehicles for kerb-to-kitchen trials", "Wayve vans for autonomous delivery research"],
      partners: ["Kroger", "Sobeys", "Coles", "Aeon", "Oxa", "Wayve"] },

    oxa: { name: "Oxa (Oxbotica)", hq: "Oxford", country: "GBR", founded: 2014, role: "developer",
      categories: ["road"], fundingUSDm: 225, fundingNote: "≈$225M raised (Series C $140M, 2023; Ocado investor).",
      status: "pilot", scale: "Autonomous grocery delivery trials with Ocado; primary focus now industrial & passenger shuttles.",
      develops: ["Oxa Driver universal autonomy software", "MetaDriver simulation & validation"],
      uses: ["Ocado delivery vehicles"],
      partners: ["Ocado"] },

    coop: { name: "Co-op (UK)", hq: "Manchester", country: "GBR", founded: 1844, role: "retailer",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Largest grocery robot-delivery programme in Europe: 300+ Starship robots across Milton Keynes, Northampton, Cambridge, Leeds, Bedford, Wakefield and Manchester (Trafford).",
      develops: [],
      uses: ["Starship Technologies robots and app"],
      partners: ["Starship"] },

    tesco: { name: "Tesco", hq: "Welwyn Garden City", country: "GBR", founded: 1919, role: "retailer",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Starship robot delivery from Tesco Express stores in Bedford (2022) and Milton Keynes.",
      develops: [], uses: ["Starship Technologies robots"], partners: ["Starship"] },

    academy: { name: "Academy of Robotics (Kar-go)", hq: "Hounslow, London", country: "GBR", founded: 2017, role: "developer",
      categories: ["road"], fundingUSDm: 6, fundingNote: "≈£5M raised via crowdfunding and grants.",
      status: "pilot", scale: "Kar-go autonomous delivery vehicle trials (pharmacy and parcel) in London.",
      develops: ["Kar-go road-legal delivery vehicle", "Autonomous parcel sorting bay"],
      uses: ["Public-road trial approvals"], partners: [] },

    manna: { name: "Manna Drone Delivery", hq: "Dublin", country: "IRL", founded: 2018, role: "developer",
      categories: ["drone"], fundingUSDm: 60, fundingNote: "≈$60M raised (Series A $25M 2021; $30M 2025 from Molten Ventures and Coca-Cola HBC).",
      status: "active", scale: "200,000+ flights in Dublin suburbs; DoorDash, Deliveroo, Just Eat and Tesco Ireland integrations; US and Nordic expansion (2025–26).",
      develops: ["Custom quadcopter (3.5 kg payload, 80 km/h) with tethered drop", "Autonomous flight and remote-monitoring platform", "Merchant loading app"],
      uses: ["IAA / EASA U-space approvals", "DoorDash and Deliveroo order flow"],
      partners: ["DoorDash", "Deliveroo", "Just Eat", "Tesco Ireland", "Coca-Cola HBC"] },

    clevon: { name: "Clevon", hq: "Tallinn (manufacturing in Viljandi)", country: "EST", founded: 2021, role: "developer",
      categories: ["road"], fundingUSDm: 15, fundingNote: "≈€15M raised; listed on Nasdaq First North Tallinn (2022). Spun out of Cleveron parcel-terminal maker.",
      status: "active", scale: "Clevon 1 road-legal robot carriers for DHL and Coop in Estonia; US pilots in Texas; Dutch and Lithuanian trials.",
      develops: ["Clevon 1 Level 4 road-going delivery robot (25 km/h, 250 kg payload)", "Teleoperation centre & fleet software", "Parcel-locker integration (Cleveron)"],
      uses: ["Public-road permits in Estonia (2022)", "DHL and Coop Estonia logistics"],
      partners: ["DHL", "Coop Estonia", "Draiver (US)"] },

    bolt: { name: "Bolt (Bolt Food)", hq: "Tallinn", country: "EST", founded: 2013, role: "operator",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (Bolt raised $2B+ for mobility; robotics spend undisclosed).",
      status: "active", scale: "Starship robot food delivery in Tallinn since 2021.",
      develops: [], uses: ["Starship Technologies robots"], partners: ["Starship"] },

    wolt: { name: "Wolt (DoorDash)", hq: "Helsinki", country: "FIN", founded: 2014, role: "operator",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "DoorDash-owned since 2022.",
      status: "active", scale: "Coco robots in Helsinki (2025) as the first European city in DoorDash's autonomy programme; earlier Starship trials in Tallinn.",
      develops: [], uses: ["Coco Robotics robots", "Starship robots (Tallinn)"], partners: ["Coco", "Starship"] },

    hugo: { name: "HUGO Delivery", hq: "Gothenburg", country: "SWE", founded: 2020, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 3, fundingNote: "≈$3M raised.",
      status: "pilot", scale: "Sidewalk robot pilots with Foodora in Gothenburg and Stockholm.",
      develops: ["HUGO teleoperated sidewalk robot"], uses: ["Foodora order flow"], partners: ["Foodora"] },

    deliveryhero: { name: "Delivery Hero", hq: "Berlin", country: "DEU", founded: 2011, role: "operator",
      categories: ["sidewalk", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (parent of Woowa Brothers, Talabat, foodpanda, Glovo).",
      status: "active", scale: "Group-level autonomous delivery unit coordinating robot programmes in Korea (Woowa Dilly), the Gulf (Talabat) and Asia (foodpanda).",
      develops: ["Group autonomous-delivery integration layer"], uses: ["Woowa Dilly robots", "Third-party robots via Talabat"], partners: ["Woowa Brothers", "Talabat"] },

    /* ====================== Continental Europe ====================== */
    loxo: { name: "LOXO", hq: "Bern", country: "CHE", founded: 2021, role: "developer",
      categories: ["road"], fundingUSDm: 10, fundingNote: "≈CHF 10M raised.",
      status: "pilot", scale: "Migros 'Migronomous' autonomous grocery van in Ebikon (2023–24); Schindler campus deliveries.",
      develops: ["Alpha autonomous electric delivery van (Level 4 with remote supervision)", "LOXO Digital Driver software"],
      uses: ["Swiss federal road-trial approvals", "Migros online orders"], partners: ["Migros", "Schindler"] },

    goggo: { name: "Goggo Network", hq: "Madrid", country: "ESP", founded: 2018, role: "operator",
      categories: ["sidewalk", "road"], fundingUSDm: 50, fundingNote: "≈€44M Series A (2019, SoftBank, Axel Springer).",
      status: "pilot", scale: "Autonomous food-delivery and vending robots in Zaragoza and Madrid; operator/licensing model for European cities.",
      develops: ["Goggo Cart autonomous street vending & delivery robot", "Fleet operations platform"],
      uses: ["Third-party autonomy hardware", "Municipal trial permits"], partners: ["Zaragoza City Council"] },

    twinswheel: { name: "TwinswHeel (Soben)", hq: "Cahors, Occitanie", country: "FRA", founded: 2016, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 8, fundingNote: "≈€7M raised.",
      status: "active", scale: "Delivery droids for Franprix, Carrefour and DPD in Paris, Montpellier and Cahors.",
      develops: ["TwinswHeel two-wheel self-balancing droid family (up to 300 kg)", "Follow-me and autonomous modes"],
      uses: ["Lidar + camera navigation", "Retail partner logistics"], partners: ["Franprix", "Carrefour", "DPD"] },

    carrefour: { name: "Carrefour", hq: "Massy, Paris", country: "FRA", founded: 1959, role: "retailer",
      categories: ["instore", "sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "pilot", scale: "Simbe Tally shelf-scanning pilots in France; TwinswHeel droid trials.",
      develops: [], uses: ["Simbe Tally robots", "TwinswHeel droids"], partners: ["Simbe", "TwinswHeel"] },

    yape: { name: "YAPE (e-Novia)", hq: "Milan", country: "ITA", founded: 2017, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 5, fundingNote: "Funded by e-Novia group.",
      status: "pilot", scale: "Two-wheel sidewalk robot pilots with Poste Italiane and in Japan.",
      develops: ["YAPE self-balancing two-wheel delivery robot", "Facial-recognition parcel release"],
      uses: ["Poste Italiane logistics"], partners: ["Poste Italiane"] },

    delivers: { name: "Delivers AI", hq: "Istanbul", country: "TUR", founded: 2020, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 4, fundingNote: "≈$3.5M raised.",
      status: "active", scale: "Autonomous sidewalk robots in Istanbul with Yemeksepeti/Getir-style on-demand orders; European expansion plans.",
      develops: ["Delivers AI sidewalk robot", "Autonomy stack with remote supervision"],
      uses: ["Lidar + camera navigation", "Local platform integrations"], partners: [] },

    /* ====================== Middle East ====================== */
    talabat: { name: "Talabat (Delivery Hero)", hq: "Dubai", country: "ARE", founded: 2004, role: "operator",
      categories: ["sidewalk", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; listed on Dubai Financial Market (2024).",
      status: "pilot", scale: "Robot delivery pilots at Dubai Silicon Oasis and The Sustainable City; drone delivery trials in Dubai (2023–25).",
      develops: ["Talabot delivery-robot operations & app hand-off"], uses: ["Third-party sidewalk robots", "Drone partners under DCAA approvals"], partners: ["Dubai Silicon Oasis Authority", "Dubai RTA"] },

    keeta: { name: "Keeta / Meituan Overseas", hq: "Hong Kong (Meituan international brand)", country: "HKG", founded: 2023, role: "operator",
      categories: ["drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme of Meituan (HKEX: 3690).",
      status: "active", scale: "Keeta Drone: first regular drone food delivery in Hong Kong (2025); approved by Dubai Civil Aviation Authority (2025); Riyadh operations.",
      develops: ["Keeta Drone routes & landing kiosks adapted from Meituan's UAV platform"], uses: ["Meituan fourth-generation delivery drone", "DCAA / HK CAD approvals"], partners: ["Meituan", "Dubai Civil Aviation Authority"] },

    neubility: { name: "Neubility", hq: "Seoul", country: "KOR", founded: 2017, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 50, fundingNote: "≈$50M raised (Samsung Venture, Lotte Ventures, IMM).",
      status: "active", scale: "400+ Neubie robots (golf courses, campuses, 7-Eleven & Lotte convenience deliveries); pilots in Saudi Arabia, Japan and the US.",
      develops: ["Neubie sidewalk robot", "Camera-only (lidar-free) vision autonomy", "Neubie Go patrol & security variant"],
      uses: ["4G/5G connectivity", "Korean Intelligent Robot Act certification"], partners: ["7-Eleven Korea", "Lotte", "Samsung Welstory"] },

    snoonu: { name: "Snoonu", hq: "Doha", country: "QAT", founded: 2019, role: "operator",
      categories: ["drone"], fundingUSDm: 0, corporate: true, fundingNote: "Privately funded Qatari super-app.",
      status: "pilot", scale: "Qatar's first commercial drone delivery pilots (2024–25) under QCAA approvals.",
      develops: ["Drone delivery order flow within Snoonu app"], uses: ["Third-party delivery drones", "QCAA trial approvals"], partners: ["Qatar Civil Aviation Authority"] },

    /* ====================== China ====================== */
    meituan: { name: "Meituan", hq: "Beijing", country: "CHN", founded: 2010, role: "operator",
      categories: ["road", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; multi-billion RMB R&D. Investor in Pudu and Neolix.",
      status: "active", scale: "5M+ autonomous ground-vehicle orders (Beijing Shunyi since 2020, Shenzhen, Shanghai); 500,000+ drone orders across 50+ routes in Shenzhen, Shanghai and Guangzhou; Keeta Drone overseas.",
      develops: ["Meituan autonomous delivery vehicle (Level 4 with remote monitoring)", "Fourth-generation delivery drone & 'aerial hub' smart kiosks", "Dispatch AI matching riders, vehicles and drones"],
      uses: ["Lidar + camera perception", "Beijing high-level AV demonstration zone permits", "Shenzhen low-altitude airspace approvals"],
      partners: ["Neolix", "Pudu", "Shenzhen Municipality"] },

    jd: { name: "JD.com / JD Logistics", hq: "Beijing", country: "CHN", founded: 1998, role: "operator",
      categories: ["road", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (JD Logistics HKEX: 2618).",
      status: "active", scale: "Fifth-generation autonomous delivery vehicles in Beijing and Changshu ('first autonomous delivery city'); rural drone routes in Jiangsu and Shaanxi.",
      develops: ["JD autonomous delivery vehicle (in-house L4 stack)", "Long-range logistics drones", "Smart parcel lockers & unattended stations"],
      uses: ["Lidar and camera fusion", "Local road permits in Changshu and Beijing"], partners: ["Changshu Municipality"] },

    cainiao: { name: "Cainiao (Alibaba)", hq: "Hangzhou", country: "CHN", founded: 2013, role: "operator",
      categories: ["road"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (Alibaba Group).",
      status: "active", scale: "'Xiaomanlv' autonomous vehicles on 400+ campuses and communities, 20M+ parcels delivered; Freshippo (Hema) grocery delivery tests in Shanghai.",
      develops: ["Xiaomanlv Level 4 campus delivery vehicle (ex-DAMO Academy)", "Autonomous fleet dispatch"],
      uses: ["Lidar + camera fusion", "Alibaba cloud AI"], partners: ["Freshippo", "Universities"] },

    neolix: { name: "Neolix", hq: "Beijing", country: "CHN", founded: 2018, role: "developer",
      categories: ["road"], fundingUSDm: 150, fundingNote: "≈$150M+ raised (Meituan, Li Auto, Yunfeng).",
      status: "active", scale: "3,000+ Level 4 delivery vans across 100+ Chinese cities; overseas pilots in the UAE, Saudi Arabia and Europe.",
      develops: ["X3 / X6 Level 4 urban delivery vans", "Vending, retail and food-truck variants", "Remote-operations centre"],
      uses: ["Solid-state lidar + cameras", "City road-use permits (Beijing Yizhuang first, 2021)"], partners: ["Meituan", "JD", "Dubai & Abu Dhabi authorities"] },

    whiterhino: { name: "White Rhino (Baixi Niu)", hq: "Beijing", country: "CHN", founded: 2019, role: "developer",
      categories: ["road"], fundingUSDm: 60, fundingNote: "≈$60M raised.",
      status: "active", scale: "Level 4 delivery vehicles for Yonghui Superstores, Ele.me and Meituan in Beijing and Shanghai.",
      develops: ["R-series Level 4 delivery vehicles", "Self-developed autonomy stack"],
      uses: ["Lidar + camera perception", "Beijing and Shanghai pilot-zone permits"], partners: ["Yonghui", "Ele.me", "Meituan"] },

    pudu: { name: "Pudu Robotics", hq: "Shenzhen", country: "CHN", founded: 2016, role: "developer",
      categories: ["instore"], fundingUSDm: 400, fundingNote: "≈$400M raised (Meituan, Sequoia China).",
      status: "active", scale: "100,000+ service robots in 60+ countries; retail, restaurant and building delivery.",
      develops: ["BellaBot / KettyBot / FlashBot delivery robots", "PUDU T300 industrial delivery", "Indoor navigation & elevator integration"],
      uses: ["Lidar + visual SLAM", "Global distributor network"], partners: ["Meituan"] },

    keenon: { name: "Keenon Robotics", hq: "Shanghai", country: "CHN", founded: 2010, role: "developer",
      categories: ["instore"], fundingUSDm: 300, fundingNote: "≈$300M raised (SoftBank Vision Fund $200M, 2021); HKEX listing 2025.",
      status: "active", scale: "Service and delivery robots in 600+ cities worldwide.",
      develops: ["Dinerbot and Butlerbot delivery robots", "Keenon autonomous navigation"],
      uses: ["Lidar + vision SLAM"], partners: ["SoftBank Robotics"] },

    antwork: { name: "Antwork", hq: "Hangzhou", country: "CHN", founded: 2015, role: "developer",
      categories: ["drone"], fundingUSDm: 30, fundingNote: "≈$30M raised.",
      status: "active", scale: "First urban drone-delivery operating licence in China (2019); medical and retail routes in Hangzhou.",
      develops: ["RA3 multirotor drone", "Automated landing & parcel stations"],
      uses: ["CAAC pilot approvals"], partners: [] },

    /* ====================== Japan ====================== */
    panasonic: { name: "Panasonic", hq: "Osaka (robots tested in Fujisawa & Tokyo)", country: "JPN", founded: 1918, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Remote-monitored Level 4 sidewalk robots in Fujisawa Sustainable Smart Town and Tokyo (Takanawa Gateway) under 2023 Road Traffic Act rules.",
      develops: ["X-Area small delivery robot", "One-operator, multi-robot remote monitoring", "Elevator & building integration"],
      uses: ["Japan 2023 Level 4 remote-operated small vehicle framework"], partners: ["Rakuten", "JR East"] },

    zmp: { name: "ZMP", hq: "Tokyo", country: "JPN", founded: 2001, role: "developer",
      categories: ["sidewalk"], fundingUSDm: 20, fundingNote: "≈$20M raised.",
      status: "active", scale: "DeliRo delivery robots in Tokyo (Chuo, Tsukishima) with ENEOS, Nippon Express and local retailers.",
      develops: ["DeliRo delivery robot", "RoboCar autonomy platform", "ZMP remote operations"],
      uses: ["Lidar + camera navigation", "Tokyo public-sidewalk permits"], partners: ["ENEOS", "Nippon Express"] },

    rakuten: { name: "Rakuten", hq: "Tokyo", country: "JPN", founded: 1997, role: "operator",
      categories: ["sidewalk", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Robot deliveries in Tokyo (Chuo, Harumi, Nihonbashi) using Cartken and Avride robots; drone delivery in Chiba and Fujisawa with Panasonic.",
      develops: ["Rakuten Drone and UGV delivery app"], uses: ["Cartken and Avride robots", "Panasonic X-Area robots"], partners: ["Cartken", "Avride", "Panasonic", "Seiyu"] },

    mitsubishi: { name: "Mitsubishi Electric", hq: "Tokyo", country: "JPN", founded: 1921, role: "operator",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Operates Cartken robots for Uber Eats in Tokyo (Nihonbashi, 2024) — Japan's first commercial Level 4 sidewalk delivery service.",
      develops: ["Robot fleet operations centre & building integration"], uses: ["Cartken Model C robots", "Uber Eats order flow"], partners: ["Cartken", "Uber Eats"] },

    /* ====================== Korea ====================== */
    woowa: { name: "Woowa Brothers (Baemin)", hq: "Seoul", country: "KOR", founded: 2010, role: "operator",
      categories: ["sidewalk", "instore"], fundingUSDm: 0, corporate: true, fundingNote: "Delivery Hero subsidiary; Woowa's robot unit spun into 'Bear Robotics'-style JV investments.",
      status: "active", scale: "Dilly robots delivering in Seoul (Teheran-ro) and Suwon apartment complexes; indoor elevator-riding robots in office towers.",
      develops: ["Dilly Drive outdoor delivery robot", "Dilly Tower indoor robot with elevator control", "Baemin robot-order integration"],
      uses: ["Lidar + camera navigation", "Intelligent Robot Act certification (2023)"], partners: ["Delivery Hero", "Hyundai Elevator"] },

    lg: { name: "LG Electronics", hq: "Seoul", country: "KOR", founded: 1958, role: "developer",
      categories: ["instore"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; $60M controlling stake in Bear Robotics (2024).",
      status: "active", scale: "CLOi ServeBot and delivery robots in stores, hotels and hospitals; Bear Robotics majority owner.",
      develops: ["CLOi robot family", "Indoor autonomous navigation"], uses: ["Bear Robotics Servi platform"], partners: ["Bear Robotics"] },

    /* ====================== Rest of Asia ====================== */
    otsaw: { name: "OTSAW", hq: "Singapore", country: "SGP", founded: 2015, role: "developer",
      categories: ["sidewalk", "instore"], fundingUSDm: 15, fundingNote: "≈$15M raised.",
      status: "active", scale: "Camello grocery-delivery robots in Punggol (with NTUC FairPrice and Grab trials); Camello+ for hospitals and campuses.",
      develops: ["Camello / Camello+ autonomous delivery robot", "3D lidar + AI navigation", "Fleet management"],
      uses: ["LTA sandbox approvals", "Retail partner order flow"], partners: ["NTUC FairPrice", "Grab", "JTC"] },

    grab: { name: "Grab", hq: "Singapore", country: "SGP", founded: 2012, role: "operator",
      categories: ["sidewalk", "drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (Nasdaq: GRAB).",
      status: "pilot", scale: "GrabFood robot-runner pilots in Singapore malls and Punggol; drone logistics trials.",
      develops: ["Robot hand-off within Grab app"], uses: ["OTSAW and third-party robots"], partners: ["OTSAW"] },

    skyeair: { name: "Skye Air Mobility", hq: "Gurugram", country: "IND", founded: 2020, role: "developer",
      categories: ["drone"], fundingUSDm: 15, fundingNote: "≈$15M raised.",
      status: "active", scale: "100,000+ drone deliveries in Gurugram/Delhi NCR for Flipkart, Blue Dart, Zomato and Swiggy Instamart.",
      develops: ["Skye Ship One multirotor drone", "Skye UTM traffic-management platform", "Automated drone ports"],
      uses: ["DGCA BVLOS approvals under Drone Rules 2021"], partners: ["Flipkart", "Blue Dart", "Zomato", "Swiggy"] },

    garuda: { name: "Garuda Aerospace", hq: "Chennai", country: "IND", founded: 2015, role: "developer",
      categories: ["drone"], fundingUSDm: 30, fundingNote: "≈$30M raised.",
      status: "pilot", scale: "Grocery drone-delivery pilots with Swiggy Instamart in Bengaluru and Delhi NCR.",
      develops: ["Garuda delivery drones", "Drone-as-a-service platform"], uses: ["DGCA approvals"], partners: ["Swiggy"] },

    swiggy: { name: "Swiggy", hq: "Bengaluru", country: "IND", founded: 2014, role: "operator",
      categories: ["drone", "sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (NSE-listed 2024).",
      status: "pilot", scale: "Instamart grocery drone pilots (Garuda, Skye Air, ANRA) in Bengaluru and Delhi NCR; Ottonomy robot pilots.",
      develops: ["Instamart drone-delivery order flow"], uses: ["Skye Air and Garuda drones"], partners: ["Skye Air", "Garuda Aerospace"] },

    /* ====================== Oceania ====================== */
    coles: { name: "Coles", hq: "Melbourne", country: "AUS", founded: 1914, role: "retailer",
      categories: ["drone", "mfc"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme; Ocado CFC partnership.",
      status: "active", scale: "Wing drone grocery delivery in Canberra and Logan; Ocado-powered fulfilment centres in Melbourne and Sydney.",
      develops: [], uses: ["Wing drones", "Ocado Smart Platform"], partners: ["Wing", "Ocado"] },

    /* ====================== Africa ====================== */
    /* Zipline (US) operates here; national health systems are the customers */

    /* ====================== Latin America ====================== */
    rappi: { name: "Rappi", hq: "Bogotá", country: "COL", founded: 2015, role: "operator",
      categories: ["sidewalk"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "ended", scale: "Kiwibot robot deliveries in Medellín during 2020–21 pandemic pilot.",
      develops: [], uses: ["Kiwibot robots"], partners: ["Kiwibot"] },

    ifood: { name: "iFood", hq: "Osasco, São Paulo", country: "BRA", founded: 2011, role: "operator",
      categories: ["drone"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme (Prosus/Movile).",
      status: "active", scale: "First ANAC-approved commercial drone delivery in Latin America (Campinas 2020, Aracaju 2021) with Speedbird Aero.",
      develops: ["Hybrid drone + courier last-mile routing"], uses: ["Speedbird Aero DLV-1 drones"], partners: ["Speedbird Aero"] },

    speedbird: { name: "Speedbird Aero", hq: "Franca, São Paulo", country: "BRA", founded: 2018, role: "developer",
      categories: ["drone"], fundingUSDm: 6, fundingNote: "≈$6M raised.",
      status: "active", scale: "DLV-1 and DLV-2 delivery drones for iFood, Natura and Mercado Livre.",
      develops: ["DLV-series multirotor drones", "Drone-ports and mission software"], uses: ["ANAC certification (2020)"], partners: ["iFood", "Natura"] },

    /* ====================== Canada ====================== */
    loblaw: { name: "Loblaw", hq: "Brampton, Ontario", country: "CAN", founded: 1919, role: "retailer",
      categories: ["middle"], fundingUSDm: 0, corporate: true, fundingNote: "Corporate programme.",
      status: "active", scale: "Gatik driver-out middle-mile trucks in the Greater Toronto Area since 2020 (fully driverless 2023).",
      develops: [], uses: ["Gatik autonomous box trucks"], partners: ["Gatik"] },
  },

  /* ---------------------------------------------------------------- */
  countries: [
    { id: "USA", iso: "840", name: "United States", region: "North America",
      regulation: "State-level personal-delivery-device laws (Virginia first, 2017; 20+ states); FAA Part 135 and 2024–25 BVLOS approvals for Zipline, Wing and Amazon; city permits (San Francisco restricts sidewalk robots).",
      summary: "Largest and most capitalised market. Uber Eats and DoorDash aggregate sidewalk robots from Serve, Coco, Cartken and Avride; Walmart runs the biggest retail drone programme with Wing and Zipline; Nuro and Gatik lead road and middle-mile autonomy." },
    { id: "CAN", iso: "124", name: "Canada", region: "North America",
      regulation: "Toronto banned sidewalk robots in 2021 (accessibility); Ontario permits middle-mile driver-out trials; Transport Canada drone rules (BVLOS 2025).",
      summary: "Middle-mile leadership through Gatik and Loblaw; consumer sidewalk robots pushed out by municipal bans; Attabotics fulfilment start-up failed in 2025." },
    { id: "GBR", iso: "826", name: "United Kingdom", region: "Europe",
      regulation: "No national sidewalk-robot statute; operations rely on local-authority agreement (Milton Keynes since 2018). CAA sandbox approved Amazon Prime Air (Darlington, 2025). Automated Vehicles Act 2024 for road AVs.",
      summary: "Europe's largest grocery robot-delivery footprint (Starship with Co-op and Tesco) plus deep-tech capital in Wayve, Oxa and Ocado's fulfilment robotics." },
    { id: "IRL", iso: "372", name: "Ireland", region: "Europe",
      regulation: "IAA operational authorisations under EASA rules; Dublin U-space pilots.",
      summary: "Manna made Dublin's suburbs the busiest drone-delivery market in Europe, with DoorDash, Deliveroo and Tesco on board." },
    { id: "EST", iso: "233", name: "Estonia", region: "Europe",
      regulation: "First EU law legalising sidewalk delivery robots (2017); road-legal autonomous robot carriers permitted from 2022.",
      summary: "Birthplace of Starship's engineering; Clevon road robots and Bolt's robot food delivery make Tallinn a live testbed." },
    { id: "FIN", iso: "246", name: "Finland", region: "Europe",
      regulation: "Light delivery robots treated as pedestrians; Traficom drone approvals (Wing 2019–20).",
      summary: "Helsinki is DoorDash/Wolt's first European city for Coco sidewalk robots; earlier Starship and Wing trials." },
    { id: "SWE", iso: "752", name: "Sweden", region: "Europe",
      regulation: "Municipal trial permits; Transport Agency exemptions.",
      summary: "Small pilots by HUGO Delivery with Foodora." },
    { id: "DEU", iso: "276", name: "Germany", region: "Europe",
      regulation: "Autonomous Driving Act (2021) for Level 4 vehicles; no dedicated sidewalk-robot rule.",
      summary: "Delivery Hero coordinates group-wide robot programmes from Berlin; limited domestic street deployments." },
    { id: "CHE", iso: "756", name: "Switzerland", region: "Europe",
      regulation: "Federal Roads Office trial approvals; 2025 ordinance enabling driverless vehicles on approved routes.",
      summary: "LOXO's autonomous grocery van with Migros was the first of its kind in the country." },
    { id: "ESP", iso: "724", name: "Spain", region: "Europe",
      regulation: "DGT autonomous-vehicle trial framework; municipal permits in Zaragoza.",
      summary: "Goggo Network runs autonomous vending and delivery pilots in Zaragoza and Madrid." },
    { id: "FRA", iso: "250", name: "France", region: "Europe",
      regulation: "2021 decree authorising Level 4 automated vehicles on approved routes; sidewalk droid trials via prefectural authorisation.",
      summary: "TwinswHeel droids serve Franprix and Carrefour; Carrefour pilots Simbe's shelf-scanning robots." },
    { id: "ITA", iso: "380", name: "Italy", region: "Europe",
      regulation: "ENAC drone sandbox approvals (Amazon Prime Air site); ministerial AV trial decree.",
      summary: "YAPE robots with Poste Italiane; Ottonomy robots serving retail at Rome Fiumicino airport." },
    { id: "TUR", iso: "792", name: "Turkey", region: "Europe",
      regulation: "No dedicated framework; municipal cooperation.",
      summary: "Delivers AI operates Istanbul's first autonomous sidewalk delivery robots." },
    { id: "ISR", iso: "376", name: "Israel", region: "Middle East",
      regulation: "National Drone Initiative (Israel Innovation Authority, 2021–) for urban drone corridors.",
      summary: "Home of Flytrex (drones) and Fabric (micro-fulfilment); technology mostly deployed abroad." },
    { id: "ARE", iso: "784", name: "United Arab Emirates", region: "Middle East",
      regulation: "Dubai Self-Driving Transport Strategy (25% autonomous trips by 2030); DCAA drone approvals for Keeta (2025); free-zone robot pilots.",
      summary: "Dubai is the Gulf's showcase: Talabat robot pilots, Keeta drone approval and Neolix vans." },
    { id: "SAU", iso: "682", name: "Saudi Arabia", region: "Middle East",
      regulation: "GACA drone approvals; Riyadh autonomous-vehicle pilots under Vision 2030 programmes.",
      summary: "Neubility, Neolix and Keeta running Riyadh pilots backed by government innovation funds." },
    { id: "QAT", iso: "634", name: "Qatar", region: "Middle East",
      regulation: "QCAA trial approvals for commercial drones (2024).",
      summary: "Snoonu leads the country's first drone-delivery pilots." },
    { id: "CHN", iso: "156", name: "China", region: "Asia",
      regulation: "Beijing Yizhuang issued first road-use permits for unmanned delivery vehicles (2021); Shenzhen intelligent-connected-vehicle regulation (2022); national 'low-altitude economy' policy (2024) for drones.",
      summary: "Largest fleet of road-going delivery robots (Meituan, JD, Cainiao, Neolix, White Rhino) and the most mature urban drone delivery (Meituan Shenzhen)." },
    { id: "HKG", iso: "344", name: "Hong Kong", region: "Asia",
      regulation: "Civil Aviation Department sandbox for low-altitude economy (2025).",
      summary: "Keeta Drone launched the city's first regular drone food delivery in 2025." },
    { id: "JPN", iso: "392", name: "Japan", region: "Asia",
      regulation: "Road Traffic Act amendment (April 2023) legalising Level 4 remote-monitored delivery robots on sidewalks at up to 6 km/h; Level 4 drone flights over people allowed from 2022.",
      summary: "Clear national rules unlocked Tokyo services from Uber Eats/Mitsubishi Electric/Cartken, Rakuten with Avride, Panasonic and ZMP." },
    { id: "KOR", iso: "410", name: "South Korea", region: "Asia",
      regulation: "Intelligent Robots Act amendment (Nov 2023) lets certified robots use sidewalks; Road Traffic Act treats them as pedestrians.",
      summary: "Neubility and Woowa Brothers' Dilly robots deliver convenience and food orders in Seoul and Suwon; LG anchors in-store robots." },
    { id: "SGP", iso: "702", name: "Singapore", region: "Asia",
      regulation: "LTA autonomous-vehicle sandbox (Punggol, one-north); CAAS drone trials.",
      summary: "OTSAW and Grab pilots in Punggol; government-backed testbeds." },
    { id: "IND", iso: "356", name: "India", region: "Asia",
      regulation: "Drone Rules 2021 and DGCA BVLOS approvals; PLI incentives for drone makers.",
      summary: "Fast-growing drone quick-commerce: Skye Air and Garuda with Flipkart, Zomato and Swiggy in Delhi NCR and Bengaluru." },
    { id: "AUS", iso: "036", name: "Australia", region: "Oceania",
      regulation: "CASA approvals for Wing (2019); Logan City partnership.",
      summary: "Logan (Queensland) is one of the world's busiest drone-delivery suburbs; Coles and DoorDash on Wing." },
    { id: "RWA", iso: "646", name: "Rwanda", region: "Africa",
      regulation: "Performance-based drone regulation (2018), first in the world.",
      summary: "Zipline's original national network; expanding from medical to e-commerce and retail parcels." },
    { id: "GHA", iso: "288", name: "Ghana", region: "Africa",
      regulation: "GCAA approvals for Zipline national network (2019).",
      summary: "Zipline's largest network (six hubs); consumer/retail deliveries piloted from 2024." },
    { id: "NGA", iso: "566", name: "Nigeria", region: "Africa",
      regulation: "NCAA drone approvals (Kaduna 2022).",
      summary: "Zipline hubs in Kaduna and Cross River states." },
    { id: "KEN", iso: "404", name: "Kenya", region: "Africa",
      regulation: "KCAA approvals (2022).",
      summary: "Zipline Kisumu hub; retail partnerships planned." },
    { id: "COL", iso: "170", name: "Colombia", region: "Latin America",
      regulation: "Municipal permits in Medellín; no national framework.",
      summary: "Kiwibot's engineering and remote-supervision hub in Medellín; Rappi pandemic pilot." },
    { id: "BRA", iso: "076", name: "Brazil", region: "Latin America",
      regulation: "ANAC granted Latin America's first commercial drone-delivery certification (Speedbird Aero, 2020).",
      summary: "iFood and Speedbird Aero pioneered regulated drone food delivery in Campinas and Aracaju." },
  ],

  /* ---------------------------------------------------------------- */
  /* Each city lists deployments: { player, tech, since, until?, status, partner?, note } */
  cities: [
    /* ---------- USA ---------- */
    { id: "sfbay", name: "San Francisco Bay Area", country: "USA", lat: 37.55, lon: -122.20,
      deployments: [
        { player: "serve", tech: "sidewalk", since: 2021, status: "active", note: "Headquarters (Redwood City) and robot engineering." },
        { player: "starship", tech: "sidewalk", since: 2016, status: "active", note: "Corporate HQ; early Redwood City pilots (DoorDash & Postmates, 2017)." },
        { player: "nuro", tech: "road", since: 2016, status: "active", partner: "7-Eleven", note: "HQ in Mountain View; first autonomous commercial delivery in California with 7-Eleven (2021); Uber Eats pilot (2022)." },
        { player: "cartken", tech: "sidewalk", since: 2019, status: "active", note: "Oakland HQ; Bay Area testing." },
        { player: "kiwibot", tech: "sidewalk", since: 2017, status: "ended", until: 2021, note: "Original Berkeley campus deliveries (2017–21) before relocating to Miami." },
        { player: "zipline", tech: "drone", since: 2016, status: "active", note: "South San Francisco HQ and flight-test operations." },
        { player: "wing", tech: "drone", since: 2016, status: "active", note: "Palo Alto HQ and engineering." },
        { player: "gatik", tech: "middle", since: 2017, status: "active", note: "Mountain View HQ." },
        { player: "simbe", tech: "instore", since: 2016, status: "active", note: "HQ; Tally robots in Bay Area grocers." },
        { player: "waymo", tech: "road", since: 2020, status: "active", note: "HQ; fully driverless robotaxi operations across San Francisco (public service 2024)." },
        { player: "doordash", tech: "sidewalk", since: 2019, status: "active", note: "HQ; DoorDash Labs autonomy R&D (Scotty Labs acquisition 2019)." },
        { player: "uber", tech: "sidewalk", since: 2022, status: "active", note: "HQ; autonomous delivery programme management." },
        { player: "bear", tech: "instore", since: 2017, status: "active", note: "HQ; Servi robots in Bay Area restaurants and retail." },
      ] },
    { id: "la", name: "Los Angeles", country: "USA", lat: 34.05, lon: -118.24,
      deployments: [
        { player: "serve", tech: "sidewalk", since: 2022, status: "active", partner: "Uber Eats, 7-Eleven", note: "First and largest Serve market (West Hollywood, Koreatown, Downtown); 7-Eleven convenience delivery." },
        { player: "coco", tech: "sidewalk", since: 2020, status: "active", partner: "Uber Eats, DoorDash", note: "Coco HQ market: Santa Monica, Venice, Hollywood, Downtown." },
        { player: "kiwibot", tech: "sidewalk", since: 2021, status: "pilot", note: "Campus and city pilots (UCLA)." },
      ] },
    { id: "miami", name: "Miami", country: "USA", lat: 25.76, lon: -80.19,
      deployments: [
        { player: "serve", tech: "sidewalk", since: 2025, status: "active", partner: "Uber Eats", note: "Launched 2025 across Brickell, Wynwood and Miami Beach." },
        { player: "coco", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats, DoorDash" },
        { player: "cartken", tech: "sidewalk", since: 2022, status: "ended", until: 2024, partner: "Uber Eats", note: "First Uber Eats sidewalk-robot market (Dadeland)." },
        { player: "kiwibot", tech: "sidewalk", since: 2021, status: "active", note: "Kiwibot HQ; local restaurant deliveries." },
        { player: "tinymile", tech: "sidewalk", since: 2022, status: "active", note: "Relocated from Toronto." },
      ] },
    { id: "dfw", name: "Dallas–Fort Worth", country: "USA", lat: 32.85, lon: -96.95,
      deployments: [
        { player: "wing", tech: "drone", since: 2023, status: "active", partner: "Walmart, DoorDash", note: "Frisco, Plano and 30+ Walmart stores; largest US drone-delivery metro." },
        { player: "zipline", tech: "drone", since: 2025, status: "active", partner: "Walmart", note: "Mesquite launch with Platform 2 droid drop." },
        { player: "flytrex", tech: "drone", since: 2021, status: "active", partner: "DoorDash, Uber Eats", note: "Granbury and Little Elm backyard delivery." },
        { player: "serve", tech: "sidewalk", since: 2025, status: "active", partner: "Uber Eats, Wing", note: "Sidewalk robots plus robot-to-drone hand-off with Wing." },
        { player: "avride", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats", note: "Sidewalk robots in Dallas; robotaxi launch with Uber (2025)." },
        { player: "avride", tech: "road", since: 2025, status: "active", partner: "Uber", note: "Hyundai IONIQ 5 robotaxis." },
        { player: "gatik", tech: "middle", since: 2021, status: "active", partner: "Kroger, Sam's Club", note: "Driver-out box trucks between fulfilment centre and stores." },
        { player: "droneup", tech: "drone", since: 2022, status: "ended", until: 2024, partner: "Walmart" },
      ] },
    { id: "houston", name: "Houston", country: "USA", lat: 29.76, lon: -95.37,
      deployments: [
        { player: "nuro", tech: "road", since: 2019, status: "ended", until: 2023, partner: "Kroger, Walmart, Domino's, FedEx", note: "Multi-retailer autonomous delivery pilots; wound down when Nuro pivoted to licensing." },
        { player: "wing", tech: "drone", since: 2025, status: "active", partner: "Walmart", note: "Part of 2025 five-metro expansion." },
      ] },
    { id: "phoenix", name: "Phoenix metro", country: "USA", lat: 33.45, lon: -112.07,
      deployments: [
        { player: "nuro", tech: "road", since: 2018, status: "ended", until: 2020, partner: "Kroger / Fry's", note: "World's first unmanned grocery delivery (Scottsdale, Dec 2018)." },
        { player: "doordash", tech: "road", since: 2025, status: "active", note: "Dot robot launched in Tempe and Mesa." },
        { player: "waymo", tech: "road", since: 2025, status: "pilot", partner: "DoorDash", note: "Robotaxi-based DoorDash deliveries." },
        { player: "amazon", tech: "drone", since: 2024, status: "active", note: "Prime Air MK30 at Tolleson (West Valley)." },
        { player: "droneup", tech: "drone", since: 2022, status: "ended", until: 2024, partner: "Walmart" },
      ] },
    { id: "austin", name: "Austin", country: "USA", lat: 30.27, lon: -97.74,
      deployments: [
        { player: "avride", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats", note: "Avride HQ; downtown sidewalk deliveries." },
      ] },
    { id: "collegestation", name: "College Station & San Antonio", country: "USA", lat: 30.2, lon: -97.1,
      deployments: [
        { player: "amazon", tech: "drone", since: 2022, status: "active", note: "First Prime Air site (College Station 2022); San Antonio added 2025." },
      ] },
    { id: "chicago", name: "Chicago", country: "USA", lat: 41.88, lon: -87.63,
      deployments: [
        { player: "coco", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats, DoorDash" },
        { player: "serve", tech: "sidewalk", since: 2025, status: "active", partner: "Uber Eats" },
        { player: "grubhub", tech: "sidewalk", since: 2019, status: "active", note: "HQ; campus robot programme management." },
      ] },
    { id: "atlanta", name: "Atlanta", country: "USA", lat: 33.75, lon: -84.39,
      deployments: [
        { player: "serve", tech: "sidewalk", since: 2025, status: "active", partner: "Uber Eats, Shake Shack" },
        { player: "wing", tech: "drone", since: 2025, status: "active", partner: "Walmart" },
      ] },
    { id: "charlotte", name: "Charlotte & Raleigh area", country: "USA", lat: 35.5, lon: -79.8,
      deployments: [
        { player: "wing", tech: "drone", since: 2025, status: "active", partner: "Walmart", note: "Charlotte metro stores." },
        { player: "flytrex", tech: "drone", since: 2020, status: "active", partner: "Walmart, Chick-fil-A", note: "Holly Springs, Raeford and Fayetteville (North Carolina)." },
      ] },
    { id: "christiansburg", name: "Christiansburg, Virginia", country: "USA", lat: 37.13, lon: -80.41,
      deployments: [
        { player: "wing", tech: "drone", since: 2019, status: "active", partner: "Walgreens, FedEx", note: "First US residential drone delivery service." },
      ] },
    { id: "fairfax", name: "Fairfax, Virginia", country: "USA", lat: 38.85, lon: -77.31,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2019, status: "active", partner: "George Mason University", note: "First large-scale US campus robot programme." },
        { player: "cartken", tech: "sidewalk", since: 2022, status: "active", partner: "Uber Eats" },
      ] },
    { id: "columbus", name: "Columbus, Ohio", country: "USA", lat: 40.0, lon: -83.0,
      deployments: [
        { player: "avride", tech: "sidewalk", since: 2023, status: "active", partner: "Grubhub / Ohio State", note: "100-robot campus fleet." },
        { player: "cartken", tech: "sidewalk", since: 2022, status: "active", partner: "Grubhub / Ohio State" },
        { player: "starship", tech: "sidewalk", since: 2021, status: "active", partner: "Grubhub", note: "Ohio campuses incl. Bowling Green." },
      ] },
    { id: "nwark", name: "Northwest Arkansas", country: "USA", lat: 36.37, lon: -94.21,
      deployments: [
        { player: "walmart", tech: "drone", since: 2021, status: "active", note: "Walmart HQ; drone hub programme origin." },
        { player: "zipline", tech: "drone", since: 2023, status: "active", partner: "Walmart", note: "Pea Ridge home delivery." },
        { player: "gatik", tech: "middle", since: 2019, status: "active", partner: "Walmart", note: "First fully driverless commercial middle-mile route (2021)." },
        { player: "droneup", tech: "drone", since: 2021, status: "ended", until: 2024, partner: "Walmart" },
      ] },
    { id: "jerseycity", name: "New York – Jersey City", country: "USA", lat: 40.72, lon: -74.04,
      deployments: [
        { player: "avride", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats" },
        { player: "ottonomy", tech: "sidewalk", since: 2020, status: "active", note: "Ottonomy HQ (New York)." },
        { player: "fabric", tech: "mfc", since: 2019, status: "active", note: "Micro-fulfilment centres for NYC grocery delivery." },
      ] },
    { id: "kansascity", name: "Kansas City", country: "USA", lat: 39.10, lon: -94.58,
      deployments: [
        { player: "amazon", tech: "drone", since: 2025, status: "active", note: "Prime Air MK30 site." },
      ] },
    { id: "seattle", name: "Seattle", country: "USA", lat: 47.61, lon: -122.33,
      deployments: [
        { player: "amazon", tech: "sidewalk", since: 2019, status: "ended", until: 2022, note: "Amazon Scout sidewalk robot programme (Snohomish County) shut down 2022." },
        { player: "amazon", tech: "drone", since: 2016, status: "active", note: "Prime Air programme HQ; first customer drone delivery Dec 2016." },
      ] },
    { id: "sandiego", name: "San Diego", country: "USA", lat: 32.72, lon: -117.16,
      deployments: [
        { player: "braincorp", tech: "instore", since: 2016, status: "active", note: "HQ; first BrainOS retail floor-care robots deployed 2016." },
      ] },
    { id: "stlouis", name: "St. Louis", country: "USA", lat: 38.63, lon: -90.20,
      deployments: [
        { player: "simbe", tech: "instore", since: 2017, status: "active", partner: "Schnucks", note: "Chain-wide Tally deployment (100+ stores)." },
      ] },
    { id: "cincinnati", name: "Cincinnati", country: "USA", lat: 39.10, lon: -84.51,
      deployments: [
        { player: "kroger", tech: "mfc", since: 2018, status: "active", partner: "Ocado", note: "Kroger HQ; Ocado CFC network (Monroe, OH first)." },
        { player: "ottonomy", tech: "instore", since: 2022, status: "active", partner: "CVG Airport", note: "Ottobot retail delivery inside CVG terminal." },
      ] },
    { id: "pittsburgh", name: "Pittsburgh", country: "USA", lat: 40.44, lon: -79.99,
      deployments: [
        { player: "ottonomy", tech: "instore", since: 2022, status: "active", partner: "Pittsburgh International Airport" },
      ] },
    { id: "salem", name: "Salem, New Hampshire", country: "USA", lat: 42.79, lon: -71.20,
      deployments: [
        { player: "alert", tech: "mfc", since: 2019, status: "active", partner: "Walmart", note: "First Alphabot micro-fulfilment centre attached to a Walmart Supercenter." },
      ] },
    { id: "kentucky", name: "Lexington, Kentucky", country: "USA", lat: 38.04, lon: -84.50,
      deployments: [
        { player: "badger", tech: "instore", since: 2016, status: "active", note: "Badger HQ (Nicholasville); Marty robots across Ahold Delhaize banners." },
      ] },

    /* ---------- Canada ---------- */
    { id: "toronto", name: "Toronto", country: "CAN", lat: 43.65, lon: -79.38,
      deployments: [
        { player: "gatik", tech: "middle", since: 2020, status: "active", partner: "Loblaw", note: "Fully driverless middle-mile since 2023." },
        { player: "loblaw", tech: "middle", since: 2020, status: "active", partner: "Gatik" },
        { player: "tinymile", tech: "sidewalk", since: 2019, status: "ended", until: 2021, note: "Pink Geoffrey robots banned by Toronto City Council, Dec 2021." },
      ] },
    { id: "calgary", name: "Calgary", country: "CAN", lat: 51.05, lon: -114.07,
      deployments: [
        { player: "attabotics", tech: "mfc", since: 2016, status: "ended", until: 2025, note: "HQ; ceased operations 2025." },
      ] },

    /* ---------- United Kingdom ---------- */
    { id: "miltonkeynes", name: "Milton Keynes", country: "GBR", lat: 52.04, lon: -0.76,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2018, status: "active", partner: "Co-op, Tesco", note: "World's first town-wide commercial sidewalk-robot grocery service." },
        { player: "coop", tech: "sidewalk", since: 2018, status: "active", partner: "Starship" },
        { player: "tesco", tech: "sidewalk", since: 2020, status: "active", partner: "Starship" },
      ] },
    { id: "northampton", name: "Northampton", country: "GBR", lat: 52.24, lon: -0.90,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2020, status: "active", partner: "Co-op" },
        { player: "coop", tech: "sidewalk", since: 2020, status: "active", partner: "Starship" },
      ] },
    { id: "cambridge", name: "Cambridge", country: "GBR", lat: 52.21, lon: 0.12,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2022, status: "active", partner: "Co-op", note: "Cambridge and Cambourne." },
        { player: "coop", tech: "sidewalk", since: 2022, status: "active", partner: "Starship" },
      ] },
    { id: "leeds", name: "Leeds & Wakefield", country: "GBR", lat: 53.80, lon: -1.55,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2022, status: "active", partner: "Co-op" },
        { player: "coop", tech: "sidewalk", since: 2022, status: "active", partner: "Starship" },
      ] },
    { id: "bedford", name: "Bedford", country: "GBR", lat: 52.14, lon: -0.47,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2022, status: "active", partner: "Tesco, Co-op" },
        { player: "tesco", tech: "sidewalk", since: 2022, status: "active", partner: "Starship", note: "First Tesco Express robot deliveries." },
      ] },
    { id: "manchester", name: "Manchester (Trafford)", country: "GBR", lat: 53.48, lon: -2.24,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2023, status: "active", partner: "Co-op" },
        { player: "coop", tech: "sidewalk", since: 2023, status: "active", partner: "Starship", note: "Co-op HQ city." },
      ] },
    { id: "london", name: "London & Hatfield", country: "GBR", lat: 51.55, lon: -0.15,
      deployments: [
        { player: "wayve", tech: "road", since: 2021, status: "ended", until: 2023, partner: "Asda, Ocado", note: "Autonomous grocery-van trials in London; company now licenses AI to carmakers and Uber." },
        { player: "ocado", tech: "mfc", since: 2016, status: "active", note: "Hatfield HQ; grid-robot CFC at Andover opened 2016; Erith is the world's largest automated grocery warehouse." },
        { player: "academy", tech: "road", since: 2020, status: "pilot", note: "Kar-go pharmacy and parcel trials in Hounslow." },
      ] },
    { id: "oxford", name: "Oxford", country: "GBR", lat: 51.75, lon: -1.26,
      deployments: [
        { player: "oxa", tech: "road", since: 2021, status: "pilot", partner: "Ocado", note: "Kerb-to-kitchen autonomous delivery research." },
      ] },
    { id: "darlington", name: "Darlington", country: "GBR", lat: 54.52, lon: -1.55,
      deployments: [
        { player: "amazon", tech: "drone", since: 2025, status: "pilot", note: "First UK Prime Air site approved by the CAA." },
      ] },

    /* ---------- Ireland ---------- */
    { id: "dublin", name: "Dublin", country: "IRL", lat: 53.35, lon: -6.26,
      deployments: [
        { player: "manna", tech: "drone", since: 2020, status: "active", partner: "DoorDash, Deliveroo, Tesco Ireland", note: "Blanchardstown, Dublin 15 and Balbriggan: thousands of flights per week." },
        { player: "wing", tech: "drone", since: 2022, status: "ended", until: 2024, note: "Lusk trial." },
      ] },

    /* ---------- Estonia ---------- */
    { id: "tallinn", name: "Tallinn", country: "EST", lat: 59.44, lon: 24.75,
      deployments: [
        { player: "starship", tech: "sidewalk", since: 2016, status: "active", partner: "Bolt, Wolt", note: "Engineering HQ; commercial robot food delivery since 2021." },
        { player: "bolt", tech: "sidewalk", since: 2021, status: "active", partner: "Starship" },
        { player: "clevon", tech: "road", since: 2022, status: "active", partner: "DHL, Coop Estonia", note: "Clevon 1 robots on public roads." },
      ] },
    { id: "viljandi", name: "Viljandi", country: "EST", lat: 58.36, lon: 25.59,
      deployments: [
        { player: "clevon", tech: "road", since: 2021, status: "active", note: "Manufacturing and first road-legal parcel robot routes (2022)." },
      ] },

    /* ---------- Finland ---------- */
    { id: "helsinki", name: "Helsinki & Espoo", country: "FIN", lat: 60.17, lon: 24.94,
      deployments: [
        { player: "coco", tech: "sidewalk", since: 2025, status: "active", partner: "Wolt", note: "First European Coco market." },
        { player: "wolt", tech: "sidewalk", since: 2025, status: "active", partner: "Coco" },
        { player: "starship", tech: "sidewalk", since: 2017, status: "ended", until: 2020, partner: "Wolt", note: "Early Espoo pilots." },
        { player: "wing", tech: "drone", since: 2019, status: "ended", until: 2020, note: "Vuosaari drone delivery pilot." },
      ] },

    /* ---------- Sweden ---------- */
    { id: "gothenburg", name: "Gothenburg", country: "SWE", lat: 57.71, lon: 11.97,
      deployments: [
        { player: "hugo", tech: "sidewalk", since: 2021, status: "pilot", partner: "Foodora" },
      ] },

    /* ---------- Germany ---------- */
    { id: "berlin", name: "Berlin", country: "DEU", lat: 52.52, lon: 13.40,
      deployments: [
        { player: "deliveryhero", tech: "sidewalk", since: 2021, status: "active", note: "Group HQ; coordinates Woowa Dilly and Talabat robot programmes." },
      ] },

    /* ---------- Switzerland ---------- */
    { id: "bern", name: "Bern & Lucerne", country: "CHE", lat: 46.95, lon: 7.45,
      deployments: [
        { player: "loxo", tech: "road", since: 2023, status: "pilot", partner: "Migros, Schindler", note: "Migronomous grocery van in Ebikon (Lucerne)." },
      ] },

    /* ---------- Spain ---------- */
    { id: "zaragoza", name: "Zaragoza", country: "ESP", lat: 41.65, lon: -0.89,
      deployments: [
        { player: "goggo", tech: "sidewalk", since: 2022, status: "pilot", partner: "Zaragoza City Council", note: "Autonomous vending & food robots on city streets." },
      ] },
    { id: "madrid", name: "Madrid", country: "ESP", lat: 40.42, lon: -3.70,
      deployments: [
        { player: "goggo", tech: "road", since: 2019, status: "pilot", note: "Goggo HQ; autonomous delivery van and robot pilots." },
      ] },

    /* ---------- France ---------- */
    { id: "paris", name: "Paris", country: "FRA", lat: 48.86, lon: 2.35,
      deployments: [
        { player: "twinswheel", tech: "sidewalk", since: 2019, status: "active", partner: "Franprix, DPD", note: "Droid deliveries in Paris arrondissements." },
        { player: "carrefour", tech: "instore", since: 2023, status: "pilot", partner: "Simbe", note: "Tally shelf-scanning pilots in Île-de-France hypermarkets." },
        { player: "simbe", tech: "instore", since: 2023, status: "pilot", partner: "Carrefour" },
      ] },
    { id: "montpellier", name: "Montpellier", country: "FRA", lat: 43.61, lon: 3.88,
      deployments: [
        { player: "twinswheel", tech: "sidewalk", since: 2018, status: "active", note: "Long-running municipal droid deliveries." },
      ] },

    /* ---------- Italy ---------- */
    { id: "milan", name: "Milan", country: "ITA", lat: 45.46, lon: 9.19,
      deployments: [
        { player: "yape", tech: "sidewalk", since: 2018, status: "pilot", partner: "Poste Italiane" },
      ] },
    { id: "rome", name: "Rome", country: "ITA", lat: 41.90, lon: 12.50,
      deployments: [
        { player: "ottonomy", tech: "instore", since: 2022, status: "active", partner: "Aeroporti di Roma", note: "Ottobot retail delivery at Fiumicino Airport." },
        { player: "amazon", tech: "drone", since: 2025, status: "pilot", note: "Prime Air Italy (San Salvo, Abruzzo) approved by ENAC." },
      ] },

    /* ---------- Turkey ---------- */
    { id: "istanbul", name: "Istanbul", country: "TUR", lat: 41.01, lon: 28.98,
      deployments: [
        { player: "delivers", tech: "sidewalk", since: 2021, status: "active", note: "Bahçeşehir and Ataşehir districts." },
      ] },

    /* ---------- Israel ---------- */
    { id: "telaviv", name: "Tel Aviv", country: "ISR", lat: 32.08, lon: 34.78,
      deployments: [
        { player: "flytrex", tech: "drone", since: 2017, status: "active", note: "HQ; National Drone Initiative food-delivery trials (first on-demand drone service launched 2017 in Reykjavik)." },
        { player: "fabric", tech: "mfc", since: 2018, status: "active", partner: "Super-Pharm", note: "HQ; first MFCs in Tel Aviv." },
      ] },

    /* ---------- Gulf ---------- */
    { id: "dubai", name: "Dubai", country: "ARE", lat: 25.20, lon: 55.27,
      deployments: [
        { player: "talabat", tech: "sidewalk", since: 2022, status: "pilot", partner: "Dubai Silicon Oasis, Sustainable City", note: "Talabot robot pilots." },
        { player: "talabat", tech: "drone", since: 2023, status: "pilot", note: "Drone delivery trials with DCAA." },
        { player: "keeta", tech: "drone", since: 2025, status: "pilot", note: "DCAA approval for Keeta Drone operations." },
        { player: "neolix", tech: "road", since: 2023, status: "pilot", note: "Level 4 vans tested in Dubai and Abu Dhabi (Masdar City)." },
      ] },
    { id: "riyadh", name: "Riyadh", country: "SAU", lat: 24.71, lon: 46.68,
      deployments: [
        { player: "neubility", tech: "sidewalk", since: 2024, status: "pilot", note: "Neubie robots with Saudi partners." },
        { player: "neolix", tech: "road", since: 2023, status: "pilot" },
        { player: "keeta", tech: "drone", since: 2025, status: "pilot", note: "Keeta food delivery launched 2024; drone trials 2025." },
      ] },
    { id: "doha", name: "Doha", country: "QAT", lat: 25.29, lon: 51.53,
      deployments: [
        { player: "snoonu", tech: "drone", since: 2024, status: "pilot" },
      ] },

    /* ---------- China ---------- */
    { id: "beijing", name: "Beijing", country: "CHN", lat: 39.90, lon: 116.40,
      deployments: [
        { player: "meituan", tech: "road", since: 2020, status: "active", note: "Shunyi district: 4M+ autonomous grocery/food orders since 2020; Yizhuang permits 2021." },
        { player: "jd", tech: "road", since: 2018, status: "active", note: "HQ; autonomous vehicles in Yizhuang and Haidian." },
        { player: "neolix", tech: "road", since: 2018, status: "active", note: "HQ; first road-use permits (Yizhuang, 2021)." },
        { player: "whiterhino", tech: "road", since: 2019, status: "active", partner: "Yonghui, Ele.me" },
      ] },
    { id: "shanghai", name: "Shanghai", country: "CHN", lat: 31.23, lon: 121.47,
      deployments: [
        { player: "meituan", tech: "drone", since: 2023, status: "active", note: "Drone routes in Pudong (Jinqiao)." },
        { player: "cainiao", tech: "road", since: 2021, status: "active", partner: "Freshippo", note: "Xiaomanlv grocery & parcel delivery." },
        { player: "whiterhino", tech: "road", since: 2021, status: "active", partner: "Yonghui" },
        { player: "keenon", tech: "instore", since: 2016, status: "active", note: "HQ; first delivery robots shipped 2016." },
        { player: "neolix", tech: "road", since: 2020, status: "active" },
      ] },
    { id: "shenzhen", name: "Shenzhen", country: "CHN", lat: 22.54, lon: 114.06,
      deployments: [
        { player: "meituan", tech: "drone", since: 2021, status: "active", note: "World's densest urban drone-delivery network: 30+ routes, 400,000+ orders." },
        { player: "meituan", tech: "road", since: 2021, status: "active" },
        { player: "pudu", tech: "instore", since: 2016, status: "active", note: "HQ." },
        { player: "neolix", tech: "road", since: 2021, status: "active" },
      ] },
    { id: "hangzhou", name: "Hangzhou", country: "CHN", lat: 30.27, lon: 120.15,
      deployments: [
        { player: "cainiao", tech: "road", since: 2020, status: "active", note: "HQ; campus fleets." },
        { player: "antwork", tech: "drone", since: 2019, status: "active", note: "First urban drone-delivery licence in China." },
      ] },
    { id: "changshu", name: "Changshu (Suzhou)", country: "CHN", lat: 31.65, lon: 120.75,
      deployments: [
        { player: "jd", tech: "road", since: 2020, status: "active", note: "'First autonomous delivery city': 30+ JD vehicles on public roads." },
      ] },
    { id: "hongkong", name: "Hong Kong", country: "HKG", lat: 22.32, lon: 114.17,
      deployments: [
        { player: "keeta", tech: "drone", since: 2025, status: "active", note: "First regular commercial drone food delivery in Hong Kong." },
      ] },

    /* ---------- Japan ---------- */
    { id: "tokyo", name: "Tokyo", country: "JPN", lat: 35.68, lon: 139.69,
      deployments: [
        { player: "mitsubishi", tech: "sidewalk", since: 2024, status: "active", partner: "Uber Eats, Cartken", note: "Nihonbashi: Japan's first commercial Level 4 sidewalk delivery." },
        { player: "cartken", tech: "sidewalk", since: 2024, status: "active", partner: "Mitsubishi Electric, Uber Eats, Rakuten" },
        { player: "uber", tech: "sidewalk", since: 2024, status: "active", partner: "Mitsubishi Electric" },
        { player: "rakuten", tech: "sidewalk", since: 2024, status: "active", partner: "Cartken, Avride", note: "Chuo and Harumi deliveries." },
        { player: "avride", tech: "sidewalk", since: 2025, status: "active", partner: "Rakuten" },
        { player: "zmp", tech: "sidewalk", since: 2020, status: "active", partner: "ENEOS", note: "DeliRo in Chuo ward." },
        { player: "panasonic", tech: "sidewalk", since: 2023, status: "pilot", note: "Takanawa Gateway City." },
      ] },
    { id: "fujisawa", name: "Fujisawa", country: "JPN", lat: 35.34, lon: 139.49,
      deployments: [
        { player: "panasonic", tech: "sidewalk", since: 2020, status: "active", partner: "Rakuten", note: "Fujisawa Sustainable Smart Town remote-monitored robots." },
        { player: "rakuten", tech: "sidewalk", since: 2021, status: "active", partner: "Panasonic" },
      ] },

    /* ---------- South Korea ---------- */
    { id: "seoul", name: "Seoul", country: "KOR", lat: 37.57, lon: 126.98,
      deployments: [
        { player: "neubility", tech: "sidewalk", since: 2021, status: "active", partner: "7-Eleven, Lotte", note: "HQ; Gangnam and Seocho convenience deliveries." },
        { player: "woowa", tech: "sidewalk", since: 2019, status: "active", note: "Dilly Drive in Teheran-ro (Gangnam)." },
        { player: "woowa", tech: "instore", since: 2021, status: "active", note: "Dilly Tower indoor robots." },
        { player: "lg", tech: "instore", since: 2020, status: "active", note: "HQ; CLOi robots." },
      ] },
    { id: "suwon", name: "Suwon (Gwanggyo)", country: "KOR", lat: 37.26, lon: 127.03,
      deployments: [
        { player: "woowa", tech: "sidewalk", since: 2020, status: "active", note: "Apartment-complex delivery with elevator access." },
      ] },

    /* ---------- Singapore ---------- */
    { id: "singapore", name: "Singapore (Punggol)", country: "SGP", lat: 1.35, lon: 103.82,
      deployments: [
        { player: "otsaw", tech: "sidewalk", since: 2021, status: "active", partner: "NTUC FairPrice, Grab" },
        { player: "grab", tech: "sidewalk", since: 2021, status: "pilot", partner: "OTSAW" },
      ] },

    /* ---------- India ---------- */
    { id: "gurugram", name: "Gurugram / Delhi NCR", country: "IND", lat: 28.46, lon: 77.03,
      deployments: [
        { player: "skyeair", tech: "drone", since: 2022, status: "active", partner: "Flipkart, Blue Dart, Zomato" },
        { player: "swiggy", tech: "drone", since: 2022, status: "pilot", partner: "Skye Air, Garuda" },
      ] },
    { id: "bengaluru", name: "Bengaluru", country: "IND", lat: 12.97, lon: 77.59,
      deployments: [
        { player: "swiggy", tech: "drone", since: 2022, status: "pilot", partner: "Garuda Aerospace", note: "Swiggy HQ; Instamart grocery drone pilots." },
        { player: "garuda", tech: "drone", since: 2022, status: "pilot", partner: "Swiggy" },
      ] },

    /* ---------- Australia ---------- */
    { id: "logan", name: "Logan (Brisbane)", country: "AUS", lat: -27.64, lon: 153.11,
      deployments: [
        { player: "wing", tech: "drone", since: 2019, status: "active", partner: "DoorDash, Coles", note: "One of the world's busiest drone-delivery suburbs." },
      ] },
    { id: "canberra", name: "Canberra", country: "AUS", lat: -35.28, lon: 149.13,
      deployments: [
        { player: "wing", tech: "drone", since: 2019, status: "active", partner: "Coles", note: "First Wing commercial service (Gungahlin)." },
        { player: "coles", tech: "drone", since: 2022, status: "active", partner: "Wing" },
      ] },
    { id: "melbourne", name: "Melbourne", country: "AUS", lat: -37.81, lon: 144.96,
      deployments: [
        { player: "coles", tech: "mfc", since: 2024, status: "active", partner: "Ocado", note: "Ocado-powered customer fulfilment centre." },
      ] },

    /* ---------- Africa ---------- */
    { id: "kigali", name: "Kigali / Muhanga", country: "RWA", lat: -1.94, lon: 30.06,
      deployments: [
        { player: "zipline", tech: "drone", since: 2016, status: "active", note: "Original network; national e-commerce and retail deliveries added 2024." },
      ] },
    { id: "accra", name: "Accra (Omenako)", country: "GHA", lat: 5.60, lon: -0.19,
      deployments: [
        { player: "zipline", tech: "drone", since: 2019, status: "active", note: "Six distribution centres; consumer deliveries piloted 2024." },
      ] },
    { id: "kaduna", name: "Kaduna", country: "NGA", lat: 10.52, lon: 7.44,
      deployments: [
        { player: "zipline", tech: "drone", since: 2022, status: "active" },
      ] },
    { id: "kisumu", name: "Kisumu", country: "KEN", lat: -0.09, lon: 34.77,
      deployments: [
        { player: "zipline", tech: "drone", since: 2022, status: "active" },
      ] },

    /* ---------- Latin America ---------- */
    { id: "medellin", name: "Medellín", country: "COL", lat: 6.25, lon: -75.56,
      deployments: [
        { player: "kiwibot", tech: "sidewalk", since: 2019, status: "active", note: "Engineering and remote-supervision hub." },
        { player: "rappi", tech: "sidewalk", since: 2020, status: "ended", until: 2021, partner: "Kiwibot" },
      ] },
    { id: "saopaulo", name: "São Paulo & Campinas", country: "BRA", lat: -23.2, lon: -46.9,
      deployments: [
        { player: "ifood", tech: "drone", since: 2020, status: "active", partner: "Speedbird Aero", note: "First ANAC-approved commercial drone food delivery (Campinas)." },
        { player: "speedbird", tech: "drone", since: 2018, status: "active", partner: "iFood" },
      ] },
  ],
};
