export interface Shade {
  id: string;
  number: string;
  name: string;
  descriptor: string;
  hex: string;
  hexDeep: string;
  hexSoft: string;
  price: number;
  volume: string;
  tagline: string;
  notes: string;
  image: string;
  handImage: string;
  handHeroImage: string;
  handSquareImage?: string;
  origin: string;
  sourcingStory: string;
  finishType: string;
  details: {
    coverage: string;
    dryingTime: string;
    formula: string;
    batch: string;
  };
  ingredients: string[];
}

// Utility to darken a hex color by a factor (e.g. 0.25 -> 25% darker)
export function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = 1 - percent;
  const r = Math.max(0, Math.min(255, Math.round(((num >> 16) & 0xff) * amt)));
  const g = Math.max(0, Math.min(255, Math.round(((num >> 8) & 0xff) * amt)));
  const b = Math.max(0, Math.min(255, Math.round((num & 0xff) * amt)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Utility to mix hex color with white (e.g. 0.8 -> 80% white, 20% color)
export function mixWithWhite(hex: string, whiteWeight: number = 0.75): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const newR = Math.round(r * (1 - whiteWeight) + 255 * whiteWeight);
  const newG = Math.round(g * (1 - whiteWeight) + 255 * whiteWeight);
  const newB = Math.round(b * (1 - whiteWeight) + 255 * whiteWeight);
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
}

// The 6 Signature Lacquers (Palette 1: Blackened Cherry & Blood Velvet)
export const SHADES: Shade[] = [
  {
    id: "cendre",
    number: "01",
    name: "Cendre",
    descriptor: "Smoked mauve nude",
    hex: "#B6928C",
    hexDeep: darkenHex("#B6928C", 0.25),
    hexSoft: mixWithWhite("#B6928C", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "Quiet ash with an ethereal mauve undertone.",
    notes: "Pale earthen clay, satin reflection",
    image: "/images/bottles/bottle-01.png",
    handImage: "/images/hands/hand-01-portrait.jpg",
    handHeroImage: "/images/hands/hero-01.jpg",
    handSquareImage: "/images/hands/hand-01-square.jpg",
    origin: "Auvergne & Loire Valley, France",
    sourcingStory:
      "Compounded from volcanic sediment in Auvergne and cold-steeped Loire orris root. A quiet, cool ash nude that flatters neutral and olive undertones.",
    finishType: "Satin-Gloss Enamel",
    details: {
      coverage: "Full coverage in two thin coats",
      dryingTime: "Touch dry in 90 seconds",
      formula: "10-Free Clean Base with Sweet Almond & Camellia Oil",
      batch: "Batch No. CD-01 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Kaolin Clay Mineral Extract",
      "Iris Florentina Root Extract",
      "Camellia Oleifera Seed Oil",
      "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
      "Stearalkonium Bentonite",
      "Citric Acid",
    ],
  },
  {
    id: "garconne",
    number: "02",
    name: "Garçonne",
    descriptor: "Dried rose crimson",
    hex: "#A2425E",
    hexDeep: darkenHex("#A2425E", 0.25),
    hexSoft: mixWithWhite("#A2425E", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "A decadent, withered botanical crimson.",
    notes: "Pressed petals, vintage Parisian edge",
    image: "/images/bottles/bottle-02.png",
    handImage: "/images/hands/hand-02-portrait.jpg",
    handHeroImage: "/images/hands/hero-02.jpg",
    handSquareImage: "/images/hands/hand-02-square.jpg",
    origin: "Grasse & Provence, France",
    sourcingStory:
      "Distilled from Grasse May Centifolia roses and Provençal madder root. Captures the depth of dried rose petals pressed in vintage books.",
    finishType: "High-Gloss Botanical Enamel",
    details: {
      coverage: "Semi-sheer in one coat, opaque in two",
      dryingTime: "Touch dry in 85 seconds",
      formula: "10-Free Clean Base with Evening Primrose & Vitamin E",
      batch: "Batch No. GC-02 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Rosa Centifolia Flower Extract",
      "Rubia Tinctorum (Madder) Root Extract",
      "Oenothera Biennis (Evening Primrose) Oil",
      "Tocopheryl Acetate (Vitamin E)",
      "Acetyl Tributyl Citrate",
      "Isopropyl Alcohol",
    ],
  },
  {
    id: "sangria",
    number: "03",
    name: "Sangria",
    descriptor: "Burnt sanguine",
    hex: "#BD2B38",
    hexDeep: darkenHex("#BD2B38", 0.25),
    hexSoft: mixWithWhite("#BD2B38", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "Vivid fermented ruby with raw warmth.",
    notes: "Spiced garnet, luminous high-gloss",
    image: "/images/bottles/bottle-03.png",
    handImage: "/images/hands/hand-03-portrait.jpg",
    handHeroImage: "/images/hands/hero-03.jpg",
    handSquareImage: "/images/hands/hand-03-square.jpg",
    origin: "Rioja & Granada, Spain",
    sourcingStory:
      "Infused with sun-dried Granada pomegranate rind and Rioja grape skin anthocyanins. A fiery, warm fermented ruby with mirror-like shine.",
    finishType: "Mirror Glass Jelly Glaze",
    details: {
      coverage: "Cushioned gel-like opacity in two coats",
      dryingTime: "Touch dry in 90 seconds",
      formula: "10-Free Clean Base with Jojoba Seed Peptides",
      batch: "Batch No. SG-03 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Punica Granatum (Pomegranate) Bark Extract",
      "Vitis Vinifera (Grape) Skin Anthocyanin",
      "Simmondsia Chinensis (Jojoba) Seed Oil",
      "Hydrolyzed Keratin Peptides",
      "Adipic Acid Copolymer",
      "Silica",
    ],
  },
  {
    id: "cerise-noire",
    number: "04",
    name: "Cerise Noire",
    descriptor: "Deep blood cherry",
    hex: "#8E0C2D",
    hexDeep: darkenHex("#8E0C2D", 0.25),
    hexSoft: mixWithWhite("#8E0C2D", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "Classic noir red compounded for high drama.",
    notes: "Glossy, chip-resistant colour. 12 ml.",
    image: "/images/bottles/bottle-04.png",
    handImage: "/images/hands/hand-04-portrait.jpg",
    handHeroImage: "/images/hands/hero-04.jpg",
    handSquareImage: "/images/hands/hand-04-square.jpg",
    origin: "Vaucluse & Burgundy, France",
    sourcingStory:
      "Formulated from Vaucluse Morello cherries and Burgundy blackcurrant tannins. An intense, theatrical blood cherry with arterial depth.",
    finishType: "Deep Blood Glass Crème",
    details: {
      coverage: "Intense pigment load, full opacity in two coats",
      dryingTime: "Touch dry in 75 seconds",
      formula: "10-Free Clean Base with Marula Oil & Plant Squalane",
      batch: "Batch No. CN-04 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Prunus Cerasus (Bitter Cherry) Fruit Extract",
      "Ribes Nigrum (Black Currant) Fruit Extract",
      "Sclerocarya Birrea (Marula) Seed Oil",
      "Plant-Derived Squalane",
      "Stearalkonium Hectorite",
      "Iron Oxides (CI 77491)",
    ],
  },
  {
    id: "poison",
    number: "05",
    name: "Poison",
    descriptor: "Vampiric oxblood",
    hex: "#6A0D23",
    hexDeep: darkenHex("#6A0D23", 0.25),
    hexSoft: mixWithWhite("#6A0D23", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "Bruised arterial crimson with velvet depth.",
    notes: "Rich lacquered leather, midnight sheen",
    image: "/images/bottles/bottle-05.png",
    handImage: "/images/hands/hand-05-portrait.jpg",
    handHeroImage: "/images/hands/hero-05.jpg",
    handSquareImage: "/images/hands/hand-05-square.jpg",
    origin: "Bordeaux & Andalusia",
    sourcingStory:
      "Derived from dark Sambucus elderberry resins and natural Andalusian hematite iron minerals. A bruised gothic oxblood with remarkable tactile presence.",
    finishType: "Lacquered Leather Sheen",
    details: {
      coverage: "Ultra-dense color payoff, opaque in two coats",
      dryingTime: "Touch dry in 80 seconds",
      formula: "10-Free Clean Base with Moroccan Argan Kernel Oil",
      batch: "Batch No. PS-05 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Sambucus Nigra (Elderberry) Fruit Resin",
      "Natural Hematite Mineral Pigment",
      "Argania Spinosa (Argan) Kernel Oil",
      "Dipropylene Glycol Dibenzoate",
      "Red 7 Lake (CI 15850)",
      "Iron Oxides (CI 77499)",
    ],
  },
  {
    id: "morticia",
    number: "06",
    name: "Morticia",
    descriptor: "Blackened midnight plum",
    hex: "#3B091F",
    hexDeep: darkenHex("#3B091F", 0.25),
    hexSoft: mixWithWhite("#3B091F", 0.75),
    price: 28,
    volume: "12 ml",
    tagline: "Near-black plum holding hidden garnet light.",
    notes: "Intense pigment saturation, ultra-gloss coat",
    image: "/images/bottles/bottle-06.png",
    handImage: "/images/hands/hand-06-portrait.jpg",
    handHeroImage: "/images/hands/hero-06.jpg",
    handSquareImage: "/images/hands/hand-06-square.jpg",
    origin: "Périgord & Damascus",
    sourcingStory:
      "Extracted from Périgord walnut husks and wild Damascus dark roses. Looks near-black in ambient shadow; catches smoldering plum garnet under direct light.",
    finishType: "Blackened Obsidian Velvet Lacquer",
    details: {
      coverage: "Full noir opacity in 1 to 2 coats",
      dryingTime: "Touch dry in 70 seconds",
      formula: "10-Free Clean Base with Black Tourmaline & Baobab Oil",
      batch: "Batch No. MT-06 / Grasse, France",
    },
    ingredients: [
      "Butyl Acetate",
      "Ethyl Acetate",
      "Nitrocellulose",
      "Juglans Regia (Walnut) Shell Extract",
      "Rosa Damascena Flower Extract",
      "Black Tourmaline Micro-Mineral",
      "Adansonia Digitata (Baobab) Seed Oil",
      "Ferric Ammonium Ferrocyanide (CI 77510)",
      "Iron Oxides (CI 77499)",
    ],
  },
];

export const DEFAULT_SHADE = SHADES[5]; // 06 Morticia on load

export function getShadeById(id: string): Shade | undefined {
  return SHADES.find((s) => s.id.toLowerCase() === id.toLowerCase());
}


