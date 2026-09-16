export interface HabitItem {
  id: string;
  title: string;
  sanskritName: string;
  category: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  timeSlot: string;
  description: string;
  benefits: string[];
  howToPerform: string;
  iconName: string;
}

export interface SeasonInfo {
  id: 'summer' | 'monsoon' | 'autumn' | 'winter' | 'spring';
  name: string;
  sanskritName: string;
  months: string;
  dominantDosha: 'Pitta' | 'Vata' | 'Kapha';
  doshaEffect: string;
  primaryFocus: string;
  recommendedFoods: string[];
  foodsToAvoid: string[];
  lifestyleTips: string[];
  herbalTea: string;
  color: string;
}

export const DINACHARYA_HABITS: HabitItem[] = [
  {
    id: 'ushapan',
    title: 'Ushapan (Warm Water Intake)',
    sanskritName: 'Ushapan',
    category: 'Morning',
    timeSlot: '06:00 AM - 06:15 AM',
    description: 'Drinking 1 to 2 glasses of warm or copper-stored water immediately upon waking to flush toxins (Ama).',
    benefits: [
      'Stimulates peristalsis and gastrocolic reflex',
      'Flushes accumulated digestive metabolic waste',
      'Hydrates internal organs gently without dampening digestive fire (Agni)'
    ],
    howToPerform: 'Sit comfortably. Sip 250-500ml of warm water or copper-infused water slowly before brushing teeth.',
    iconName: 'Droplets'
  },
  {
    id: 'jihva_nirlekhana',
    title: 'Jihva Nirlekhana (Tongue Scraping)',
    sanskritName: 'Jihva Nirlekhana',
    category: 'Morning',
    timeSlot: '06:15 AM - 06:20 AM',
    description: 'Scraping the coating off the tongue with a copper or stainless steel tongue cleaner.',
    benefits: [
      'Removes overnight toxic coating (Ama)',
      'Prevents bad breath (halitosis) and bacteria buildup',
      'Enhances taste bud sensitivity and digestion signals'
    ],
    howToPerform: 'Extend tongue. Place copper scraper gently at back of tongue and pull forward 5 to 7 times.',
    iconName: 'Sparkles'
  },
  {
    id: 'gandusha',
    title: 'Oil Pulling (Gandusha / Kavala)',
    sanskritName: 'Gandusha / Kavala',
    category: 'Morning',
    timeSlot: '06:20 AM - 06:30 AM',
    description: 'Swishing warm sesame or virgin coconut oil in mouth for 5-10 minutes.',
    benefits: [
      'Strengthens teeth roots, gums, and jaw bone',
      'Draws out lipid-soluble oral toxins',
      'Prevents cavity formation and dry mouth'
    ],
    howToPerform: 'Take 1 tablespoon warm organic sesame or coconut oil. Swish continuously for 5-10 mins. Spit in trash (never sink). Rinse with warm water.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'abhyanga',
    title: 'Self-Massage (Abhyanga)',
    sanskritName: 'Abhyanga',
    category: 'Morning',
    timeSlot: '06:30 AM - 06:45 AM',
    description: 'Anointing the body with warm sesame, coconut, or Mahanarayana herbal oil.',
    benefits: [
      'Lubricates joints and relaxes nervous system',
      'Improves lymphatic drainage and circulation',
      'Delays physical aging and softens skin'
    ],
    howToPerform: 'Warm 2 tbsp oil. Massage in long strokes over long bones and circular strokes over joints for 10-15 mins before warm bath.',
    iconName: 'Heart'
  },
  {
    id: 'pranayama',
    title: 'Pranayama & Meditation',
    sanskritName: 'Pranayama & Dhyana',
    category: 'Morning',
    timeSlot: '06:45 AM - 07:15 AM',
    description: 'Breathing exercises like Anulom Vilom and Kapalabhati followed by silent mindfulness.',
    benefits: [
      'Balances Prana (life force energy) across left and right channels',
      'Reduces morning cortisol and mental fog',
      'Sharpens focus for the day ahead'
    ],
    howToPerform: 'Sit upright in a quiet space. Practice 10 minutes of alternate nostril breathing (Anulom Vilom), then sit in 10 minutes of calm silence.',
    iconName: 'Sun'
  },
  {
    id: 'sattvic_lunch',
    title: 'Mindful Main Meal (Sattvic Ahara)',
    sanskritName: 'Sattvic Ahara',
    category: 'Afternoon',
    timeSlot: '12:00 PM - 01:30 PM',
    description: 'Eating the largest meal of the day when solar and internal digestive fire (Agni) is at its peak.',
    benefits: [
      'Optimal nutrient breakdown and assimilation',
      'Prevents afternoon energy slumps and indigestion',
      'Satiates hunger without lethargy'
    ],
    howToPerform: 'Eat freshly cooked, warm, balanced food containing grains, lentils, fresh vegetables, and ghee. Avoid icy drinks during meals.',
    iconName: 'Utensils'
  },
  {
    id: 'shatapavali',
    title: 'Post-Dinner Walk (Shatapavali)',
    sanskritName: 'Shatapavali',
    category: 'Evening',
    timeSlot: '08:00 PM - 08:30 PM',
    description: 'Taking exactly 100 gentle steps after evening dinner.',
    benefits: [
      'Aids gastric motility and stomach emptying',
      'Prevents acid reflux and bloating before sleep',
      'Helps regulate post-meal blood sugar levels'
    ],
    howToPerform: 'Walk at a slow, peaceful pace for at least 100 steps immediately after finishing dinner. Avoid intense exertion.',
    iconName: 'Footprints'
  },
  {
    id: 'pada_abhyanga',
    title: 'Foot & Scalp Oiling (Pada Abhyanga)',
    sanskritName: 'Pada Abhyanga',
    category: 'Night',
    timeSlot: '09:30 PM - 10:00 PM',
    description: 'Applying warm oil or ghee to soles of feet and temples before sleep.',
    benefits: [
      'Induces deep, dreamless restorative sleep',
      'Cools eye strain and mental exhaustion',
      'Pacifies Vata dosha at night'
    ],
    howToPerform: 'Rub a small drop of warm sesame oil or cow ghee on the soles of feet in circular motions for 3-5 minutes before getting into bed.',
    iconName: 'Moon'
  }
];

export const RITUCHARYA_SEASONS: SeasonInfo[] = [
  {
    id: 'summer',
    name: 'Summer Season',
    sanskritName: 'Greeshma Ritu',
    months: 'May – July',
    dominantDosha: 'Pitta',
    doshaEffect: 'High solar heat depletes bodily moisture (Ojas) and causes Pitta accumulation.',
    primaryFocus: 'Cooling, hydrating, and preserving internal bodily fluids.',
    recommendedFoods: [
      'Sweet, juicy fruits: Watermelon, pomegranates, mangoes, sweet berries',
      'Cooling vegetables: Cucumber, bottle gourd (Lauki), zucchini',
      'Dairy & drinks: Fresh buttermilk (Takra) with cumin, coconut water, rose milk',
      'Healthy fats: Pure Ghee, coconut oil'
    ],
    foodsToAvoid: [
      'Excessively spicy, pungent chili or mustard',
      'Salty, fermented, or deep-fried oily foods',
      'Pungent garlic, raw onions, and heavy red meats'
    ],
    lifestyleTips: [
      'Enjoy moonlight walks in the cool evening breeze',
      'Avoid intense sun exposure between 11 AM and 3 PM',
      'Wear light, breathable cotton or silk clothing in pastel colors',
      'Apply sandalwood or rose water to temples to stay cool'
    ],
    herbalTea: 'Chilled Coriander, Fennel & Rose Petal Infusion',
    color: '#f59e0b'
  },
  {
    id: 'monsoon',
    name: 'Monsoon / Rainy Season',
    sanskritName: 'Varsha Ritu',
    months: 'July – September',
    dominantDosha: 'Vata',
    doshaEffect: 'Humidity and damp environment weaken digestive fire (Agni) and aggravate Vata.',
    primaryFocus: 'Rekindling Agni (digestive fire) and guarding against waterborne humidity toxins.',
    recommendedFoods: [
      'Freshly cooked warm soups, moong dal khichdi, cooked rice',
      'Digestion enhancers: Fresh ginger, rock salt, cumin, asafoetida (Hing)',
      'Boiled, purified, or spice-infused warm drinking water'
    ],
    foodsToAvoid: [
      'Raw salads, leafy greens, and uncooked vegetables (high bacterial risk)',
      'Cold icy beverages, stale reheated food, heavy curd/yogurt at night',
      'Heavy deep-fried snacks that burden weak digestion'
    ],
    lifestyleTips: [
      'Keep body dry and warm; avoid wearing damp clothes or shoes',
      'Perform regular warm sesame oil Abhyanga massage',
      'Fumigate living spaces with Neem or Frankincense (Guggulu) resin',
      'Drink warm water boiled with Dry Ginger (Sunthi)'
    ],
    herbalTea: 'Warm Ginger, Cumin & Holy Basil (Tulsi) Tea',
    color: '#0284c7'
  },
  {
    id: 'autumn',
    name: 'Autumn Season',
    sanskritName: 'Sharad Ritu',
    months: 'September – November',
    dominantDosha: 'Pitta',
    doshaEffect: 'Pitta accumulated during summer erupts due to sudden clear autumn sun.',
    primaryFocus: 'Cleansing excess Pitta heat, soothing skin eruptions, and detoxifying blood.',
    recommendedFoods: [
      'Bitter greens, sweet apples, pears, dates, and raisins',
      'Astringent grains: Basmati rice, barley, oats',
      'Cow ghee, Amla (Indian gooseberry), sweet pomegranates'
    ],
    foodsToAvoid: [
      'Sour curds, vinegars, pickles, and pungent spices',
      'Alcohol, excessive tea/coffee, oily fried snacks',
      'Daytime sleeping which aggravates Pitta and Kapha'
    ],
    lifestyleTips: [
      'Expose body to gentle autumn moonlight (Kamudi)',
      'Consider gentle Virechana (Ayurvedic detox) under practitioner guidance',
      'Use cooling rose water and coconut oil massage',
      'Avoid heavy afternoon direct sunlight'
    ],
    herbalTea: 'Licorice, Fennel & Cardamom Infusion',
    color: '#d97706'
  },
  {
    id: 'winter',
    name: 'Winter Season',
    sanskritName: 'Hemanta & Shishira Ritu',
    months: 'November – March',
    dominantDosha: 'Vata',
    doshaEffect: 'Atmospheric cold seals skin pores, concentrating digestive fire (Agni) very strong.',
    primaryFocus: 'Nourishing deep tissues with rich, warm, wholesome foods to satisfy strong Agni.',
    recommendedFoods: [
      'Nourishing warm soups, sesame seeds (Til), jaggery (Gud), dates',
      'Healthy fats: Pure cow ghee, mustard oil, sesame oil, nuts, almonds',
      'Hearty whole grains: Wheat, millet (Bajra), warm spiced milk'
    ],
    foodsToAvoid: [
      'Cold icy foods, dry crackers, light salads, icy water',
      'Astringent and dry snacks that provoke Vata stiffness'
    ],
    lifestyleTips: [
      'Perform daily warm oil Abhyanga followed by hot bath',
      'Sunbathing in morning sunlight to boost Vitamin D & warmth',
      'Wear warm woolen clothes protecting neck, head, and feet',
      'Vigorous physical exercises, yoga, and weight training'
    ],
    herbalTea: 'Spiced Golden Milk or Cinnamon, Cardamom & Ginger Tea',
    color: '#ec4899'
  },
  {
    id: 'spring',
    name: 'Spring Season',
    sanskritName: 'Vasanta Ritu',
    months: 'March – May',
    dominantDosha: 'Kapha',
    doshaEffect: 'Warm spring sun melts accumulated winter Kapha, causing allergies, congestion, and heavy sluggishness.',
    primaryFocus: 'Liquefying and expelling excess Kapha, detoxifying sinuses, and boosting metabolism.',
    recommendedFoods: [
      'Light, dry, pungent foods: Barley, roasted grams, honey, bitter greens',
      'Spices: Black pepper, long pepper (Pippali), dry ginger, turmeric',
      'Warm herbal water, light lentils (Moong, Masoor)'
    ],
    foodsToAvoid: [
      'Heavy, cold, unctuous foods: Ice cream, heavy dairy, fried sweets',
      'Excess wheat, banana, sour fruits, and heavy meat'
    ],
    lifestyleTips: [
      'Dynamic yoga poses, Sun Salutations (Surya Namaskar), and energetic running',
      'Dry powder massage (Udvartana) using chickpea/herbal powder',
      'Avoid day sleeping (Diva Swapna) which increases Kapha stagnation',
      'Practice steam inhalation with Eucalyptus or Tulsi leaves'
    ],
    herbalTea: 'Honey, Black Pepper, Dry Ginger & Lemon Tea',
    color: '#10b981'
  }
];
