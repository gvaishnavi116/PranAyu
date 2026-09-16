export interface Herb {
  id: string;
  name: string;
  botanicalName: string;
  sanskritName: string;
  commonNames: string[];
  category: 'Adaptogen' | 'Immunity' | 'Skin & Hair' | 'Digestion' | 'Cognition' | 'Respiratory';
  rasa: string[]; // Tastes: Sweet (Madhura), Sour (Amla), Salty (Lavana), Pungent (Katu), Bitter (Tikta), Astringent (Kashaya)
  guna: string[]; // Qualities: Light (Laghu), Heavy (Guru), Dry (Ruksha), Unctuous (Snigdha), Sharp (Tikshna)
  veerya: 'Ushna (Heating)' | 'Sheeta (Cooling)'; // Potency
  vipaka: 'Madhura (Sweet)' | 'Amla (Sour)' | 'Katu (Pungent)'; // Post-digestive effect
  doshaKarma: string; // e.g., "Balances Vata & Kapha, may increase Pitta if used in excess"
  primaryDosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';
  harvestingSeason: string;
  naturalHabitat: string;
  therapeuticUses: string[];
  safetyPrecautions: string[];
  recommendedForm: string;
  summary: string;
  colorScheme: {
    bgGradient: string;
    badgeBg: string;
    badgeText: string;
    primaryColor: string;
  };
}

export const AYURVEDIC_HERBS: Herb[] = [
  {
    id: 'neem',
    name: 'Neem',
    botanicalName: 'Azadirachta indica',
    sanskritName: 'Nimba / Arishtha',
    commonNames: ['Indian Lilac', 'Margosa'],
    category: 'Skin & Hair',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    veerya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    doshaKarma: 'Pacifies Pitta & Kapha, increases Vata in excess.',
    primaryDosha: 'Pitta',
    harvestingSeason: 'Spring to Early Summer (March – June)',
    naturalHabitat: 'Tropical and semi-arid regions of India and Southeast Asia.',
    therapeuticUses: [
      'Purifies blood and clears stubborn acne & skin inflammation',
      'Antimicrobial & antifungal barrier against scalp dandruff',
      'Supports healthy oral hygiene and gum health',
      'Regulates natural blood sugar metabolism'
    ],
    safetyPrecautions: [
      'Avoid high internal doses during pregnancy and lactation',
      'May lower blood glucose; monitor if taking anti-diabetic medication',
      'Not recommended for infants or very small children internally'
    ],
    recommendedForm: 'Fresh leaf paste, seed oil, or lukewarm decoction (Kwatha)',
    summary: 'Known as the "Universal Pharmacy of India", Neem is celebrated for its unmatched blood-purifying, anti-inflammatory, and skin-soothing properties.',
    colorScheme: {
      bgGradient: 'from-emerald-900/30 via-teal-950/20 to-stone-900/30',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      primaryColor: '#10b981'
    }
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    sanskritName: 'Ashwagandha / Varahakarni',
    commonNames: ['Indian Ginseng', 'Winter Cherry'],
    category: 'Adaptogen',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
    guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
    veerya: 'Ushna (Heating)',
    vipaka: 'Madhura (Sweet)',
    doshaKarma: 'Pacifies Vata & Kapha, mildly increases Pitta if overheated.',
    primaryDosha: 'Vata',
    harvestingSeason: 'Autumn to Winter (January – March)',
    naturalHabitat: 'Dry sub-tropical regions, sandy soils across Rajasthan & Madhya Pradesh.',
    therapeuticUses: [
      'Calms cortisol levels, relieving chronic stress and anxiety',
      'Promotes deep restorative sleep and combats insomnia',
      'Enhances physical stamina, muscle tone, and vital energy (Ojas)',
      'Supports male and female reproductive vitality'
    ],
    safetyPrecautions: [
      'Use caution if you have hyperthyroidism or acute high fever',
      'Avoid heavy doses during early pregnancy unless guided by a Vaidya',
      'May potentiate sedative and thyroid medications'
    ],
    recommendedForm: 'Churna (root powder) taken with warm milk, ghee, or honey at night',
    summary: 'The flagship adaptogen of Ayurveda, Ashwagandha imparts the vitality and strength of a horse while soothing an overactive mind.',
    colorScheme: {
      bgGradient: 'from-amber-950/30 via-orange-950/20 to-stone-900/30',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/80',
      badgeText: 'text-amber-800 dark:text-amber-300',
      primaryColor: '#f59e0b'
    }
  },
  {
    id: 'tulsi',
    name: 'Tulsi',
    botanicalName: 'Ocimum sanctum',
    sanskritName: 'Tulasi / Surasa',
    commonNames: ['Holy Basil', 'Sacred Basil'],
    category: 'Immunity',
    rasa: ['Katu (Pungent)', 'Tikta (Bitter)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Tikshna (Sharp)'],
    veerya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    doshaKarma: 'Pacifies Kapha & Vata, slightly increases Pitta.',
    primaryDosha: 'Kapha',
    harvestingSeason: 'Year-round, peak aroma pre-flowering in Autumn',
    naturalHabitat: 'Grown abundantly in home courtyards and sacred gardens across India.',
    therapeuticUses: [
      'Clears bronchial congestion, cough, and seasonal flu symptoms',
      'Boosts cellular immunity and lung capacity',
      'Adapts the body to mental stress and environmental toxins',
      'Relieves digestive sluggishness and gas'
    ],
    safetyPrecautions: [
      'May possess mild blood-thinning properties; stop prior to surgery',
      'Caution for individuals with bleeding disorders',
      'Avoid chewing raw leaves daily to protect tooth enamel (prefer tea)'
    ],
    recommendedForm: 'Infused herbal tea (Phanta), fresh leaf juice with honey, or steam inhalation',
    summary: 'Revered as the "Queen of Herbs", Tulsi is an incomparable immunomodulator and spiritual cleanser for heart and lungs.',
    colorScheme: {
      bgGradient: 'from-green-950/30 via-emerald-950/20 to-stone-900/30',
      badgeBg: 'bg-green-100 dark:bg-green-950/80',
      badgeText: 'text-green-800 dark:text-green-300',
      primaryColor: '#22c55e'
    }
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    botanicalName: 'Bacopa monnieri',
    sanskritName: 'Brahmi / Saraswati',
    commonNames: ['Water Hyssop', 'Herb of Grace'],
    category: 'Cognition',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
    guna: ['Laghu (Light)', 'Unctuous (Snigdha)'],
    veerya: 'Sheeta (Cooling)',
    vipaka: 'Madhura (Sweet)',
    doshaKarma: 'Tridosha Hara (Balances Vata, Pitta, and Kapha equally).',
    primaryDosha: 'Tridoshic',
    harvestingSeason: 'Monsoon to Post-Monsoon (August – November)',
    naturalHabitat: 'Wetlands, marshy riverbanks, and muddy shores throughout tropical Asia.',
    therapeuticUses: [
      'Enhances memory retention, focus, and cognitive processing speed',
      'Soothes nervous exhaustion and mental fatigue',
      'Cools excess Pitta in the brain, mitigating anger and irritability',
      'Promotes healthy hair growth and calms scalp heat'
    ],
    safetyPrecautions: [
      'May cause mild nausea on an empty stomach in sensitive individuals',
      'May slow heart rate in patients with severe bradycardia',
      'Take with warm ghee or food to enhance absorption'
    ],
    recommendedForm: 'Medicated Ghee (Brahmi Ghrita), fresh leaf juice, or leaf powder',
    summary: 'Named after Lord Brahma (creator of universe), Brahmi is the premier Medhya Rasayana (brain tonic) for wisdom, memory, and tranquility.',
    colorScheme: {
      bgGradient: 'from-sky-950/30 via-teal-950/20 to-stone-900/30',
      badgeBg: 'bg-sky-100 dark:bg-sky-950/80',
      badgeText: 'text-sky-800 dark:text-sky-300',
      primaryColor: '#0284c7'
    }
  },
  {
    id: 'shatavari',
    name: 'Shatavari',
    botanicalName: 'Asparagus racemosus',
    sanskritName: 'Shatavari / Bahuputra',
    commonNames: ['Wild Asparagus', '100 Husbands Herb'],
    category: 'Adaptogen',
    rasa: ['Madhura (Sweet)', 'Tikta (Bitter)'],
    guna: ['Guru (Heavy)', 'Snigdha (Unctuous)'],
    veerya: 'Sheeta (Cooling)',
    vipaka: 'Madhura (Sweet)',
    doshaKarma: 'Pacifies Pitta & Vata, may increase Kapha if taken in high excess.',
    primaryDosha: 'Pitta',
    harvestingSeason: 'Late Autumn to Winter (November – February)',
    naturalHabitat: 'Gravelly, rocky soils in low jungles and scrub forests of tropical India.',
    therapeuticUses: [
      'Nourishes female hormonal harmony, cycle regularity, and lactation',
      'Cools acid reflux, stomach ulcers, and digestive lining heat',
      'Rejuvenates reproductive tissues (Shukra Dhatu) for both men and women',
      'Soothes menopausal hot flashes and emotional swings'
    ],
    safetyPrecautions: [
      'Avoid if experiencing severe Kapha stagnation or heavy sinus mucus',
      'Exercise caution if allergic to asparagus family plants',
      'Monitor if on estrogen-sensitive medication'
    ],
    recommendedForm: 'Root powder warm milk decoction, or Shatavari Gulam/Kalpa',
    summary: 'Translating to "She who possesses 100 husbands", Shatavari is the supreme cooling Rasayana for female vitality and digestive hydration.',
    colorScheme: {
      bgGradient: 'from-rose-950/30 via-pink-950/20 to-stone-900/30',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/80',
      badgeText: 'text-rose-800 dark:text-rose-300',
      primaryColor: '#f43f5e'
    }
  },
  {
    id: 'amla',
    name: 'Amla',
    botanicalName: 'Phyllanthus emblica',
    sanskritName: 'Amalaki / Dhatri',
    commonNames: ['Indian Gooseberry'],
    category: 'Immunity',
    rasa: ['Amla (Sour)', 'Kashaya (Astringent)', 'Madhura (Sweet)', 'Tikta (Bitter)', 'Katu (Pungent)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    veerya: 'Sheeta (Cooling)',
    vipaka: 'Madhura (Sweet)',
    doshaKarma: 'Tridoshic (Supreme Pitta pacifier; balances Vata & Kapha).',
    primaryDosha: 'Tridoshic',
    harvestingSeason: 'Late Autumn to Winter (October – February)',
    naturalHabitat: 'Deciduous forests and cultivated orchards throughout India.',
    therapeuticUses: [
      'Ultra-dense source of natural Vitamin C and bioflavonoids',
      'Strengthens hair roots, prevents premature graying, and enhances shine',
      'Gentle intestinal cleanser and natural antioxidant',
      'Supports eye health (Chakshushya) and liver detoxification'
    ],
    safetyPrecautions: [
      'Excessive raw sour fruit can cause tooth sensitivity',
      'Caution if suffering from acute diarrhea or extremely dry constipation',
      'Usually safe for long-term daily consumption'
    ],
    recommendedForm: 'Fresh fruit juice, Chyawanprash, Triphala powder, or dried candy',
    summary: 'Known as "Dhatri" (The Divine Nurse), Amla contains 5 of the 6 tastes and is Ayurveda\'s premier anti-aging longevity tonic.',
    colorScheme: {
      bgGradient: 'from-lime-950/30 via-emerald-950/20 to-stone-900/30',
      badgeBg: 'bg-lime-100 dark:bg-lime-950/80',
      badgeText: 'text-lime-800 dark:text-lime-300',
      primaryColor: '#84cc16'
    }
  },
  {
    id: 'turmeric',
    name: 'Haridra (Turmeric)',
    botanicalName: 'Curcuma longa',
    sanskritName: 'Haridra / Kanchani',
    commonNames: ['Yellow Root', 'Golden Goddess'],
    category: 'Digestion',
    rasa: ['Tikta (Bitter)', 'Katu (Pungent)'],
    guna: ['Ruksha (Dry)', 'Laghu (Light)'],
    veerya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    doshaKarma: 'Balances Kapha & Vata, neutral to Pitta in moderate dose.',
    primaryDosha: 'Kapha',
    harvestingSeason: 'Winter to Early Spring (January – March)',
    naturalHabitat: 'Warm, humid tropical climates with well-drained loamy soil.',
    therapeuticUses: [
      'Potent anti-inflammatory for joint stiffness and muscle soreness',
      'Enhances complexion, heals wounds, and clears skin blemishes',
      'Supports liver bile secretion and fat digestion',
      'Natural antiseptic and antimicrobial agent'
    ],
    safetyPrecautions: [
      'High doses may aggravate gastric heat or ulcers',
      'Discontinue high supplementation 2 weeks prior to surgery',
      'Best combined with black pepper (Pippali) and healthy fats for bio-availability'
    ],
    recommendedForm: 'Golden Milk (Haldi Doodh) with pinch of black pepper, or fresh rhizome paste',
    summary: 'The Golden Treasure of Indian kitchens, Haridra purifies blood, boosts immunity, and protects cellular integrity.',
    colorScheme: {
      bgGradient: 'from-yellow-950/30 via-amber-950/20 to-stone-900/30',
      badgeBg: 'bg-yellow-100 dark:bg-yellow-950/80',
      badgeText: 'text-yellow-800 dark:text-yellow-300',
      primaryColor: '#eab308'
    }
  },
  {
    id: 'giloy',
    name: 'Giloy (Guduchi)',
    botanicalName: 'Tinospora cordifolia',
    sanskritName: 'Guduchi / Amrita',
    commonNames: ['Heart-leaved Moonseed', 'Nectar of Immortality'],
    category: 'Immunity',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
    guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
    veerya: 'Ushna (Heating)',
    vipaka: 'Madhura (Sweet)',
    doshaKarma: 'Tridosha Shamak (Balances all three doshas harmoniously).',
    primaryDosha: 'Tridoshic',
    harvestingSeason: 'Summer to Post-Monsoon (May – October)',
    naturalHabitat: 'Twining climber found growing wild on Neem and Mango trees across tropical India.',
    therapeuticUses: [
      'Destroys persistent low-grade fever and chronic metabolic toxins (Ama)',
      'Rejuvenates white blood cells and platelet count',
      'Helps manage gout, high uric acid, and rheumatoid inflammation',
      'Supports healthy liver enzymes and spleen function'
    ],
    safetyPrecautions: [
      'May lower blood sugar; diabetics should monitor glucose carefully',
      'Safe for extended use under guidance, but avoid overdosage during pregnancy'
    ],
    recommendedForm: 'Stem juice (Swarasa), Giloy Satva extract, or stem decoction',
    summary: 'Named "Amrita" (Nectar of Immortality), Giloy is Ayurveda\'s top immunomodulator, famously climbing Neem trees to absorb extra therapeutic potency.',
    colorScheme: {
      bgGradient: 'from-teal-950/30 via-emerald-950/20 to-stone-900/30',
      badgeBg: 'bg-teal-100 dark:bg-teal-950/80',
      badgeText: 'text-teal-800 dark:text-teal-300',
      primaryColor: '#14b8a6'
    }
  }
];
