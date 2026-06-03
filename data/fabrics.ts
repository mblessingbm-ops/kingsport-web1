// Fabric glossary — educational reference for customers browsing the catalogue.
// Each entry describes a distinct fabric / material we manufacture with, the
// industry-standard specs, and the kinds of products it shows up in.
//
// Surfaced on /fabric-glossary and via the Fabric Glossary dropdown in the
// top navigation.

export interface FabricCare {
  label: string
}

export type FabricGroup =
  | 'Workwear & PPE'
  | 'Corporate Apparel'
  | 'Promotional & Gifts'
  | 'Event & Signage'
  | 'Sports'
  | 'Schoolwear'

export interface FabricEntry {
  /** URL slug — used as anchor (`/fabric-glossary#<slug>`) and dropdown key. */
  slug: string
  name: string
  group: FabricGroup
  weight: string         // '—' when not applicable (non-textile)
  composition: string
  weave: string          // 'N/A' for non-textile
  finish: string
  care: FabricCare[]
  /** Customer-facing positioning — what kind of work / environments it fits. */
  suitedFor: string
  /** Concrete examples of products woven from this fabric. */
  usedIn: string[]
}

export const fabricGroups: FabricGroup[] = [
  'Workwear & PPE',
  'Corporate Apparel',
  'Promotional & Gifts',
  'Event & Signage',
  'Sports',
  'Schoolwear',
]

export const fabrics: FabricEntry[] = [
  // ─── Workwear & PPE ─────────────────────────────────────────────────────
  {
    slug: 'poly-cotton-drill',
    name: '65/35 Poly-Cotton Drill',
    group: 'Workwear & PPE',
    weight: '300g/m²',
    composition: '65% Polyester, 35% Cotton',
    weave: 'Plain Weave Drill',
    finish: 'Pre-shrunk, enzyme-washed',
    care: [
      { label: 'Machine wash 60°C' },
      { label: 'Do not bleach' },
      { label: 'Tumble dry low' },
      { label: 'Iron medium heat' },
    ],
    suitedFor: 'Heavy industrial and manufacturing environments requiring durability and abrasion resistance.',
    usedIn: ['Heavy Duty Conti Suit', 'Acid Resistant Conti Suit'],
  },
  {
    slug: 'poly-cotton-poplin',
    name: '65/35 Poly-Cotton Poplin',
    group: 'Workwear & PPE',
    weight: '120g/m²',
    composition: '65% Polyester, 35% Cotton',
    weave: 'Plain Weave',
    finish: 'Pre-shrunk',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Do not bleach' },
      { label: 'Iron low heat' },
    ],
    suitedFor: 'Light industrial, laboratory, and food service environments.',
    usedIn: ['Industrial Dustcoat'],
  },
  {
    slug: 'full-grain-leather',
    name: 'Full-Grain Leather Upper',
    group: 'Workwear & PPE',
    weight: '—',
    composition: '100% Full-Grain Cowhide Leather, Rubber Sole',
    weave: 'N/A',
    finish: 'Oil-tanned, steel toe cap',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Condition leather regularly' },
      { label: 'Do not machine wash' },
    ],
    suitedFor: 'Construction sites, warehouses, and heavy industrial environments requiring foot protection.',
    usedIn: ['S5 Safety Boots', 'Rider Boots'],
  },
  {
    slug: 'split-leather',
    name: 'Split Leather Upper',
    group: 'Workwear & PPE',
    weight: '—',
    composition: '100% Split Leather, PU Sole',
    weave: 'N/A',
    finish: 'Anti-slip sole, steel toe cap',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Do not machine wash' },
    ],
    suitedFor: 'Light industrial and warehouse environments requiring comfort and protection.',
    usedIn: ['Safety Shoes (Low Cut)'],
  },
  {
    slug: 'polyester-mesh',
    name: '100% Polyester Mesh',
    group: 'Workwear & PPE',
    weight: '120g/m²',
    composition: '100% Polyester',
    weave: 'Open Mesh Knit',
    finish: 'EN ISO 20471 reflective tape bonded',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Do not iron reflective tape' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Road construction, traffic control, and any environment requiring high visibility.',
    usedIn: ['Reflective Vest (High-Vis)'],
  },
  {
    slug: 'hdpe-shell',
    name: 'High-Density Polyethylene (HDPE)',
    group: 'Workwear & PPE',
    weight: '—',
    composition: '100% HDPE Shell, Nylon Suspension',
    weave: 'N/A',
    finish: 'UV-stabilised, impact-resistant',
    care: [
      { label: 'Wipe clean with mild soap' },
      { label: 'Do not use solvents' },
      { label: 'Replace after impact' },
    ],
    suitedFor: 'Construction, mining, and any overhead hazard environment.',
    usedIn: ['Industrial Hard Hat'],
  },
  {
    slug: 'natural-rubber',
    name: 'Natural Rubber',
    group: 'Workwear & PPE',
    weight: '—',
    composition: '100% Vulcanised Natural Rubber',
    weave: 'N/A',
    finish: 'Steel toe cap, anti-slip sole',
    care: [
      { label: 'Rinse with water after use' },
      { label: 'Store away from direct sunlight' },
    ],
    suitedFor: 'Agriculture, mining, construction, and wet or chemical environments.',
    usedIn: ['Heavy Duty Gumboots'],
  },
  {
    slug: 'latex-cotton-gloves',
    name: 'Natural Latex with Cotton Liner',
    group: 'Workwear & PPE',
    weight: '—',
    composition: 'Latex outer, 100% Cotton inner liner',
    weave: 'N/A',
    finish: 'Textured grip palm, rolled cuff',
    care: [
      { label: 'Rinse inside and out after use' },
      { label: 'Air dry away from heat' },
    ],
    suitedFor: 'Chemical handling, wet work, and general industrial hand protection.',
    usedIn: ['Latex Safety Gloves', 'Heavy Duty Work Gloves'],
  },
  {
    slug: 'synthetic-leather-nylon-gloves',
    name: 'Synthetic Leather + Nylon Mesh',
    group: 'Workwear & PPE',
    weight: '—',
    composition: '60% Synthetic Leather, 40% Nylon Mesh',
    weave: 'N/A',
    finish: 'Padded knuckle protection, Velcro wrist closure',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Do not machine wash' },
    ],
    suitedFor: 'Motorcycle delivery riders requiring grip and knuckle protection.',
    usedIn: ['Motorcycle Gloves'],
  },
  {
    slug: 'oxford-polyester-600d',
    name: '600D Oxford Polyester',
    group: 'Workwear & PPE',
    weight: '260g/m²',
    composition: '100% Polyester',
    weave: 'Oxford Weave',
    finish: 'Water-resistant coating, reflective piping',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Do not tumble dry' },
      { label: 'Do not iron reflective elements' },
    ],
    suitedFor: 'Motorcycle and bicycle delivery riders, outdoor crews, and wet-season field staff.',
    usedIn: ['Delivery Rider Suit', 'Rainsuit (Jacket + Pants)', 'Event Gazebo', 'Drawstring Bag', 'Sports Bag', 'Cooler Bag'],
  },
  {
    slug: 'abs-polycarbonate-shell',
    name: 'ABS / Polycarbonate Shell',
    group: 'Workwear & PPE',
    weight: '—',
    composition: 'ABS outer shell, EPS inner liner, nylon strap',
    weave: 'N/A',
    finish: 'DOT-rated impact resistance',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Do not use abrasive cleaners' },
      { label: 'Replace after impact' },
    ],
    suitedFor: 'Motorcycle delivery and industrial environments requiring head protection.',
    usedIn: ['Delivery Helmet', 'Safety Goggles', 'Kidney Belt'],
  },

  // ─── Corporate Apparel ──────────────────────────────────────────────────
  {
    slug: 'cotton-pique',
    name: '100% Cotton Pique',
    group: 'Corporate Apparel',
    weight: '180g/m²',
    composition: '100% Combed Cotton',
    weave: 'Pique Knit',
    finish: 'Pre-shrunk, mercerised',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Tumble dry low' },
      { label: 'Iron medium heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Everyday corporate and client-facing environments.',
    usedIn: ['Executive Pique Polo', 'Knitted Stripe Polo', 'Corporate Uniform Pack'],
  },
  {
    slug: 'cotton-oxford',
    name: '100% Cotton Oxford',
    group: 'Corporate Apparel',
    weight: '130g/m²',
    composition: '100% Cotton',
    weave: 'Oxford Weave',
    finish: 'Easy-iron, pre-shrunk',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Iron medium heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Formal corporate and executive office environments.',
    usedIn: ['Oxford Long Sleeve Shirt', 'Short-Sleeve Corporate Shirt'],
  },
  {
    slug: 'polyester-satin-blouse',
    name: 'Polyester Satin Weave',
    group: 'Corporate Apparel',
    weight: '110g/m²',
    composition: '100% Polyester',
    weave: 'Satin Weave',
    finish: 'Wrinkle-resistant',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Iron low heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Corporate office and client-facing roles requiring a professional finish.',
    usedIn: ['Ladies Blouse', 'Ladies 3/4 Sleeve Blouse'],
  },
  {
    slug: 'softshell-3-layer',
    name: '3-Layer Softshell',
    group: 'Corporate Apparel',
    weight: '320g/m²',
    composition: '94% Polyester, 6% Spandex',
    weave: 'Bonded fleece inner',
    finish: 'DWR water-resistant coating, stretch outer shell',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Do not tumble dry' },
      { label: 'Do not iron' },
      { label: 'Do not dry clean' },
    ],
    suitedFor: 'Outdoor corporate environments, site supervisors, and cold-climate office wear.',
    usedIn: ['Softshell Jacket', 'Softshell School Jacket'],
  },
  {
    slug: 'cotton-elastane-chino',
    name: 'Cotton-Elastane Chino',
    group: 'Corporate Apparel',
    weight: '240g/m²',
    composition: '98% Cotton, 2% Elastane',
    weave: 'Twill Weave',
    finish: 'Pre-shrunk, wrinkle-resistant',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Iron medium heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Smart-casual and corporate office environments requiring comfort and durability.',
    usedIn: ['Chino Trousers'],
  },
  {
    slug: 'poly-viscose-suiting',
    name: 'Poly-Viscose Suiting',
    group: 'Corporate Apparel',
    weight: '280g/m²',
    composition: '70% Polyester, 30% Viscose',
    weave: 'Plain Weave',
    finish: 'Half-lined, crease-resistant',
    care: [
      { label: 'Dry clean recommended' },
      { label: 'Iron low heat with pressing cloth' },
      { label: 'Steam to remove creases' },
    ],
    suitedFor: 'Executive and boardroom environments requiring a sharp, professional appearance.',
    usedIn: ['Corporate Blazer'],
  },
  {
    slug: 'poly-viscose-blend',
    name: 'Poly-Viscose Blend',
    group: 'Corporate Apparel',
    weight: '250g/m²',
    composition: '65% Polyester, 35% Viscose',
    weave: 'Plain Weave',
    finish: 'Stretch lining, crease-resistant',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Iron low heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Corporate office and client-facing professional environments.',
    usedIn: ['Formal Pencil Skirt'],
  },
  {
    slug: 'cotton-denim',
    name: '100% Cotton Denim',
    group: 'Corporate Apparel',
    weight: '280g/m²',
    composition: '100% Cotton',
    weave: 'Twill Weave (Denim)',
    finish: 'Pre-washed, enzyme-treated',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Tumble dry low' },
      { label: 'Iron medium heat' },
    ],
    suitedFor: 'Smart-casual, retail, and hospitality corporate environments.',
    usedIn: ['Denim Shirt'],
  },
  {
    slug: 'heavy-duty-denim',
    name: 'Heavy-Duty Cotton Denim',
    group: 'Corporate Apparel',
    weight: '380g/m²',
    composition: '100% Cotton',
    weave: '3x1 Twill Denim',
    finish: 'Reinforced stress points, triple-stitched seams',
    care: [
      { label: 'Machine wash 60°C' },
      { label: 'Tumble dry medium' },
      { label: 'Iron medium heat' },
    ],
    suitedFor: 'Industrial, maintenance, and trade environments requiring maximum durability.',
    usedIn: ['Industrial Jeans'],
  },

  // ─── Promotional & Gifts ────────────────────────────────────────────────
  {
    slug: 'combed-cotton-jersey-180g',
    name: '100% Combed Cotton Jersey (180g)',
    group: 'Promotional & Gifts',
    weight: '180g/m²',
    composition: '100% Ring-Spun Combed Cotton',
    weave: 'Single Jersey Knit',
    finish: 'Pre-shrunk, side-seamed',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Tumble dry low' },
      { label: 'Iron low heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Events, promotions, staff gifting, and branded merchandise.',
    usedIn: ['Cotton T-Shirt', 'Honeycomb Performance Tee'],
  },
  {
    slug: 'brushed-cotton-twill',
    name: 'Brushed Cotton Twill',
    group: 'Promotional & Gifts',
    weight: '260g/m²',
    composition: '100% Brushed Cotton',
    weave: 'Twill Weave',
    finish: 'Structured front panel, adjustable closure',
    care: [
      { label: 'Spot clean only' },
      { label: 'Do not machine wash' },
      { label: 'Air dry' },
    ],
    suitedFor: 'Branded promotions, events, sports teams, and corporate gifting.',
    usedIn: ['Snapback Cap', 'Baseball Cap (6-Panel)', 'Trucker Cap', 'Floppy Hat', 'Reversible Bucket Hat'],
  },
  {
    slug: 'acrylic-rib-knit',
    name: '100% Acrylic Rib Knit',
    group: 'Promotional & Gifts',
    weight: '—',
    composition: '100% Acrylic',
    weave: 'Rib Knit',
    finish: 'Double-layer cuff',
    care: [
      { label: 'Hand wash cold' },
      { label: 'Do not tumble dry' },
      { label: 'Lay flat to dry' },
    ],
    suitedFor: 'Cold-weather promotions, school jerseys, events, and branded gifting.',
    usedIn: ['Knitted Beanie', 'Sleeveless Knitted School Jersey', 'Full Knitted School Jersey'],
  },
  {
    slug: 'polyester-600d',
    name: '600D Polyester',
    group: 'Promotional & Gifts',
    weight: '—',
    composition: '100% Polyester, 600 Denier',
    weave: 'Oxford Weave',
    finish: 'Water-resistant coating, reinforced straps',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Do not machine wash' },
      { label: 'Air dry' },
    ],
    suitedFor: 'Promotional giveaways, sports teams, and corporate gifting.',
    usedIn: ['Drawstring Bag', 'Team Sports Bag', 'Insulated Cooler Bag', 'School Backpack'],
  },
  {
    slug: 'polyester-pongee-190t',
    name: '190T Polyester Pongee',
    group: 'Promotional & Gifts',
    weight: '—',
    composition: '100% Polyester, 190 Thread Count',
    weave: 'Pongee Weave',
    finish: 'UV-resistant coating, water-repellent',
    care: [
      { label: 'Wipe canopy clean with damp cloth' },
      { label: 'Open and air dry after use' },
    ],
    suitedFor: 'Corporate branded umbrellas for events, promotions, and executive gifting.',
    usedIn: ['Executive Umbrella', 'Ordinary Umbrella'],
  },
  {
    slug: 'polyester-satin-lanyard',
    name: 'Polyester Satin (Lanyards)',
    group: 'Promotional & Gifts',
    weight: '—',
    composition: '100% Polyester',
    weave: 'Satin Weave',
    finish: 'Safety breakaway clip, metal lobster claw',
    care: [
      { label: 'Hand wash cold' },
      { label: 'Air dry' },
    ],
    suitedFor: 'Events, conferences, exhibitions, and corporate ID lanyards.',
    usedIn: ['Branded Lanyard'],
  },

  // ─── Event & Signage ────────────────────────────────────────────────────
  {
    slug: 'knitted-polyester-satin-flag',
    name: 'Knitted Polyester Satin',
    group: 'Event & Signage',
    weight: '115g/m²',
    composition: '100% Polyester',
    weave: 'Knitted Satin',
    finish: 'Sublimation-ready, wind-resistant weave',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Do not tumble dry' },
      { label: 'Iron low heat' },
    ],
    suitedFor: 'Outdoor and indoor branded flags, events, and point-of-sale displays.',
    usedIn: ['Sharkfin Flag', 'Teardrop Flag', 'Telescopic Flag'],
  },
  {
    slug: 'pvc-coated-polyester-banner',
    name: 'PVC Coated Polyester',
    group: 'Event & Signage',
    weight: '510g/m²',
    composition: 'PVC-coated woven polyester base',
    weave: 'Scrim Weave',
    finish: 'Full-colour digital print, matte laminate finish',
    care: [
      { label: 'Wipe clean with damp cloth' },
      { label: 'Roll loosely for storage — do not fold' },
    ],
    suitedFor: 'Indoor exhibitions, retail environments, and event backdrop displays.',
    usedIn: ['Pull-Up Banner', 'Exhibition Backdrop Wall'],
  },
  {
    slug: 'frontlit-pvc-440g',
    name: '440g Frontlit PVC',
    group: 'Event & Signage',
    weight: '440g/m²',
    composition: 'PVC with polyester scrim reinforcement',
    weave: 'Scrim reinforced',
    finish: 'Rope and eyelets, weather-resistant, full-colour print',
    care: [
      { label: 'Wipe clean with mild detergent' },
      { label: 'Store rolled in a dry location' },
    ],
    suitedFor: 'Outdoor advertising, building wraps, and event perimeter signage.',
    usedIn: ['PVC Banner (Rope & Eyelets)'],
  },
  {
    slug: 'aluminium-composite-flex',
    name: 'Aluminium Composite Panel / Flex Face',
    group: 'Event & Signage',
    weight: '—',
    composition: 'Aluminium composite structure with printed flex face',
    weave: 'N/A',
    finish: 'Weather-resistant, UV-stable inks',
    care: [
      { label: 'Clean with mild detergent and soft cloth' },
      { label: 'Inspect fixings periodically' },
    ],
    suitedFor: 'Permanent and semi-permanent outdoor advertising installations.',
    usedIn: ['Billboard Construction'],
  },

  // ─── Sports ─────────────────────────────────────────────────────────────
  {
    slug: 'polyester-spandex-interlock',
    name: 'Polyester-Spandex Performance Knit',
    group: 'Sports',
    weight: '280g/m²',
    composition: '88% Polyester, 12% Spandex',
    weave: 'Interlock Knit',
    finish: 'Moisture-wicking, anti-pill, four-way stretch',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Do not tumble dry' },
      { label: 'Do not iron' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Athletic training, team sports, and corporate wellness programmes.',
    usedIn: ['Full Sports Tracksuit'],
  },
  {
    slug: 'moisture-wicking-polyester-150g',
    name: '100% Moisture-Wicking Polyester (150g)',
    group: 'Sports',
    weight: '150g/m²',
    composition: '100% Polyester',
    weave: 'Micro-mesh Knit',
    finish: 'Sublimation-ready, quick-dry, UV-resistant',
    care: [
      { label: 'Machine wash 30°C' },
      { label: 'Do not tumble dry' },
      { label: 'Do not iron print areas' },
    ],
    suitedFor: 'Competitive and recreational team sports kits.',
    usedIn: ['Soccer Kit', 'Netball Kit', 'Volleyball Kit'],
  },

  // ─── Schoolwear ─────────────────────────────────────────────────────────
  {
    slug: 'poly-cotton-twill-school',
    name: '65/35 Poly-Cotton Twill',
    group: 'Schoolwear',
    weight: '240g/m²',
    composition: '65% Polyester, 35% Cotton',
    weave: 'Twill Weave',
    finish: 'Pre-shrunk, colour-fast, easy-iron',
    care: [
      { label: 'Machine wash 60°C' },
      { label: 'Tumble dry low' },
      { label: 'Iron medium heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'Primary and secondary school daily wear requiring durability and easy care.',
    usedIn: ['School Uniform Set'],
  },
  {
    slug: 'cotton-jersey-160g-kids',
    name: '100% Cotton Jersey (160g · Kids)',
    group: 'Schoolwear',
    weight: '160g/m²',
    composition: '100% Ring-Spun Cotton',
    weave: 'Single Jersey Knit',
    finish: 'Pre-shrunk, soft-hand finish, tagless',
    care: [
      { label: 'Machine wash 40°C' },
      { label: 'Tumble dry low' },
      { label: 'Iron low heat' },
      { label: 'Do not bleach' },
    ],
    suitedFor: 'School events, sports days, and general school branded apparel.',
    usedIn: ['Kids Cotton T-Shirt'],
  },
]

export const getFabricBySlug = (slug: string): FabricEntry | undefined =>
  fabrics.find((f) => f.slug === slug)

export const getFabricsByGroup = (group: FabricGroup): FabricEntry[] =>
  fabrics.filter((f) => f.group === group)
