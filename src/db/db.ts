import fs from 'fs';
import path from 'path';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  role: 'patient' | 'asha_worker' | 'admin';
  action: string;
  resource: string;
  ipAddress?: string;
  timestamp: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  fileFormat: 'txt' | 'pdf' | 'docx';
  uploadedBy: string;
  createdAt: string;
}

export interface Profile {
  userId: string;
  role?: 'patient' | 'asha_worker' | 'admin';
  fullName: string;
  age: number;
  gender: string;
  village?: string;
  assignedAshaId?: string;
  phcCenter?: string;
  mobileNumber?: string;
  emergencyContact?: string;
  riskCategory?: 'low' | 'high' | 'pregnant' | 'child' | 'senior' | 'chronic';
  weight: number; // in kg
  height: number; // in cm
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  currentMedication: string[];
  lifestyle: string; // sedentary, active, very active
  sleep: number; // average sleep hours
  waterIntake: number; // target liters
  exercise: string; // walking, yoga, gym, none
  smoking: boolean;
  alcohol: boolean;
  notes?: string;
  lastAssessment?: string;
  consentGiven?: boolean;
  consentTimestamp?: string;

  // Patient Health Questionnaire & Onboarding State
  profileCompleted?: boolean;
  primaryDosha?: string; // Vata, Pitta, Kapha, Tridoshic, Don't Know
  primaryHealthGoal?: string; // Immunity, Digestion, Sleep & Stress, Weight, Pain Relief, Skin & Hair
  dietType?: string; // Vegetarian, Vegan, Non-Vegetarian, Eggetarian
  digestionStatus?: string; // Normal, Acidic / Reflux, Sluggish / Bloated, Irregular
  sleepQuality?: string; // Restful & Deep, Light & Restless, Insomnia

  updatedAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  preparation: string;
  dosage: string;
  warnings: string[];
  imageUrl: string;
  category: 'Cold & Cough' | 'Digestion' | 'Stress & Sleep' | 'Skin & Hair' | 'Immunity' | 'Joints & Pain' | 'General Wellness';
  tags: string[];
}

export interface HealthLog {
  id: string;
  userId: string;
  type: 'weight' | 'water' | 'sleep' | 'exercise' | 'symptoms';
  value: string; // e.g. "72" (kg), "1.5" (L), "8" (hrs), "yoga - 30m", "mild headache"
  notes?: string;
  loggedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  specialistName: string;
  specialty: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'water' | 'medicine' | 'exercise' | 'sleep' | 'general';
  time: string; // "HH:MM" format
  isRead: boolean;
  isEnabled: boolean;
  createdAt: string;
}

export interface Settings {
  userId: string;
  language: 'en' | 'hi' | 'te';
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  voiceEnabled: boolean;
  voiceName: string;
  privacyEnabled: boolean;
}

interface DatabaseSchema {
  users: User[];
  profiles: Profile[];
  chats: Chat[];
  messages: Message[];
  remedies: Remedy[];
  healthLogs: HealthLog[];
  appointments: Appointment[];
  notifications: Notification[];
  settings: Settings[];
  auditLogs: AuditLog[];
  knowledgeDocs: KnowledgeDocument[];
}

// ==========================================
// PATH CONFIGURATION
// ==========================================

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// ==========================================
// PRE-SEEDED AYURVEDIC REMEDIES & KNOWLEDGE
// ==========================================

const DEFAULT_REMEDIES: Remedy[] = [
  {
    id: 'rem_1',
    title: 'Ginger-Tulsi Kadha for Cold & Cough',
    description: 'A traditional warming herbal decoction designed to balance Vata and Kapha, soothe throat irritation, and boost respiratory immunity.',
    benefits: ['Relieves nasal congestion', 'Soothes throat inflammation', 'Improves digestion', 'Acts as a natural antioxidant'],
    ingredients: ['Fresh Ginger (grated) - 1 inch', 'Fresh Tulsi (Holy Basil) Leaves - 8-10', 'Black Pepper - 3-4 crushed kernels', 'Honey - 1 teaspoon', 'Water - 2 cups'],
    preparation: '1. Boil water in a pan.\n2. Add the grated ginger, Tulsi leaves, and crushed black pepper.\n3. Reduce the heat and simmer until the liquid is halved (approx. 10-12 mins).\n4. Strain the liquid and let it cool down to warm/lukewarm.\n5. Stir in the honey (never add honey to boiling liquid as Ayurveda considers heated honey toxic).',
    dosage: 'Drink 1/2 cup (warm) twice daily after meals.',
    warnings: ['Avoid if you have active acid reflux or bleeding disorders (Pitta imbalance).', 'Do not boil honey directly.'],
    imageUrl: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=600&auto=format&fit=crop',
    category: 'Cold & Cough',
    tags: ['cold', 'cough', 'congestion', 'fever', 'tulsi', 'ginger', 'kadha', 'immunity']
  },
  {
    id: 'rem_2',
    title: 'Golden Milk (Haldi Doodh) for Immunity & Pain',
    description: 'A soothing, warm wellness drink packed with anti-inflammatory properties, perfect for pacifying Vata and Pitta doshas while strengthening joints and immunity.',
    benefits: ['Reduces joint and muscle pain', 'Boosts cellular immunity', 'Promotes restful sleep', 'Aids in skin healing'],
    ingredients: ['Milk (or almond milk) - 1 cup', 'Turmeric Powder (organic) - 1/2 teaspoon', 'Crushed Black Pepper - a tiny pinch (enhances turmeric absorption)', 'Cardamom Powder - a pinch (for flavour and Vata pacification)', 'Maple Syrup or Honey - 1/2 teaspoon'],
    preparation: '1. Heat milk in a saucepan on medium heat.\n2. Stir in turmeric powder, black pepper, and cardamom powder.\n3. Bring to a gentle boil, then simmer on low heat for 5 minutes.\n4. Pour into a cup, let it cool slightly, and sweeten with honey or maple syrup.',
    dosage: 'Drink 1 cup warm before bedtime.',
    warnings: ['Turmeric in medicinal doses is warming; reduce usage if experiencing extreme body heat or Pitta flare-ups.', 'Pregnant women should consult a practitioner before taking high doses.'],
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop',
    category: 'Immunity',
    tags: ['pain', 'joint pain', 'sleep', 'immunity', 'inflammation', 'turmeric', 'haldi', 'milk']
  },
  {
    id: 'rem_3',
    title: 'Cumin-Coriander-Fennel (CCF) Tea for Digestion',
    description: 'A highly revered Ayurvedic blend known as CCF Tea. It balances all three doshas (Tridoshic), enlivens Agni (digestive fire) without overheating, and removes Ama (toxins).',
    benefits: ['Reduces bloating and gas', 'Enhances nutrient absorption', 'Gentle detoxification', 'Cools hot flashes or stomach acidity'],
    ingredients: ['Cumin Seeds - 1/2 teaspoon', 'Coriander Seeds - 1/2 teaspoon', 'Fennel Seeds - 1/2 teaspoon', 'Water - 4 cups'],
    preparation: '1. Combine water and the seeds (cumin, coriander, fennel) in a small pot.\n2. Bring to a boil, then reduce heat and simmer covered for 5-10 minutes.\n3. Strain and pour into a thermos to sip throughout the day, or enjoy fresh.',
    dosage: 'Sip warm throughout the day, particularly 15-30 minutes before or after meals.',
    warnings: ['Generally extremely safe for everyone.', 'If pregnant, consult your doctor prior to excessive intake of herbal teas.'],
    imageUrl: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&auto=format&fit=crop',
    category: 'Digestion',
    tags: ['digestion', 'bloating', 'gas', 'acidity', 'detox', 'ccf', 'cumin', 'fennel', 'coriander']
  },
  {
    id: 'rem_4',
    title: 'Ashwagandha Latte for Stress & Sleep',
    description: 'An adaptogenic evening brew designed to ground a hyperactive nervous system, calm Vata dosha, and invite restful, restorative sleep.',
    benefits: ['Reduces cortisol and stress levels', 'Deepens sleep cycles', 'Revitalizes physical energy over time', 'Nourishes the nervous system'],
    ingredients: ['Warm Milk (dairy or oat) - 1 cup', 'Ashwagandha Powder - 1/2 teaspoon', 'Nutmeg Powder - a tiny pinch (natural sedative in Ayurveda)', 'Ghee - 1/4 teaspoon (for Vata grounding)', 'Honey or Coconut Sugar - 1/2 teaspoon'],
    preparation: '1. Heat the milk in a pot until warm.\n2. Whisk in the Ashwagandha powder, nutmeg powder, and ghee.\n3. Warm on low heat for 3-4 minutes to activate the herbs.\n4. Pour into a mug, let cool slightly, and stir in your sweetener.',
    dosage: 'Drink warm 45 minutes before sleeping.',
    warnings: ['Not recommended during active fever or severe congestion (Ama overload).', 'Consult an Ayurvedic doctor if pregnant.'],
    imageUrl: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=600&auto=format&fit=crop',
    category: 'Stress & Sleep',
    tags: ['stress', 'sleep', 'anxiety', 'insomnia', 'fatigue', 'ashwagandha', 'ghee', 'nutmeg']
  },
  {
    id: 'rem_5',
    title: 'Triphala Gentle Detox Cleanser',
    description: 'A classic formula combining three native fruits: Amalaki, Bibhitaki, and Haritaki. It is the premier formula for colon health, digestive regularity, and tissue rejuvenation.',
    benefits: ['Relieves chronic constipation gently', 'Tones the digestive tract', 'Rich in Vitamin C and antioxidants', 'Balances all three doshas'],
    ingredients: ['Triphala Powder (Churna) - 1/2 to 1 teaspoon', 'Warm Water - 1 cup'],
    preparation: '1. Add Triphala powder to a cup of warm water.\n2. Stir well and let it sit for 2-3 minutes to dissolve.',
    dosage: 'Drink before bedtime, at least 1-2 hours after your final meal.',
    warnings: ['Do not use during active diarrhea or dysentery.', 'Discontinue if it causes stomach cramps.'],
    imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop',
    category: 'Digestion',
    tags: ['constipation', 'digestion', 'detox', 'triphala', 'colon', 'gut health']
  },
  {
    id: 'rem_6',
    title: 'Aloe Vera & Mint Cooler for Acidity & Pitta',
    description: 'A cooling, soothing elixir formulated to calm elevated Pitta dosha, cool stomach acid, heal skin rashes, and relieve heart burn.',
    benefits: ['Reduces acid reflux and heartburn', 'Hydrates and cools the system', 'Clears inflammatory skin issues', 'Detoxifies the liver'],
    ingredients: ['Pure Aloe Vera Juice (edible) - 3 tablespoons', 'Fresh Mint Leaves - 5-6', 'Coconut Water or Pure Water - 1 cup', 'Lemon Juice - 1/2 teaspoon', 'Fennel Powder - 1/4 teaspoon'],
    preparation: '1. Blend fresh mint leaves with aloe vera juice and lemon juice.\n2. Strain if desired, then stir into coconut water.\n3. Add a pinch of fennel powder for extra digestive cooling.',
    dosage: 'Drink on an empty stomach in the morning or 30 mins before lunch.',
    warnings: ['Avoid if you have cold, cough, or strong Kapha accumulation.', 'Do not consume Aloe Vera latex; only use pure edible inner leaf juice.'],
    imageUrl: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=600&auto=format&fit=crop',
    category: 'Digestion',
    tags: ['acidity', 'pitta', 'heartburn', 'reflux', 'cooling', 'aloe vera', 'mint', 'coconut']
  },
  {
    id: 'rem_7',
    title: 'Shallaki (Boswellia) & Nirgundi Decoction for Knee Pain & Arthritis',
    description: 'A potent anti-inflammatory herbal decoction balancing Vata dosha, reducing knee joint stiffness, preserving cartilage, and alleviating morning joint pain.',
    benefits: [
      'Reduces knee joint swelling & stiffness',
      'Preserves joint cartilage & flexibility',
      'Improves daily mobility',
      'Pacifies aggravated Vata in joints'
    ],
    ingredients: [
      'Shallaki Powder (Boswellia) - 1/2 teaspoon',
      'Nirgundi Powder or Leaves - 1/2 teaspoon',
      'Fresh Ginger (crushed) - 1/2 inch',
      'Water - 2 cups'
    ],
    preparation: '1. Boil 2 cups of water with Shallaki, Nirgundi, and crushed ginger in a pot.\n2. Simmer on medium heat until reduced to 1 cup.\n3. Strain and let cool until pleasantly warm before sipping.',
    dosage: 'Drink 1/2 cup warm twice daily after meals.',
    warnings: [
      'Avoid taking on an empty stomach if you have severe acid reflux.',
      'Pregnant women should consult an Ayurvedic physician prior to use.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['knee pain', 'joint pain', 'shallaki', 'nirgundi', 'arthritis', 'stiffness', 'vata', 'inflammation']
  },
  {
    id: 'rem_8',
    title: 'Mahanarayana & Warm Sesame Oil Poultice for Knee Stiffness',
    description: 'A traditional Ayurvedic external Janu Basti compress using warm sesame and Mahanarayana oil to deeply lubricate knee joints and ease chronic pain.',
    benefits: [
      'Deeply lubricates knee joint space',
      'Relieves sharp chronic knee pain',
      'Warmth improves localized micro-circulation',
      'Calms Vata nerve sensitivity'
    ],
    ingredients: [
      'Mahanarayana Oil (or Pure Sesame Oil) - 4 tablespoons',
      'Camphor - 1 tiny pinch',
      'Clean Cotton Cloth or Poultice'
    ],
    preparation: '1. Gently warm the Mahanarayana oil in a bowl over a water bath.\n2. Add a tiny pinch of camphor.\n3. Dip a clean cotton cloth into the warm oil and place over the knee joint for 15-20 minutes.',
    dosage: 'Apply warm compress once daily in the evening or after bath.',
    warnings: [
      'Ensure the oil is pleasantly warm, not hot, to prevent skin burns.',
      'Do not apply on open cuts or inflamed skin breaks.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['knee pain', 'joint stiffness', 'mahanarayana', 'sesame oil', 'oil poultice', 'janu basti', 'massage']
  },
  {
    id: 'rem_9',
    title: 'Sunthi (Dry Ginger) & Castor Oil Paste for Inflammatory Knee Swelling',
    description: 'A soothing topical ginger-castor paste (Lepa) formulated to draw out fluid accumulation, reduce joint swelling (Ama Vata), and restore knee flex.',
    benefits: [
      'Reduces joint fluid accumulation & swelling',
      'Draws out Ama (metabolic toxins)',
      'Restores smooth knee flexion',
      'Soothes acute joint inflammation'
    ],
    ingredients: [
      'Dry Ginger Powder (Sunthi) - 2 teaspoons',
      'Pure Castor Oil - 1 tablespoon',
      'Warm Water - 1 teaspoon'
    ],
    preparation: '1. Mix dry ginger powder with castor oil and a splash of warm water to form a smooth paste.\n2. Apply evenly over the affected knee joint.\n3. Cover loosely with a cloth for 30 minutes, then wash with warm water.',
    dosage: 'Apply topically once daily for 5-7 days during swelling.',
    warnings: [
      'Perform a small patch test on skin first.',
      'Discontinue if redness or skin irritation occurs.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['knee swelling', 'dry ginger', 'sunthi', 'castor oil', 'joint inflammation', 'lepa', 'ama vata']
  },
  {
    id: 'rem_10',
    title: 'Fenugreek (Methi) & Flaxseed Porridge for Osteoarthritis & Lubrication',
    description: 'A warm dietary porridge rich in Omega-3 fatty acids and phyto-nutrients that nourishes Synovial fluid (Shleshaka Kapha) and protects joint movement.',
    benefits: [
      'Nourishes synovial joint fluid',
      'Provides natural Omega-3 anti-inflammatory fats',
      'Reduces joint crepitus & cracking sounds',
      'Relieves Vata joint dryness'
    ],
    ingredients: [
      'Fenugreek Seeds (soaked overnight) - 1 teaspoon',
      'Roasted Flaxseeds (ground) - 1 tablespoon',
      'Milk or Almond Milk - 1 cup',
      'Organic Jaggery - 1 teaspoon'
    ],
    preparation: '1. Boil soaked fenugreek seeds and flaxseed meal in milk for 8 minutes.\n2. Sweeten with natural jaggery and serve warm.',
    dosage: 'Consume 1 bowl warm in the morning as breakfast support.',
    warnings: [
      'Fenugreek is slightly warming; reduce dose if experiencing nosebleeds or body heat.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['osteoarthritis', 'knee lubrication', 'fenugreek', 'flaxseed', 'omega 3', 'synovial fluid']
  },
  {
    id: 'rem_11',
    title: 'Dashamoola Kashayam for Lower Back & Sciatica Nerve Pain',
    description: 'The famous ten-root classic Ayurvedic decoction (Dashamoola) that specifically targets spinal stiffness, sciatica, lower back strain, and nerve pain.',
    benefits: [
      'Relieves sciatica & back strain',
      'Soothes spinal nerve inflammation',
      'Strengthens spinal column & hips',
      'Deeply grounds aggravated Vata'
    ],
    ingredients: [
      'Dashamoola Churna - 1 teaspoon',
      'Dry Ginger Powder - 1/4 teaspoon',
      'Water - 2 cups'
    ],
    preparation: '1. Combine Dashamoola powder and ginger in 2 cups of water.\n2. Boil on medium heat until reduced to 1/2 cup.\n3. Strain and drink warm.',
    dosage: 'Drink 1/2 cup warm in the morning or bedtime.',
    warnings: [
      'Consult an Ayurvedic doctor if taking prescribed blood thinners.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['back pain', 'sciatica', 'dashamoola', 'nerve pain', 'spine stiffness', 'vata relief']
  },
  {
    id: 'rem_12',
    title: 'Hadjod (Bone Setter) & Turmeric Milk for Bone Density & Ligament Repair',
    description: "Hadjod (Cissus quadrangularis) is Ayurveda's legendary bone-building herb. Paired with turmeric, it accelerates ligament recovery and fortifies knee bone density.",
    benefits: [
      'Strengthens bone mineral density',
      'Repairs strained knee ligaments',
      'Fast-tracks joint recovery',
      'Reduces calcification discomfort'
    ],
    ingredients: [
      'Hadjod Powder - 1/4 teaspoon',
      'Turmeric Powder - 1/4 teaspoon',
      'Cow Milk or Sesame Milk - 1 cup',
      'Raw Honey - 1/2 teaspoon'
    ],
    preparation: '1. Whisk Hadjod and turmeric powder into warm milk.\n2. Simmer gently for 3 minutes.\n3. Let cool to lukewarm and stir in raw honey.',
    dosage: 'Drink 1 cup warm once daily after dinner.',
    warnings: [
      'Do not exceed recommended dosage.',
      'Not advised for children without physician guidance.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['bone health', 'hadjod', 'ligament repair', 'knee strength', 'calcium', 'turmeric']
  },
  {
    id: 'rem_13',
    title: 'Guggulu & Ajwain Warm Herbal Compress for Morning Joint Stiffness',
    description: 'A warming herbal steam compress (Potali Sweda) using Carom seeds (Ajwain) and Guggulu to melt morning stiffness and improve joint flexion.',
    benefits: [
      'Melts morning joint stiffness',
      'Improves knee flexion angle',
      'Relieves muscle spasms around joints',
      'Enhances local tissue circulation'
    ],
    ingredients: [
      'Ajwain (Carom) Seeds - 3 tablespoons',
      'Rock Salt - 1 tablespoon',
      'Garlic - 2 crushed cloves',
      'Clean Cotton Pouch'
    ],
    preparation: '1. Dry roast Ajwain seeds, rock salt, and garlic on a pan until fragrant.\n2. Tie tightly into a cotton pouch (Potali).\n3. Warm the pouch on a dry pan and gently press onto the stiff knee.',
    dosage: 'Apply warm Potali compress for 10-15 minutes twice daily.',
    warnings: [
      'Test temperature on forearm before applying to avoid heat discomfort.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['morning stiffness', 'ajwain', 'potali', 'guggulu', 'compress', 'joint flex']
  },
  {
    id: 'rem_14',
    title: 'Punarnava & Giloy Decoction for Gout & High Uric Acid Joint Pain',
    description: 'A purifying Ayurvedic herbal remedy that promotes kidney uric acid excretion, reduces gout flare-ups, and relieves swelling in big toes and knees.',
    benefits: [
      'Flushes excess uric acid from blood',
      'Relieves gout toe & knee joint pain',
      'Reduces inflammatory swelling',
      'Purifies blood tissue (Rakta Dhatu)'
    ],
    ingredients: [
      'Punarnava Powder - 1/2 teaspoon',
      'Giloy (Guduchi) Stem or Powder - 1/2 teaspoon',
      'Coriander Seeds - 1/2 teaspoon',
      'Water - 2 cups'
    ],
    preparation: '1. Boil Punarnava, Giloy, and coriander seeds in 2 cups of water.\n2. Reduce to 1 cup, strain, and let cool to room temperature.',
    dosage: 'Drink 1/2 cup twice daily before meals.',
    warnings: [
      'Keep well hydrated with warm water throughout the day.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['gout', 'uric acid', "punarnava", 'giloy', 'ankle pain', 'knee pain', 'detox']
  },
  {
    id: 'rem_15',
    title: 'Bala & Ashwagandha Nourishing Tonic for Knee Weakness & Muscle Atrophy',
    description: 'A restorative Rasayana formula containing Country Mallow (Bala) and Ashwagandha to rebuild quadriceps muscle strength supporting the knee joint.',
    benefits: [
      'Builds muscle strength around knees',
      'Prevents knee joint instability',
      'Rejuvenates nervous system',
      'Supports senior leg agility'
    ],
    ingredients: [
      'Bala Powder - 1/2 teaspoon',
      'Ashwagandha Powder - 1/2 teaspoon',
      'Warm Milk - 1 cup',
      'Ghee - 1/2 teaspoon'
    ],
    preparation: '1. Simmer Bala and Ashwagandha powders in milk with ghee for 5 minutes.\n2. Serve warm.',
    dosage: 'Drink 1 cup warm daily after breakfast or dinner.',
    warnings: [
      'Avoid during acute fever or indigestion (Ama).'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['knee weakness', 'bala', 'ashwagandha', 'muscle strength', 'quadriceps', 'senior agility']
  },
  {
    id: 'rem_16',
    title: 'Eucalyptus & Camphor Liniment for Acute Knee Soreness & Spasms',
    description: 'A fast-acting cooling-warming herbal liniment that penetrates deep into sore knee tendons, easing acute muscle tightness and sports soreness.',
    benefits: [
      'Rapid pain relief for knee soreness',
      'Soothes muscle spasms & cramps',
      'Cools tendon inflammation',
      'Improves local circulation'
    ],
    ingredients: [
      'Coconut Oil - 3 tablespoons',
      'Eucalyptus Essential Oil - 5 drops',
      'Edible Camphor - 1/4 teaspoon'
    ],
    preparation: '1. Dissolve camphor in warm coconut oil.\n2. Stir in eucalyptus oil drops.\n3. Gently rub into knee joint with light upward strokes.',
    dosage: 'Apply 2-3 times daily as needed for pain.',
    warnings: [
      'External application only.',
      'Keep away from eyes and broken skin.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop',
    category: 'Joints & Pain',
    tags: ['knee soreness', 'eucalyptus', 'camphor', 'spasms', 'liniment', 'muscle relief']
  },
  {
    id: 'rem_17',
    title: 'Neem, Turmeric & Aloe Vera Face Lepa for Acne & Glowing Skin',
    description: 'A purifying herbal face mask (Lepa) that cools excess Pitta, detoxifies skin pores, clears blemishes, and restores natural radiance.',
    benefits: [
      'Clears acne & pimple breakouts',
      'Reduces dark spots & pigmentation',
      'Cools skin inflammation & redness',
      'Balances excess skin sebum'
    ],
    ingredients: [
      'Neem Leaf Powder - 1 teaspoon',
      'Wild Turmeric (Kasturi Manjal) - 1/2 teaspoon',
      'Pure Aloe Vera Gel - 1 tablespoon',
      'Rose Water - 1 teaspoon'
    ],
    preparation: '1. Mix neem leaf powder and wild turmeric in a small bowl.\n2. Add fresh aloe vera gel and rose water, stirring into a smooth paste.\n3. Apply evenly to clean face, avoiding the eye area.\n4. Leave on for 15-20 minutes until dry, then rinse with lukewarm water.',
    dosage: 'Apply 2-3 times a week for glowing skin.',
    warnings: [
      'Perform a patch test behind the ear prior to first application.',
      'Avoid using on open cuts or active bleeding skin lesions.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    category: 'Skin & Hair',
    tags: ['acne', 'skin care', 'glowing skin', 'neem', 'turmeric', 'aloe vera', 'pitta', 'lepa']
  },
  {
    id: 'rem_18',
    title: 'Bhringraj, Amla & Coconut Oil Massage for Hair Loss & Scalp Strength',
    description: 'A classic Ayurvedic scalp treatment infused with "King of Hair" (Bhringraj) and Gooseberry (Amla) to stimulate follicles, reduce hair fall, and prevent early graying.',
    benefits: [
      'Promotes thick hair follicle growth',
      'Strengthens hair roots & prevents breakage',
      'Soothes dry scalp & clears dandruff',
      'Prevents premature graying of hair'
    ],
    ingredients: [
      'Bhringraj Powder - 1 tablespoon',
      'Amla Powder - 1 tablespoon',
      'Pure Coconut Oil or Sesame Oil - 1/2 cup',
      'Curry Leaves - 8-10 fresh leaves'
    ],
    preparation: '1. Warm coconut oil in a small pan on low heat.\n2. Add Bhringraj powder, Amla powder, and fresh curry leaves.\n3. Simmer gently for 8-10 minutes until oil darkens slightly.\n4. Strain the oil into a glass jar and let cool until lukewarm.\n5. Gently massage into scalp in circular motions for 10 minutes.',
    dosage: 'Apply to scalp twice weekly, leave for 1 hour or overnight before washing.',
    warnings: [
      'Ensure oil is lukewarm, not hot, before scalp massage.',
      'Rinse thoroughly with mild natural shampoo.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    category: 'Skin & Hair',
    tags: ['hair fall', 'hair growth', 'bhringraj', 'amla', 'dandruff', 'scalp massage', 'hair care']
  },
  {
    id: 'rem_19',
    title: 'Chyawanprash & Golden Warm Milk for Daily Vitality & Ojas',
    description: 'A time-honored daily Ayurvedic Rasayana ritual that nourishes all seven tissue layers (Dhatus), builds core energy (Ojas), and protects daily immunity.',
    benefits: [
      'Enhances daily energy & physical stamina',
      'Nourishes all 7 body tissue layers (Dhatus)',
      'Improves digestion & cellular metabolism',
      'Strengthens respiratory immunity year-round'
    ],
    ingredients: [
      'Authentic Herbal Chyawanprash - 1 tablespoon',
      'Warm Cow Milk or Almond Milk - 1 cup',
      'Cardamom Powder - 1 pinch'
    ],
    preparation: '1. Warm a cup of milk gently on the stove with a pinch of cardamom.\n2. Consume 1 tablespoon of Chyawanprash slowly on an empty stomach.\n3. Sip the warm milk immediately after to enhance absorption into tissues.',
    dosage: 'Take 1 tablespoon every morning after waking up.',
    warnings: [
      'Diabetic individuals should select sugar-free Chyawanprash formulation.',
      'Avoid taking milk immediately after acidic fruit juices.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    category: 'General Wellness',
    tags: ['general wellness', 'vitality', 'chyawanprash', 'ojas', 'stamina', 'rasayana', 'daily energy']
  },
  {
    id: 'rem_20',
    title: 'Triphala Water Bedtime Tonic for Daily Detox & Longevity',
    description: 'The foundational 3-fruit rejuvenation blend (Amalaki, Bibhitaki, Haritaki) taken every night to cleanse the digestive tract, brighten vision, and promote longevity.',
    benefits: [
      'Gently cleanses digestive system overnight',
      'Supports liver detoxification & eye health',
      'Promotes clear skin & metabolic balance',
      'Balances all 3 Vata, Pitta & Kapha doshas'
    ],
    ingredients: [
      'Organic Triphala Powder - 1/2 teaspoon',
      'Luke-warm Water - 1 cup',
      'Organic Honey - 1/2 teaspoon (optional)'
    ],
    preparation: '1. Stir 1/2 teaspoon of Triphala powder into 1 cup of warm water.\n2. Let it infuse for 5 minutes.\n3. Add a dash of honey if desired once lukewarm, and sip slowly.',
    dosage: 'Drink 1 cup every night 30 minutes before sleep.',
    warnings: [
      'Reduce dosage if loose stools occur.',
      'Do not consume during pregnancy without consulting your physician.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600&auto=format&fit=crop',
    category: 'General Wellness',
    tags: ['triphala', 'daily detox', 'longevity', 'general wellness', 'digestion', 'tridoshic', 'cleansing']
  }
];

const DEFAULT_SAMPLE_PROFILES: Profile[] = [
  {
    userId: 'pat_1',
    role: 'patient',
    fullName: 'Sita Lakshmi Devi',
    age: 26,
    gender: 'Female',
    village: 'Rampur',
    mobileNumber: '+91 98765 43210',
    emergencyContact: '+91 98765 43211',
    riskCategory: 'pregnant',
    weight: 58,
    height: 158,
    bloodGroup: 'O+',
    allergies: ['Peanuts'],
    medicalConditions: ['2nd Trimester Pregnancy', 'Mild Anemia (Hb 9.8 g/dL)'],
    currentMedication: ['Iron & Folic Acid Tablets', 'Shatavari Herbal Supplement'],
    lifestyle: 'active',
    sleep: 8,
    waterIntake: 3.0,
    exercise: 'Gentle walking',
    smoking: false,
    alcohol: false,
    notes: '2nd trimester routine checkup done. Advised Jaggery + Sesame Laddu for boosting iron levels.',
    lastAssessment: 'Pitta-Vata imbalance under control. Advised adequate hydration & rest.',
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'pat_2',
    role: 'patient',
    fullName: 'Ramesh Kumar Patel',
    age: 68,
    gender: 'Male',
    village: 'Sitapur',
    mobileNumber: '+91 98765 43212',
    emergencyContact: '+91 98765 43213',
    riskCategory: 'senior',
    weight: 72,
    height: 165,
    bloodGroup: 'B+',
    allergies: ['None'],
    medicalConditions: ['Hypertension', 'Knee Joint Osteoarthritis'],
    currentMedication: ['Amlodipine 5mg', 'Shallaki & Nirgundi Oil Application'],
    lifestyle: 'sedentary',
    sleep: 6,
    waterIntake: 2.0,
    exercise: 'Breathing exercises',
    smoking: false,
    alcohol: false,
    notes: 'Complaining of morning knee stiffness. Advised daily warm Sesame oil Abhyanga massage.',
    lastAssessment: 'High Vata aggravation affecting joints. Recommended warm Ginger CCF tea.',
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'pat_3',
    role: 'patient',
    fullName: 'Master Chinna Rao',
    age: 6,
    gender: 'Male',
    village: 'Rampur',
    mobileNumber: '+91 98765 43214',
    emergencyContact: '+91 98765 43210',
    riskCategory: 'child',
    weight: 18,
    height: 110,
    bloodGroup: 'A+',
    allergies: ['Dust'],
    medicalConditions: ['Seasonal Allergic Cough', 'Loss of Appetite'],
    currentMedication: ['Chyawanprash 1/2 tsp', 'Honey & Tulsi Syrup'],
    lifestyle: 'active',
    sleep: 9,
    waterIntake: 1.8,
    exercise: 'Outdoor play',
    smoking: false,
    alcohol: false,
    notes: 'Weight gain on track. Immunization up to date. Advised Tulsi-Honey tea for cough.',
    lastAssessment: 'Kapha accumulation in chest. Recommended steam inhalation with eucalyptus.',
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'pat_4',
    role: 'patient',
    fullName: 'Anasuya Devi',
    age: 52,
    gender: 'Female',
    village: 'Devpur',
    mobileNumber: '+91 98765 43215',
    emergencyContact: '+91 98765 43216',
    riskCategory: 'chronic',
    weight: 76,
    height: 155,
    bloodGroup: 'AB+',
    allergies: ['None'],
    medicalConditions: ['Type 2 Diabetes', 'Chronic Acid Reflux (Amlapitta)'],
    currentMedication: ['Metformin 500mg', 'Amla & Triphala Churna'],
    lifestyle: 'sedentary',
    sleep: 7,
    waterIntake: 2.5,
    exercise: 'Morning brisk walk',
    smoking: false,
    alcohol: false,
    notes: 'Fasting blood sugar 130 mg/dL. Re-emphasized avoiding fried & spicy foods.',
    lastAssessment: 'High Pitta-Kapha imbalance. Triphala at bedtime showing good bowel regulation.',
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'pat_5',
    role: 'patient',
    fullName: 'Lakshman Swamy',
    age: 44,
    gender: 'Male',
    village: 'Sitapur',
    mobileNumber: '+91 98765 43217',
    emergencyContact: '+91 98765 43218',
    riskCategory: 'high',
    weight: 82,
    height: 172,
    bloodGroup: 'O-',
    allergies: ['Sulfa Drugs'],
    medicalConditions: ['Chronic Bronchitis', 'Work Stress'],
    currentMedication: ['Vasaka Decoction', 'Ashwagandha Churna'],
    lifestyle: 'active',
    sleep: 6,
    waterIntake: 2.8,
    exercise: 'Agricultural work',
    smoking: true,
    alcohol: false,
    notes: 'Counselled on smoking cessation. Provided Vasaka syrup for bronchial relief.',
    lastAssessment: 'Vata-Kapha respiratory congestion. Advised daily Pranayama & warm water.',
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'kdoc_1',
    title: 'AYUSH Standard Treatment Guidelines for Rural Anemia & Malnutrition',
    category: 'Maternal & Child Health',
    content: 'Comprehensive protocol for managing iron deficiency anemia in pregnant mothers using Shatavari, Punarnava Mandur, and dietary Jaggery-Sesame supplements.',
    fileFormat: 'pdf',
    uploadedBy: 'Admin Directorate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'kdoc_2',
    title: 'Ayurvedic Management of Seasonal Respiratory Viral Infections',
    category: 'Respiratory Health',
    content: 'Clinical guidelines for Tulsi, Ginger, Vasaka, and Sitopaladi Churna administration during rural monsoon viral cough surges.',
    fileFormat: 'docx',
    uploadedBy: 'Chief Medical Officer',
    createdAt: new Date().toISOString()
  },
  {
    id: 'kdoc_3',
    title: 'ASHA Field Handbook: High Risk Pregnancy Screening (HRP)',
    category: 'Field Operations',
    content: 'Step-by-step checklist for identifying high risk pregnancies, measuring BP, checking hemoglobin levels, and emergency referral protocols.',
    fileFormat: 'txt',
    uploadedBy: 'State Health Mission',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit_1',
    userId: 'admin_1',
    userEmail: 'admin@pranayu.gov.in',
    role: 'admin',
    action: 'Knowledge Base Uploaded',
    resource: 'AYUSH Treatment Guidelines PDF',
    ipAddress: '192.168.1.100',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'audit_2',
    userId: 'asha_1',
    userEmail: 'asha.rampur@pranayu.gov.in',
    role: 'asha_worker',
    action: 'Patient Record Updated',
    resource: 'Sita Lakshmi Devi (pat_1)',
    ipAddress: '10.0.0.42',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'audit_3',
    userId: 'pat_1',
    userEmail: 'patient1@example.com',
    role: 'patient',
    action: 'User Login & Chat Consultation',
    resource: 'Ayurvedic AI Chat Assistant',
    ipAddress: '172.16.0.5',
    timestamp: new Date(Date.now() - 600000).toISOString()
  }
];

// ==========================================
// DATABASE CONTROLLER CLASS
// ==========================================

class Database {
  private memoryDb: DatabaseSchema = {
    users: [],
    profiles: DEFAULT_SAMPLE_PROFILES,
    chats: [],
    messages: [],
    remedies: DEFAULT_REMEDIES,
    healthLogs: [],
    appointments: [],
    notifications: [],
    settings: [],
    auditLogs: DEFAULT_AUDIT_LOGS,
    knowledgeDocs: DEFAULT_KNOWLEDGE_DOCS
  };

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        
        // Merge stored profiles with default sample patients if needed
        const existingProfiles = parsed.profiles && parsed.profiles.length > 0 ? parsed.profiles : DEFAULT_SAMPLE_PROFILES;
        
        // Ensure sample patient profiles exist in memoryDb
        DEFAULT_SAMPLE_PROFILES.forEach(sample => {
          if (!existingProfiles.some((p: Profile) => p.userId === sample.userId)) {
            existingProfiles.push(sample);
          }
        });

        this.memoryDb = {
          users: parsed.users || [],
          profiles: existingProfiles,
          chats: parsed.chats || [],
          messages: parsed.messages || [],
          remedies: parsed.remedies && parsed.remedies.length > 0 ? parsed.remedies : DEFAULT_REMEDIES,
          healthLogs: parsed.healthLogs || [],
          appointments: parsed.appointments || [],
          notifications: parsed.notifications || [],
          settings: parsed.settings || [],
          auditLogs: parsed.auditLogs && parsed.auditLogs.length > 0 ? parsed.auditLogs : DEFAULT_AUDIT_LOGS,
          knowledgeDocs: parsed.knowledgeDocs && parsed.knowledgeDocs.length > 0 ? parsed.knowledgeDocs : DEFAULT_KNOWLEDGE_DOCS
        };
      } else {
        this.save();
      }
    } catch (e) {
      console.error('Error initializing file database, using in-memory fallback', e);
    }
  }

  private save() {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(this.memoryDb, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (e) {
      console.error('Error writing database to disk', e);
    }
  }

  // ==========================================
  // READS & QUERIES
  // ==========================================

  public getUsers(): User[] {
    return this.memoryDb.users;
  }

  public getProfiles(): Profile[] {
    return this.memoryDb.profiles;
  }

  public getChats(): Chat[] {
    return this.memoryDb.chats;
  }

  public getMessages(): Message[] {
    return this.memoryDb.messages;
  }

  public getRemedies(): Remedy[] {
    return this.memoryDb.remedies;
  }

  public getHealthLogs(): HealthLog[] {
    return this.memoryDb.healthLogs;
  }

  public getAppointments(): Appointment[] {
    return this.memoryDb.appointments;
  }

  public getNotifications(): Notification[] {
    return this.memoryDb.notifications;
  }

  public getSettings(): Settings[] {
    return this.memoryDb.settings;
  }

  public getAuditLogs(): AuditLog[] {
    return this.memoryDb.auditLogs || [];
  }

  public getKnowledgeDocs(): KnowledgeDocument[] {
    return this.memoryDb.knowledgeDocs || [];
  }

  // ==========================================
  // WRITES & UPDATES
  // ==========================================

  public addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'> & { timestamp?: string }): AuditLog {
    const newLog: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: log.timestamp || new Date().toISOString(),
      ...log
    };
    if (!this.memoryDb.auditLogs) this.memoryDb.auditLogs = [];
    this.memoryDb.auditLogs.unshift(newLog); // latest first
    this.save();
    return newLog;
  }

  public addKnowledgeDoc(doc: Omit<KnowledgeDocument, 'id' | 'createdAt'>): KnowledgeDocument {
    const newDoc: KnowledgeDocument = {
      id: `kdoc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...doc
    };
    if (!this.memoryDb.knowledgeDocs) this.memoryDb.knowledgeDocs = [];
    this.memoryDb.knowledgeDocs.unshift(newDoc);
    this.save();
    return newDoc;
  }

  public deleteKnowledgeDoc(id: string) {
    if (this.memoryDb.knowledgeDocs) {
      this.memoryDb.knowledgeDocs = this.memoryDb.knowledgeDocs.filter(d => d.id !== id);
      this.save();
    }
  }

  public saveRemedy(remedy: Remedy): Remedy {
    const idx = this.memoryDb.remedies.findIndex(r => r.id === remedy.id);
    if (idx >= 0) {
      this.memoryDb.remedies[idx] = remedy;
    } else {
      this.memoryDb.remedies.push(remedy);
    }
    this.save();
    return remedy;
  }

  public deleteRemedy(id: string) {
    this.memoryDb.remedies = this.memoryDb.remedies.filter(r => r.id !== id);
    this.save();
  }

  public addUser(user: User): User {
    this.memoryDb.users.push(user);
    this.save();
    return user;
  }

  public saveProfile(profile: Profile): Profile {
    const idx = this.memoryDb.profiles.findIndex(p => p.userId === profile.userId);
    if (idx >= 0) {
      this.memoryDb.profiles[idx] = profile;
    } else {
      this.memoryDb.profiles.push(profile);
    }
    this.save();
    return profile;
  }

  public addChat(chat: Chat): Chat {
    this.memoryDb.chats.push(chat);
    this.save();
    return chat;
  }

  public deleteChat(chatId: string) {
    this.memoryDb.chats = this.memoryDb.chats.filter(c => c.id !== chatId);
    this.memoryDb.messages = this.memoryDb.messages.filter(m => m.chatId !== chatId);
    this.save();
  }

  public addMessage(message: Message): Message {
    this.memoryDb.messages.push(message);
    const chat = this.memoryDb.chats.find(c => c.id === message.chatId);
    if (chat) {
      chat.updatedAt = new Date().toISOString();
    }
    this.save();
    return message;
  }

  public addHealthLog(log: HealthLog): HealthLog {
    this.memoryDb.healthLogs.push(log);
    this.save();
    return log;
  }

  public deleteHealthLog(logId: string) {
    this.memoryDb.healthLogs = this.memoryDb.healthLogs.filter(l => l.id !== logId);
    this.save();
  }

  public addAppointment(appointment: Appointment): Appointment {
    this.memoryDb.appointments.push(appointment);
    this.save();
    return appointment;
  }

  public updateAppointmentStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled') {
    const app = this.memoryDb.appointments.find(a => a.id === id);
    if (app) {
      app.status = status;
      this.save();
    }
  }

  public addNotification(notif: Notification): Notification {
    this.memoryDb.notifications.push(notif);
    this.save();
    return notif;
  }

  public updateNotification(id: string, updates: Partial<Notification>) {
    const idx = this.memoryDb.notifications.findIndex(n => n.id === id);
    if (idx >= 0) {
      this.memoryDb.notifications[idx] = { ...this.memoryDb.notifications[idx], ...updates };
      this.save();
    }
  }

  public saveSettings(settings: Settings): Settings {
    const idx = this.memoryDb.settings.findIndex(s => s.userId === settings.userId);
    if (idx >= 0) {
      this.memoryDb.settings[idx] = settings;
    } else {
      this.memoryDb.settings.push(settings);
    }
    this.save();
    return settings;
  }

  public deleteUserAccount(userId: string) {
    this.memoryDb.users = this.memoryDb.users.filter(u => u.id !== userId);
    this.memoryDb.profiles = this.memoryDb.profiles.filter(p => p.userId !== userId);
    this.memoryDb.settings = this.memoryDb.settings.filter(s => s.userId !== userId);
    this.memoryDb.healthLogs = this.memoryDb.healthLogs.filter(l => l.userId !== userId);
    this.memoryDb.appointments = this.memoryDb.appointments.filter(a => a.userId !== userId);
    this.memoryDb.notifications = this.memoryDb.notifications.filter(n => n.userId !== userId);
    
    const userChats = this.memoryDb.chats.filter(c => c.userId === userId).map(c => c.id);
    this.memoryDb.chats = this.memoryDb.chats.filter(c => c.userId !== userId);
    this.memoryDb.messages = this.memoryDb.messages.filter(m => !userChats.includes(m.chatId));
    
    this.save();
  }

  // ==========================================
  // RAG / LOCAL CONTEXT RETRIEVER ENGINE
  // ==========================================
  public retrieveRelevantKnowledge(query: string, maxResults = 2): KnowledgeDocument[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery || !this.memoryDb.knowledgeDocs) return (this.memoryDb.knowledgeDocs || []).slice(0, maxResults);

    const keywords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
    
    const scoredDocs = (this.memoryDb.knowledgeDocs || []).map(doc => {
      let score = 0;
      if (doc.title.toLowerCase().includes(normalizedQuery)) score += 15;
      if (doc.content.toLowerCase().includes(normalizedQuery)) score += 10;
      
      for (const kw of keywords) {
        if (doc.title.toLowerCase().includes(kw)) score += 5;
        if (doc.content.toLowerCase().includes(kw)) score += 2;
        if (doc.category.toLowerCase().includes(kw)) score += 4;
      }
      return { doc, score };
    });

    return scoredDocs
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.doc)
      .slice(0, maxResults);
  }
  public retrieveRelevantRemedies(query: string, maxResults = 3): Remedy[] {
    const normalizedQuery = query.toLowerCase().trim();

    // Compute simple relevance scores for each remedy based on term frequency
    const scoredRemedies = this.memoryDb.remedies.map(rem => {
      let score = 0;
      
      // Match words
      const keywords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
      
      // Exact matches of whole query
      if (rem.title.toLowerCase().includes(normalizedQuery)) score += 15;
      if (rem.description.toLowerCase().includes(normalizedQuery)) score += 8;
      if (rem.category.toLowerCase().includes(normalizedQuery)) score += 10;
      
      for (const kw of keywords) {
        // Tag matches
        if (rem.tags.some(tag => tag.toLowerCase() === kw)) score += 10;
        else if (rem.tags.some(tag => tag.toLowerCase().includes(kw))) score += 5;
        
        // Title matches
        if (rem.title.toLowerCase().includes(kw)) score += 6;
        
        // Description matches
        if (rem.description.toLowerCase().includes(kw)) score += 3;
        
        // Ingredients matches
        if (rem.ingredients.some(ing => ing.toLowerCase().includes(kw))) score += 4;
        
        // Benefits/Prep/Warnings
        if (rem.benefits.some(b => b.toLowerCase().includes(kw))) score += 2;
        if (rem.preparation.toLowerCase().includes(kw)) score += 1;
        if (rem.warnings.some(w => w.toLowerCase().includes(kw))) score += 1;
      }
      
      return { remedy: rem, score };
    });

    // Filter out remedies with 0 score, sort descending, and take top N
    return scoredRemedies
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.remedy)
      .slice(0, maxResults);
  }
}

export const db = new Database();
