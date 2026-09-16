import { Language } from './translations';
import { Herb } from '../data/herbsData';

export const HERBAL_GARDEN_UI: Record<Language, {
  tagline: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  doshaLabel: string;
  categoryLabel: string;
  veeryaLabel: string;
  vipakaLabel: string;
  rasaLabel: string;
  gunaLabel: string;
  doshaKarmaLabel: string;
  therapeuticUsesLabel: string;
  recommendedFormLabel: string;
  habitatLabel: string;
  safetyLabel: string;
  dravyagunaHeader: string;
  exploreCta: string;
  noResultsTitle: string;
  noResultsDesc: string;
  audioTitle: string;
}> = {
  en: {
    tagline: 'Dravyaguna Vijnana • Herbal Pharmacology',
    title: 'Interactive Ayurvedic Herbal Garden 🌺',
    subtitle: 'Explore the sacred plant kingdom of Ayurveda. Study raw botanical profiles through the lens of classical Dravyaguna science — analyzing Rasa (Taste), Guna (Qualities), Veerya (Potency), and Vipaka (Post-digestive effect).',
    searchPlaceholder: 'Search herbs (e.g., Neem, Ashwagandha, Tulsi)...',
    doshaLabel: 'Dosha:',
    categoryLabel: 'Category:',
    veeryaLabel: 'Veerya (Potency)',
    vipakaLabel: 'Vipaka (Digestive)',
    rasaLabel: 'Rasa (Tastes)',
    gunaLabel: 'Guna (Qualities)',
    doshaKarmaLabel: 'Dosha Karma (Dosha Action)',
    therapeuticUsesLabel: 'Key Therapeutic Uses & Benefits',
    recommendedFormLabel: 'Recommended Form & Intake',
    habitatLabel: 'Harvesting & Natural Habitat',
    safetyLabel: 'Safety Precautions & Contraindications',
    dravyagunaHeader: 'Classical Dravyaguna Pharmacological Profile',
    exploreCta: 'Explore Dravyaguna Deep-Dive',
    noResultsTitle: 'No matching Ayurvedic herbs found',
    noResultsDesc: 'Try clearing your search term or selecting "All" categories.',
    audioTitle: 'Audio narration'
  },
  hi: {
    tagline: 'द्रव्यगुण विज्ञान • जड़ी-बूटी भेषजशास्त्र',
    title: 'इंटरएक्टिव आयुर्वेदिक जड़ी-बूटी वाटिका 🌺',
    subtitle: 'आयुर्वेद के पवित्र वनस्पति जगत का अन्वेषण करें। शास्त्रीय द्रव्यगुण विज्ञान के आलोक में औषधीय गुणों - रस (स्वाद), गुण, वीर्य (प्रभाव) और विपाक का अध्ययन करें।',
    searchPlaceholder: 'जड़ी-बूटियाँ खोजें (जैसे नीम, अश्वगंधा, तुलसी)...',
    doshaLabel: 'दोष:',
    categoryLabel: 'श्रेणी:',
    veeryaLabel: 'वीर्य (प्रभाव)',
    vipakaLabel: 'विपाक (पाचन प्रभाव)',
    rasaLabel: 'रस (स्वाद)',
    gunaLabel: 'गुण (विशेषताएं)',
    doshaKarmaLabel: 'दोष कर्म (दोष पर प्रभाव)',
    therapeuticUsesLabel: 'प्रमुख चिकित्सीय उपयोग व लाभ',
    recommendedFormLabel: 'सेवन का सही तरीका व रूप',
    habitatLabel: 'कटाई का समय एवं प्राकृतिक आवास',
    safetyLabel: 'सावधानियां एवं निषेध',
    dravyagunaHeader: 'शास्त्रीय द्रव्यगुण औषधीय प्रोफ़ाइल',
    exploreCta: 'द्रव्यगुण विस्तृत विवरण देखें',
    noResultsTitle: 'कोई मेल खाती जड़ी-बूटी नहीं मिली',
    noResultsDesc: 'कृपया खोज शब्द बदलें या "सभी" श्रेणी चुनें।',
    audioTitle: 'ऑडियो विवरण सुनें'
  },
  te: {
    tagline: 'ద్రవ్యగుణ విజ్ఞానం • మూలికా శాస్త్రం',
    title: 'ఇంటరాక్టివ్ ఆయుర్వేద మూలికా తోట 🌺',
    subtitle: 'ఆయుర్వేద దివ్య మూలికా ప్రపంచాన్ని అన్వేషించండి. సాంప్రదాయ ద్రవ్యగుణ శాస్త్రం ద్వారా రసం (రుచి), గుణం, వీర్యం (ప్రభావం) మరియు విపాకం విశ్లేషించండి.',
    searchPlaceholder: 'మూలికలను వెతకండి (ఉదా. వేప, అశ్వగంధ, తులసి)...',
    doshaLabel: 'దోషం:',
    categoryLabel: 'విభాగం:',
    veeryaLabel: 'వీర్యం (ప్రభావం)',
    vipakaLabel: 'విపాకం (జీర్ణ ఫలితం)',
    rasaLabel: 'రసం (రుచులు)',
    gunaLabel: 'గుణం (స్వభావం)',
    doshaKarmaLabel: 'దోష కర్మ (దోషాలపై ప్రభావం)',
    therapeuticUsesLabel: 'ప్రధాన ఆరోగ్య ప్రయోజనాలు',
    recommendedFormLabel: 'తీసుకోవాల్సిన విధానం',
    habitatLabel: 'పంట కాలం & సహజ ప్రాంతం',
    safetyLabel: 'జాగ్రత్తలు & సలహాలు',
    dravyagunaHeader: 'శాస్త్రీయ ద్రవ్యగుణ మూలికా వివరాలు',
    exploreCta: 'ద్రవ్యగుణ వివరాలను చూడండి',
    noResultsTitle: 'ఎలాంటి మూలికలు కనుగొనబడలేదు',
    noResultsDesc: 'దయచేసి సెర్చ్ పదాన్ని మార్చండి లేదా "అన్నీ" ఎంచుకోండి.',
    audioTitle: 'ఆడియో వివరణ వినండి'
  }
};

export const HERB_CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'All': { en: 'All', hi: 'सभी', te: 'అన్నీ' },
  'Adaptogen': { en: 'Adaptogen', hi: 'रसायन (तनाव-रोधी)', te: 'రసాయన (ఒత్తిడి ఉపశమనం)' },
  'Immunity': { en: 'Immunity', hi: 'प्रतिरोधक क्षमता (ओजस)', te: 'రోగనిరోధక శక్తి (ఓజస్)' },
  'Skin & Hair': { en: 'Skin & Hair', hi: 'त्वचा एवं केश', te: 'చర్మం & జుట్టు' },
  'Digestion': { en: 'Digestion', hi: 'पाचन एवं अग्नि', te: 'జీర్ణక్రియ & అగ్ని' },
  'Cognition': { en: 'Cognition', hi: 'मेध्य (मस्तिष्क)', te: 'మెదడు & జ్ఞాపకశక్తి' },
  'Respiratory': { en: 'Respiratory', hi: 'श्वसन स्वास्थ्य', te: 'శ్వాసకోశ ఆరోగ్యం' }
};

export const HERB_LOCALIZED_DATA: Record<string, Record<Language, {
  name: string;
  summary: string;
  therapeuticUses: string[];
  safetyPrecautions: string[];
  recommendedForm: string;
  harvestingSeason?: string;
  naturalHabitat?: string;
  doshaKarma?: string;
}>> = {
  neem: {
    en: {
      name: 'Neem',
      summary: 'Known as the "Universal Pharmacy of India", Neem is celebrated for its unmatched blood-purifying, anti-inflammatory, and skin-soothing properties.',
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
      doshaKarma: 'Pacifies Pitta & Kapha, increases Vata in excess.'
    },
    hi: {
      name: 'नीम',
      summary: 'भारत का "सार्वभौमिक औषधालय" माना जाने वाला नीम रक्त शोधन, सूजन कम करने और त्वचा रोगों को ठीक करने के लिए प्रसिद्ध है।',
      therapeuticUses: [
        'रक्त को शुद्ध करता है और मुंहासों को मिटाता है',
        'एंटीमाइक्रोबियल व डैंड्रफ से सुरक्षा प्रदान करता है',
        'दांतों और मसूड़ों के स्वास्थ्य को मजबूत करता है',
        'रक्त शर्करा (ब्लड शुगर) को नियंत्रित रखता है'
      ],
      safetyPrecautions: [
        'गर्भावस्था व स्तनपान के दौरान अत्यधिक सेवन से बचें',
        'रक्त शर्करा घटा सकता है; मधुमेह रोगियों को ध्यान रखना चाहिए',
        'छोटे बच्चों को आंतरिक रूप से न दें'
      ],
      recommendedForm: 'ताजा पत्तों का लेप, नीम तेल, या गुनगुना काढ़ा (क्वाथ)',
      doshaKarma: 'पित्त एवं कफ का शमन करता है, अत्यधिक प्रयोग से वात बढ़ाता है।'
    },
    te: {
      name: 'వేప',
      summary: 'భారతదేశపు "సార్వత్రిక ఔషధాలయం"గా పేరుగాంచిన వేప రక్తాన్ని శుద్ధి చేయడానికి, చర్మ సమస్యలను మరియు మంటను తగ్గించడానికి ఎంతో ప్రసిద్ధమైనది.',
      therapeuticUses: [
        'రక్తాన్ని శుద్ధి చేస్తుంది మరియు మొటిమలను నివారిస్తుంది',
        'చుండ్రు మరియు చర్మ వ్యాధుల నుండి రక్షిస్తుంది',
        'నోటి ఆరోగ్యం మరియు చిగుళ్లను బలోపేతం చేస్తుంది',
        'రక్తంలో చక్కెర స్థాయిలను క్రమబద్ధీకరిస్తుంది'
      ],
      safetyPrecautions: [
        'గర్భధారణ మరియు పాలిచ్చే సమయంలో అధిక మోతాదు తీసుకోవద్దు',
        'షుగర్ స్థాయిలు తగ్గే అవకాశం ఉంది; తగిన జాగ్రత్తలు వహించండి',
        'చిన్న పిల్లలకు నేరుగా ఇవ్వవద్దు'
      ],
      recommendedForm: 'తాజా ఆకుల పేస్ట్, నీమ్ ఆయిల్ లేదా గోరువెచ్చని కషాయం',
      doshaKarma: 'పిత్త మరియు కఫ దోషాలను తగ్గిస్తుంది, పరిమితికి మించితే వాతాన్ని పెంచుతుంది.'
    }
  },
  ashwagandha: {
    en: {
      name: 'Ashwagandha',
      summary: 'The flagship adaptogen of Ayurveda, Ashwagandha imparts the vitality and strength of a horse while soothing an overactive mind.',
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
      doshaKarma: 'Pacifies Vata & Kapha, mildly increases Pitta if overheated.'
    },
    hi: {
      name: 'अश्वगंधा',
      summary: 'आयुर्वेद का प्रमुख रसायन, अश्वगंधा तनाव को दूर करता है, शरीर को घोड़े जैसी शक्ति और मानसिक शांति प्रदान करता है।',
      therapeuticUses: [
        'कोर्टिसोल घटाकर तनाव व चिंता को शांत करता है',
        'गहरी नींद को बढ़ावा देता है और अनिद्रा दूर करता है',
        'शारीरिक सहनशक्ति और ओजस को बढ़ाता है',
        'प्रजनन क्षमता और ऊर्जा को मजबूत करता है'
      ],
      safetyPrecautions: [
        'हाइपरथायरायडिज्म या तेज बुखार में सावधानी बरतें',
        'गर्भावस्था के शुरुआती दिनों में वैद्य के परामर्श बिना न लें',
        'नींद और थायराइड दवाओं के साथ तालमेल रखें'
      ],
      recommendedForm: 'अश्वगंधा चूर्ण गुनगुने दूध, घी या शहद के साथ लें',
      doshaKarma: 'वात एवं कफ को शांत करता है, शरीर में पित्त बढ़ा सकता है।'
    },
    te: {
      name: 'అశ్వగంధ',
      summary: 'ఆయుర్వేదంలో అత్యంత శక్తివంతమైన రసాయన మూలిక అశ్వగంధ. ఇది మానసిక ఒత్తిడిని తగ్గించి, గుర్రం వంటి శక్తిని మరియు స్థిరత్వాన్ని ఇస్తుంది.',
      therapeuticUses: [
        'ఒత్తిడి మరియు ఆందోళనను తగ్గిస్తుంది',
        'మంచి గాఢ నిద్రను కలిగిస్తుంది',
        'శారీరక బలాన్ని మరియు ఓజస్సును పెంచుతుంది',
        'పునరుత్పత్తి వ్యవస్థను బలపరుస్తుంది'
      ],
      safetyPrecautions: [
        'థైరాయిడ్ లేదా తీవ్రమైన జ్వరం ఉన్నవారు వైద్యుల సలహా తీసుకోవాలి',
        'గర్భధారణ ప్రారంభంలో వైద్యుల పర్యవేక్షణ లేకుండా వాడవద్దు',
        'నిద్ర మాత్రలతో కలిపి జాగ్రత్తగా వాడాలి'
      ],
      recommendedForm: 'రాత్రి వేళ గోరువెచ్చని పాలు, నెయ్యి లేదా తేనెతో చూర్ణం తీసుకోవాలి',
      doshaKarma: 'వాత మరియు కఫ దోషాలను సమతుల్యం చేస్తుంది.'
    }
  },
  tulsi: {
    en: {
      name: 'Tulsi (Holy Basil)',
      summary: 'Revered as the "Queen of Herbs", Tulsi clears Kapha and Vata congestion, fortifying the respiratory system and boosting mental balance.',
      therapeuticUses: [
        'Potent adaptogenic shield against seasonal cough & cold',
        'Opens bronchia and thins respiratory mucus',
        'Elevates mood and combats everyday mental fatigue',
        'Supports healthy digestion and liver function'
      ],
      safetyPrecautions: [
        'May mildly thin blood; pause before planned surgical procedures',
        'Avoid excessive consumption during active high Pitta heat spells'
      ],
      recommendedForm: 'Fresh leaf tea (Kwatha) or warm infusion with honey',
      doshaKarma: 'Pacifies Kapha & Vata, slightly increases Pitta.'
    },
    hi: {
      name: 'तुलसी',
      summary: 'जड़ी-बूटियों की रानी मानी जाने वाली तुलसी कफ और वात दोष को शांत करती है, फेफड़ों और इम्युनिटी को मजबूत बनाती है।',
      therapeuticUses: [
        'सर्दी, खांसी और मौसमी बीमारियों से बचाव',
        'श्वसन नली को खोलती है और बलगम को साफ करती है',
        'मानसिक थकान और तनाव को दूर करती है',
        'पाचन व लीवर स्वास्थ्य में सुधार करती है'
      ],
      safetyPrecautions: [
        'रक्त को हल्का पतला कर सकती है; सर्जरी से पूर्व अत्यधिक सेवन न करें',
        'पित्त प्रकोप या अत्यधिक गर्मी में संतुलित मात्रा लें'
      ],
      recommendedForm: 'तुलसी की पत्तियों की चाय या शहद के साथ काढ़ा',
      doshaKarma: 'कफ एवं वात को शांत करती है, हल्का पित्त बढ़ा सकती है।'
    },
    te: {
      name: 'తులసి',
      summary: 'మూలికల రాణిగా పిలువబడే తులసి రోగనిరోధక శక్తిని పెంచి, శ్వాసకోశ వ్యవస్థను మరియు మానసిక ప్రశాంతతను పెంపొందిస్తుంది.',
      therapeuticUses: [
        'జలుబు, దగ్గు మరియు శ్వాసకోశ సమస్యల నుండి ఉపశమనం',
        'శ్వాసనాళాలను శుభ్రపరిచి శ్లేష్మాన్ని తగ్గిస్తుంది',
        'మానసిక ప్రశాంతతను మరియు ఉత్సాహాన్ని ఇస్తుంది',
        'జీర్ణక్రియను మెరుగుపరుస్తుంది'
      ],
      safetyPrecautions: [
        'రక్తాన్ని సన్నగిల్లేలా చేసే గుణం ఉంది; సర్జరీకి ముందు జాగ్రత్త',
        'అధిక వేడి ఉన్న సమయాల్లో మితంగా వాడాలి'
      ],
      recommendedForm: 'తులసి ఆకుల టీ లేదా తేనెతో కలిపిన కషాయం',
      doshaKarma: 'కఫ మరియు వాత దోషాలను తగ్గించి ఇమ్యూనిటీ పెంచుతుంది.'
    }
  },
  brahmi: {
    en: {
      name: 'Brahmi',
      summary: 'The premier Medhya Rasayana (brain tonic) of Ayurveda, Brahmi nourishes nerve cells, sharpens memory, and restores inner peace.',
      therapeuticUses: [
        'Enhances memory retention, focus, and cognitive learning',
        'Cools the nervous system, reducing mental hyperactivity',
        'Relieves chronic tension headaches and mental fatigue',
        'Promotes shiny, strong hair growth when applied topically'
      ],
      safetyPrecautions: [
        'May cause mild nausea if consumed on a completely empty stomach',
        'Use cautiously if taking prescription sedative medications'
      ],
      recommendedForm: 'Fresh juice (Swarasa), Brahmi Ghrita (medicated ghee), or powder',
      doshaKarma: 'Tridoshic — pacifies Vata, Pitta, and Kapha equally.'
    },
    hi: {
      name: 'ब्राह्मी',
      summary: 'मस्तिष्क के लिए सर्वश्रेष्ठ मेध्य रसायन, ब्राह्मी न्यूरॉन्स को पोषण देती है, याददाश्त बढ़ाती है और मानसिक शांति देती है।',
      therapeuticUses: [
        'याददाश्त, एकाग्रता और सीखने की क्षमता बढ़ाती है',
        'तंत्रिका तंत्र को ठंडक व पोषण देती है',
        'मानसिक तनाव, सिरदर्द और थकान दूर करती है',
        'बालों के झड़ने को रोकती है और मजबूती देती है'
      ],
      safetyPrecautions: [
        'बिल्कुल खाली पेट लेने से हल्की मिचली हो सकती है',
        'शामक (नींद की) दवाओं के साथ चिकित्सक की सलाह लें'
      ],
      recommendedForm: 'ब्राह्मी स्वरस (रस), ब्राह्मी घृत (घी) या चूर्ण',
      doshaKarma: 'त्रिदोषनाशक — वात, पित्त और कफ तीनों को संतुलित करती है।'
    },
    te: {
      name: 'బ్రాహ్మి',
      summary: 'మెదడు మరియు జ్ఞాపకశక్తికి అత్యుత్తమ మేధ్య రసాయనం బ్రాహ్మి. ఇది ఏకాగ్రతను, నరాల బలాన్ని మరియు ప్రశాంతతను పెంచుతుంది.',
      therapeuticUses: [
        'జ్ఞాపకశక్తి మరియు ఏకాగ్రతను పెంచుతుంది',
        'మానసిక ఒత్తిడిని మరియు ఆందోళనను తగ్గిస్తుంది',
        'నరాల వ్యవస్థను చల్లబరుస్తుంది',
        'జుట్టు రాలడాన్ని నివారించి బలాన్ని ఇస్తుంది'
      ],
      safetyPrecautions: [
        'పూర్తి పరగడుపున తింటే తేలికపాటి వికారం రావచ్చు',
        'సైకియాట్రిక్ మందులతో కలిపి జాగ్రత్తగా వాడాలి'
      ],
      recommendedForm: 'బ్రాహ్మి రసం, ఘృతం (నెయ్యి) లేదా చూర్ణం',
      doshaKarma: 'త్రిదోష సమతుల్యత సాధిస్తుంది.'
    }
  },
  shatavari: {
    en: {
      name: 'Shatavari',
      summary: 'The ultimate tonic for female health and longevity, Shatavari translates to "she who possesses a hundred husbands".',
      therapeuticUses: [
        'Balances female hormones across menstruation and menopause',
        'Enhances natural lactation and postpartum vitality',
        'Cools gastric hyperacidity and stomach ulceration',
        'Deeply hydrates tissues and strengthens immunity (Ojas)'
      ],
      safetyPrecautions: [
        'Avoid if you have estrogen-sensitive health conditions',
        'May cause mild weight gain or dampness in high Kapha states'
      ],
      recommendedForm: 'Root powder (Churna) simmered with warm milk and cardamom',
      doshaKarma: 'Pacifies Pitta & Vata, slightly increases Kapha.'
    },
    hi: {
      name: 'शतावरी',
      summary: 'महिलाओं के स्वास्थ्य के लिए परम अमृत औषधि, शतावरी हार्मोनल संतुलन, ऊर्जा और जलग्रहण क्षमता को बढ़ाती है।',
      therapeuticUses: [
        'हार्मोनल संतुलन और मासिक धर्म चक्र को नियमित करती है',
        'प्रजनन क्षमता और स्तनपान में सुधार करती है',
        'एसिडिटी, पेट की जलन और अल्सर में राहत देती है',
        'शरीर को ठंडक और ओजस प्रदान करती है'
      ],
      safetyPrecautions: [
        'एस्ट्रोजन-संवेदनशील स्थितियों में डॉक्टर से सलाह लें',
        'कफ की अधिकता में संतुलित मात्रा लें'
      ],
      recommendedForm: 'शतावरी चूर्ण को गुनगुने दूध और इलायची के साथ लें',
      doshaKarma: 'पित्त एवं वात को शांत करती है, हल्का कफ बढ़ा सकती है।'
    },
    te: {
      name: 'శతావరి',
      summary: 'స్త్రీల ఆరోగ్యానికి అమృతం వంటిది శతావరి. ఇది హార్మోన్ల సమతుల్యతను, శక్తిని మరియు రోగనిరోधక శక్తిని పెంచుతుంది.',
      therapeuticUses: [
        'హార్మోన్ల సమతుల్యతను మరియు రుతుచక్రాన్ని క్రమబద్ధీకరిస్తుంది',
        'పాలిచ్చే తల్లులకు పాలు మరియు శక్తిని పెంచుతుంది',
        'ఎసిడిటీ మరియు కడుపు మంటను తగ్గిస్తుంది',
        'శరీరానికి చలువ చేసి ఇమ్యూనిటీ పెంచుతుంది'
      ],
      safetyPrecautions: [
        'ఈస్ట్రోజెన్ సున్నితత్వం ఉన్నవారు వైద్యుల సలహా తీసుకోవాలి',
        'కఫం ఎక్కువగా ఉన్నవారు మితంగా వాడాలి'
      ],
      recommendedForm: 'శతావరి చూర్ణాన్ని పాలు మరియు యాలకులతో తీసుకోవాలి',
      doshaKarma: 'పిత్త మరియు వాత దోషాలను శాంతింపజేస్తుంది.'
    }
  },
  triphala: {
    en: {
      name: 'Triphala',
      summary: 'The legendary combination of Haritaki, Bibhitaki, and Amalaki, Triphala rejuvenates the entire digestive tract.',
      therapeuticUses: [
        'Gently cleanses colon and relieves chronic constipation',
        'Scavenges free radicals and supports eye health',
        'Improves nutrient absorption and digestion (Agni)',
        'Supports weight management and detox'
      ],
      safetyPrecautions: [
        'May cause loose stools if taken in high doses',
        'Avoid during acute diarrhea or early pregnancy'
      ],
      recommendedForm: 'Churna with warm water before bed',
      doshaKarma: 'Tridoshic — restores equilibrium across Vata, Pitta, Kapha.'
    },
    hi: {
      name: 'त्रिफला',
      summary: 'हरड़, बहेड़ा और आंवला का दिव्य मिश्रण, जो पाचन तंत्र की सफाई और कायाकल्प के लिए प्रसिद्ध है।',
      therapeuticUses: [
        'कब्ज दूर करता है और आंतों की सफाई करता है',
        'आंखों की रोशनी और त्वचा के लिए लाभदायक',
        'पाचन शक्ति और पोषण अवशोषण को बढ़ाता है',
        'वजन घटाने व डिटॉक्स में सहायक'
      ],
      safetyPrecautions: [
        'अधिक मात्रा में दस्त हो सकते हैं',
        'अतिसार (डायरिया) व गर्भावस्था में बचें'
      ],
      recommendedForm: 'रात को सोने से पहले गुनगुने पानी के साथ चूर्ण',
      doshaKarma: 'त्रिदोषनाशक — वात, पित्त और कफ तीनों को संतुलित करता है।'
    },
    te: {
      name: 'త్రిఫల',
      summary: 'కరక్కాయ, తానికాయ మరియు ఉసిరికాయల కలయిక త్రిఫల. ఇది జీర్ణక్రియను, ప్రేగుల ఆరోగ్యాన్ని మరియు కంటి చూపును మెరుగుపరుస్తుంది.',
      therapeuticUses: [
        'జీర్ణక్రియను మెరుగుపరుస్తుంది మరియు మలబద్ధకాన్ని నివారిస్తుంది',
        'కంటి చూపుకు మరియు చర్మానికి చాలా మంచిది',
        'శరీరంలోని వ్యర్థాలను (ఆమము) తొలగిస్తుంది',
        'బరువు తగ్గడానికి మరియు డిటాక్స్‌కు తోడ్పడుతుంది'
      ],
      safetyPrecautions: [
        'అధిక మోతాదు వల్ల విరేచనాలు కావచ్చు',
        'విరేచనాలు ఉన్నప్పుడు మరియు గర్భధారణలో వాడవద్దు'
      ],
      recommendedForm: 'రాత్రి పడుకునే ముందు గోరువెచ్చని నీటితో తీసుకోవాలి',
      doshaKarma: 'త్రిదోష సమతుల్యత కలిగిస్తుంది.'
    }
  },
  giloy: {
    en: {
      name: 'Giloy (Guduchi)',
      summary: 'Known as "Amrita" (Nectar of Immortality), Giloy clears chronic pyrexia, boosts blood platelets, and purifies the liver.',
      therapeuticUses: [
        'Fights recurrent fevers and viral infections',
        'Boosts blood platelet count and immune response',
        'Detoxifies liver and purifies blood',
        'Relieves gout and joint inflammation'
      ],
      safetyPrecautions: [
        'Monitor blood sugar levels if taking diabetes medications',
        'Autoimmune condition patients should consult a physician'
      ],
      recommendedForm: 'Juice (Swarasa), Kwatha, or Ghanvati tablets',
      doshaKarma: 'Tridoshic — balances Vata, Pitta, Kapha.'
    },
    hi: {
      name: 'गिलोय (गुडूची)',
      summary: '"अमृता" के नाम से प्रसिद्ध, गिलोय पुराने बुखार को मिटाती है, प्लेटलेट्स बढ़ाती है और लीवर को डिटॉक्स करती है।',
      therapeuticUses: [
        'पुराने व आवर्ती बुखार से राहत देती है',
        'प्लेटलेट्स और इम्युनिटी को तेजी से बढ़ाती है',
        'लीवर और रक्त का शोधन करती है',
        'जोड़ों के दर्द और गठिया में लाभप्रद'
      ],
      safetyPrecautions: [
        'शुगर की दवा ले रहे मरीज ब्लड शुगर चेक करते रहें',
        'ऑटोइम्यून रोगियों को डॉक्टर की सलाह लेनी चाहिए'
      ],
      recommendedForm: 'गिलोय स्वरस (रस), काढ़ा या घनवटी की गोली',
      doshaKarma: 'त्रिदोषनाशक — तीनों दोषों को शांत करती है।'
    },
    te: {
      name: 'తిప్పతీగ (గూడుచి)',
      summary: '"అమృతం" అని పిలువబడే తిప్పతీగ దీర్ఘకాలిక జ్వరాలను తగ్గించి, రోగనిరోధక శక్తిని మరియు ప్లేట్‌లెట్స్‌ను పెంచుతుంది.',
      therapeuticUses: [
        'దీర్ఘకాలిక జ్వరాలు మరియు ఇన్ఫెక్షన్లను నివారిస్తుంది',
        'ప్లేట్‌లెట్స్ సంఖ్యను మరియు ఇమ్యూనిటీని పెంచుతుంది',
        'లివర్‌ను మరియు రక్తాన్ని శుద్ధి చేస్తుంది',
        'కీళ్ల నొప్పులు మరియు గౌట్ వ్యాధి నుండి ఉపశమనం ఇస్తుంది'
      ],
      safetyPrecautions: [
        'షుగర్ మందులు వాడుతున్నవారు షుగర్ లెవల్స్ గమనించాలి',
        'ఆటోఇమ్యూన్ వ్యాధులు ఉన్నవారు వైద్యుల సలహా తీసుకోవాలి'
      ],
      recommendedForm: 'తిప్పతీగ రసం, కషాయం లేదా ఘనవటి మాత్రలు',
      doshaKarma: 'త్రిదోషాలను సమతుల్యం చేస్తుంది.'
    }
  },
  turmeric: {
    en: {
      name: 'Turmeric (Haridra)',
      summary: 'Ayurveda’s legendary golden spice, Haridra is a powerful natural anti-inflammatory, wound healer, and skin enhancer.',
      therapeuticUses: [
        'Reduces joint pain and systemic inflammation',
        'Accelerates wound healing and skin radiance',
        'Supports healthy bile flow and liver health',
        'Strengthens respiratory resistance'
      ],
      safetyPrecautions: [
        'Avoid excessive concentrated doses if having gallstones',
        'May interact with high-dose blood thinners'
      ],
      recommendedForm: 'Golden Milk (Haldi Doodh) with a pinch of black pepper',
      doshaKarma: 'Pacifies Kapha & Pitta, balances Vata in moderate doses.'
    },
    hi: {
      name: 'हल्दी (हरिद्रा)',
      summary: 'आयुर्वेद का स्वर्णिम प्राकृतिक एंटीबायोटिक, जो सूजन कम करने, घाव भरने और त्वचा के निखार के लिए सर्वोत्तम है।',
      therapeuticUses: [
        'जोड़ों का दर्द और अंदरूनी सूजन कम करती है',
        'घाव सुखाती है और त्वचा में चमक लाती है',
        'पित्त और लीवर के कार्य को सुधारती है',
        'सांस संबंधी संक्रमणों से रक्षा करती है'
      ],
      safetyPrecautions: [
        'पित्ताशय की पथरी में अत्यधिक सेवन न करें',
        'खून पतला करने वाली दवाओं के साथ ध्यान रखें'
      ],
      recommendedForm: 'एक चुटकी काली मिर्च के साथ सुनहरी हल्दी दूध (गोल्डन मिल्क)',
      doshaKarma: 'कफ एवं पित्त को शांत करती है।'
    },
    te: {
      name: 'పసుపు (హరిద్ర)',
      summary: 'ఆయుర్వేదంలో బంగారు ఔషధంగా పరిగణించబడే పసుపు మంటను తగ్గించడానికి, గాయాలను మాన్పడానికి మరియు చర్మ సౌందర్యానికి ప్రసిద్ధి చెందింది.',
      therapeuticUses: [
        'కీళ్ల నొప్పులు మరియు శోధ (మంట)ను తగ్గిస్తుంది',
        'గాయాలను త్వరగా మాన్పుతుంది, చర్మానికి కాంతినిస్తుంది',
        'లివర్ మరియు పిత్తాశయ ఆరోగ్యాన్ని పెంచుతుంది',
        'జలుబు, ఇన్ఫెక్షన్ల నుండి కాపాడుతుంది'
      ],
      safetyPrecautions: [
        'పిత్తాశయంలో రాళ్లు ఉన్నవారు అధిక మోతాదు తీసుకోవద్దు',
        'రక్తం పల్చబడే మందులతో జాగ్రత్తగా వాడాలి'
      ],
      recommendedForm: 'చిటికెడు మిరియాల పొడితో గోరువెచ్చని పసుపు పాలు',
      doshaKarma: 'కఫ మరియు పిత్త దోషాలను సమతుల్యం చేస్తుంది.'
    }
  }
};
