import { Language } from './translations';

export const HABITS_UI: Record<Language, {
  tagline: string;
  title: string;
  subtitle: string;
  streakLabel: string;
  progressLabel: string;
  tabDinacharya: string;
  tabRitucharya: string;
  completionStatus: string;
  howToPerformLabel: string;
  keyBenefitsLabel: string;
  markCompletedBtn: string;
  markUncompletedBtn: string;
  todaysHabitsTitle: string;
  todaysHabitsSub: string;
  focusLabel: string;
  doshaEffectLabel: string;
  recommendedFoodsLabel: string;
  foodsToAvoidLabel: string;
  lifestyleTipLabel: string;
  seasonalInfusionLabel: string;
  dominantDoshaLabel: string;
}> = {
  en: {
    tagline: 'Ayurvedic Lifestyle Science',
    title: 'Dinacharya & Ritucharya Planner ☀️',
    subtitle: 'Align your body with circadian rhythms (Dinacharya) and seasonal natural shifts (Ritucharya) to maintain steady Agni, immune strength, and mental tranquility.',
    streakLabel: 'Habit Streak',
    progressLabel: "Today's Progress",
    tabDinacharya: 'Dinacharya (Daily Habits)',
    tabRitucharya: 'Ritucharya (Seasonal Living)',
    completionStatus: 'Completion Status',
    howToPerformLabel: 'How to Perform:',
    keyBenefitsLabel: 'Key Health Benefits:',
    markCompletedBtn: 'Mark Habit as Completed Today',
    markUncompletedBtn: 'Mark as Uncompleted',
    todaysHabitsTitle: "Today's Wellness Habits",
    todaysHabitsSub: 'Tap habits as you complete them throughout the morning, afternoon, and evening.',
    focusLabel: 'Primary Focus',
    doshaEffectLabel: 'Dosha & Seasonal Effect on Agni:',
    recommendedFoodsLabel: 'Recommended Foods & Tastes',
    foodsToAvoidLabel: 'Foods to Minimize or Avoid',
    lifestyleTipLabel: 'Recommended Lifestyle Rituals',
    seasonalInfusionLabel: 'Seasonal Signature Herbal Infusion',
    dominantDoshaLabel: 'Dominant Dosha'
  },
  hi: {
    tagline: 'आयुर्वेदिक जीवनशैली विज्ञान',
    title: 'दिनचर्या एवं ऋतुचर्या योजना ☀️',
    subtitle: 'शरीर को दैनिक सर्केडियन लय (दिनचर्या) और मौसमी बदलावों (ऋतुचर्या) के साथ जोड़ें ताकि जठराग्नि, प्रतिरक्षा और मानसिक शांति बनी रहे।',
    streakLabel: 'नियमितता (स्ट्राइक)',
    progressLabel: 'आज की प्रगति',
    tabDinacharya: 'दिनचर्या (दैनिक आदतें)',
    tabRitucharya: 'ऋतुचर्या (मौसमी आहार-विहार)',
    completionStatus: 'पूर्णता की स्थिति',
    howToPerformLabel: 'करने का सही तरीका:',
    keyBenefitsLabel: 'प्रमुख स्वास्थ्य लाभ:',
    markCompletedBtn: 'आज यह आदत पूर्ण के रूप में चिन्हित करें',
    markUncompletedBtn: 'अपूर्ण के रूप में चिन्हित करें',
    todaysHabitsTitle: 'आज की स्वास्थ्य आदतें',
    todaysHabitsSub: 'प्रातः, दोपहर और संध्या काल में जैसे-जैसे आदतें पूरी हों, टिक करें।',
    focusLabel: 'मुख्य उद्देश्य',
    doshaEffectLabel: 'दोष एवं जठराग्नि पर मौसमी प्रभाव:',
    recommendedFoodsLabel: 'अनुशंसित आहार एवं रस',
    foodsToAvoidLabel: 'परहेज योग्य या सीमित आहार',
    lifestyleTipLabel: 'अनुशंसित जीवनशैली नियम',
    seasonalInfusionLabel: 'मौसमी विशेष काढ़ा / हर्बल चाय',
    dominantDoshaLabel: 'प्रधान दोष'
  },
  te: {
    tagline: 'ఆయుర్వేద జీవనశైలి విజ్ఞానం',
    title: 'దినచర్య & ఋతుచర్య ప్లానర్ ☀️',
    subtitle: 'శరీరాన్ని రోజువారీ దినచర్య మరియు రుతువుల మార్పులకు అనుగుణంగా మార్చుకోవడం ద్వారా జఠరాగ్ని, ఇమ్యూనిటీ మరియు ప్రశాంతతను పొందండి.',
    streakLabel: 'సమయపాలన (స్ట్రీక్)',
    progressLabel: 'నేటి పురోగతి',
    tabDinacharya: 'దినచర్య (రోజువారీ అలవాట్లు)',
    tabRitucharya: 'ఋతుచర్య (రుతువుల జీవనం)',
    completionStatus: 'పూర్తయిన స్థితి',
    howToPerformLabel: 'ఆచరించే విధానం:',
    keyBenefitsLabel: 'ముఖ్య ఆరోగ్య ప్రయోజనాలు:',
    markCompletedBtn: 'ఈ అలవాటు పూర్తయినట్లు మార్క్ చేయండి',
    markUncompletedBtn: 'రద్దు చేయండి',
    todaysHabitsTitle: 'నేటి ఆరోగ్య అలవాట్లు',
    todaysHabitsSub: 'ఉదయం, మధ్యాహ్నం మరియు సాయంత్రం అలవాట్లను పూర్తి చేయగానే టిక్ చేయండి.',
    focusLabel: 'ప్రధాన లక్ష్యం',
    doshaEffectLabel: 'దోషం & జఠరాగ్నిపై రుతువు ప్రభావం:',
    recommendedFoodsLabel: 'తినవలసిన ఆహారాలు & రుచులు',
    foodsToAvoidLabel: 'తగ్గించవలసిన ఆహారాలు',
    lifestyleTipLabel: 'సూచించిన జీవనశైలి నియమాలు',
    seasonalInfusionLabel: 'రుతువుల ప్రత్యేక మూలికా టీ',
    dominantDoshaLabel: 'ప్రధాన దోషం'
  }
};

export const TIME_CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'All': { en: 'All', hi: 'सभी', te: 'అన్నీ' },
  'Morning': { en: 'Morning', hi: 'प्रातःकाल', te: 'ఉదయం' },
  'Afternoon': { en: 'Afternoon', hi: 'मध्याह्न', te: 'మధ్యాహ్నం' },
  'Evening': { en: 'Evening', hi: 'सायंकाल', te: 'సాయంత్రం' },
  'Night': { en: 'Night', hi: 'रात्रि', te: 'రాత్రి' }
};

export const LOCALIZED_HABITS_DATA: Record<string, Record<Language, {
  title: string;
  description: string;
  benefits: string[];
  howToPerform: string;
}>> = {
  ushapan: {
    en: {
      title: 'Ushapan (Warm Water Intake)',
      description: 'Drinking 1 to 2 glasses of warm or copper-stored water immediately upon waking to flush toxins (Ama).',
      benefits: [
        'Stimulates peristalsis and gastrocolic reflex',
        'Flushes accumulated digestive metabolic waste',
        'Hydrates internal organs gently without dampening digestive fire (Agni)'
      ],
      howToPerform: 'Sit comfortably. Sip 250-500ml of warm water or copper-infused water slowly before brushing teeth.'
    },
    hi: {
      title: 'उषापान (प्रातः गुनगुना जल सेवन)',
      description: 'प्रातः सोकर उठते ही 1 से 2 गिलास गुनगुना या तांबे के बर्तन का जल पीना ताकि शरीर से विषैले तत्व (आम) बाहर निकल सकें।',
      benefits: [
        'पाचन तंत्र को सक्रिय करता है और मल त्याग में मदद करता है',
        'रात्रि भर जमे विषैले टॉक्सिन्स (आम) को बाहर निकालता है',
        'जठराग्नि को मंद किए बिना अंगों को धीरे-धीरे हाइड्रेट करता है'
      ],
      howToPerform: 'शांति से बैठें। ब्रश करने से पूर्व 250-500 मिलीलीटर गुनगुना या तांबे का पानी घूंट-घूंट करके पिएं।'
    },
    te: {
      title: 'ఉషాపాణం (గోరువెచ్చని నీరు త్రాగడం)',
      description: 'ఉదయాన్నే నిద్రలేవగానే 1 నుండి 2 గ్లాసుల గోరువెచ్చని లేదా రాగి పాత్ర నీటిని త్రాగడం వల్ల శరీరంలో వ్యర్థాలు (ఆమము) తొలగిపోతాయి.',
      benefits: [
        'జీర్ణ వ్యవస్థను చైతన్యవంతం చేసి మలబద్ధకాన్ని నివారిస్తుంది',
        'రాత్రి వేళల్లో పేరుకుపోయిన వ్యర్థాలను బయటకు పంపుతుంది',
        'జఠరాగ్నిని దెబ్బతీయకుండా అవయవాలకు నీటి శాతాన్ని ఇస్తుంది'
      ],
      howToPerform: 'ప్రశాంతంగా కూర్చుని, దంతధావనం కంటే ముందు 250-500 మి.లీ గోరువెచ్చని నీటిని మెల్లగా కొద్ది కొద్దిగా త్రాగాలి.'
    }
  },
  jihva_nirlekhana: {
    en: {
      title: 'Jihva Nirlekhana (Tongue Scraping)',
      description: 'Scraping the coating off the tongue with a copper or stainless steel tongue cleaner.',
      benefits: [
        'Removes overnight toxic coating (Ama)',
        'Prevents bad breath (halitosis) and bacteria buildup',
        'Enhances taste bud sensitivity and digestion signals'
      ],
      howToPerform: 'Extend tongue. Place copper scraper gently at back of tongue and pull forward 5 to 7 times.'
    },
    hi: {
      title: 'जिह्वा निर्लेखन (जीभ छीलना)',
      description: 'तांबे या स्टेनलेस स्टील के जीभी (टंग क्लीनर) से जीभ पर जमी सफेद परत को साफ करना।',
      benefits: [
        'रात भर जीभ पर जमी टॉक्सिक परत (आम) को हटाता है',
        'मुंह की बदबू और हानिकारक बैक्टीरिया से मुक्ति दिलाता है',
        'स्वाद ग्रंथियों को संवेदनशील बनाकर पाचन संकेतों को बेहतर करता है'
      ],
      howToPerform: 'जीभ बाहर निकालें। तांबे की जीभी को जीभ के पिछले हिस्से पर रखकर 5 से 7 बार आगे की ओर धीरे से खींचें।'
    },
    te: {
      title: 'జిహ్వా నిర్లేఖనం (నాలుక శుభ్రపరచడం)',
      description: 'రాగి లేదా స్టీల్ టంగ్ క్లీనర్‌తో నాలుకపై ఉన్న తెల్లటి పొరను తొలగించడం.',
      benefits: [
        'రాత్రివేళ నాలుకపై చేరిన విష పదార్థాలను (ఆమము) తొలగిస్తుంది',
        'నోటి దుర్వాసన మరియు బ్యాక్టీరియాను నివారిస్తుంది',
        'రుచి గ్రంథులను ఉత్తేజపరచి జీర్ణక్రియకు సహాయపడుతుంది'
      ],
      howToPerform: 'నాలుకను బయటకు చాచి, రాగి క్లీనర్‌ను నాలుక వెనుక భాగాన ఉంచి 5 నుండి 7 సార్లు మెల్లగా ముందుకు లాగాలి.'
    }
  },
  gandusha: {
    en: {
      title: 'Oil Pulling (Gandusha / Kavala)',
      description: 'Swishing warm sesame or virgin coconut oil in mouth for 5-10 minutes.',
      benefits: [
        'Strengthens teeth roots, gums, and jaw bone',
        'Draws out lipid-soluble oral toxins',
        'Prevents cavity formation and dry mouth'
      ],
      howToPerform: 'Take 1 tablespoon warm organic sesame or coconut oil. Swish continuously for 5-10 mins. Spit in trash (never sink). Rinse with warm water.'
    },
    hi: {
      title: 'गंडूष / कवल (ऑयल पुलिंग)',
      description: 'मुंह में 5-10 मिनट तक गुनगुना तिल या नारियल तेल घुमाना।',
      benefits: [
        'दांतों की जड़ों, मसूड़ों और जबड़े की हड्डियों को मजबूत करता है',
        'मुंह के अंदर जमा फैट-घुलनशील टॉक्सिन्स को खींच निकालता है',
        'कैविटी और मुंह के सूखने की समस्या से बचाता है'
      ],
      howToPerform: '1 चम्मच गुनगुना तिल या नारियल तेल लें। 5-10 मिनट मुंह में घुमाएं। फिर कचरे के डिब्बे में थूक दें और गुनगुने पानी से कुल्ला करें।'
    },
    te: {
      title: 'గండూషం / కవలం (ఆయిల్ పుల్లింగ్)',
      description: 'గోరువెచ్చని నువ్వుల నూనె లేదా కొబ్బరి నూనెను 5-10 నిమిషాల పాటు నోటిలో తిప్పడం.',
      benefits: [
        'పళ్ల వేళ్లను, చిగుళ్లను మరియు దవడ ఎముకలను బలపరుస్తుంది',
        'నోటిలోని కొవ్వులో కరిగే విష పదార్థాలను బయటకు తీస్తుంది',
        'దంత క్షయం మరియు నోరు ఎండిపోవడాన్ని నివారిస్తుంది'
      ],
      howToPerform: '1 స్పూన్ గోరువెచ్చని నూనెను నోటిలో ఉంచుకుని 5-10 నిమిషాలు తిప్పాలి. డస్ట్‌బిన్‌లో ఉమ్మేసి గోరువెచ్చని నీటితో పుక్కిలించాలి.'
    }
  },
  abhyanga: {
    en: {
      title: 'Self-Massage (Abhyanga)',
      description: 'Anointing the body with warm sesame, coconut, or Mahanarayana herbal oil.',
      benefits: [
        'Lubricates joints and relaxes nervous system',
        'Improves lymphatic drainage and circulation',
        'Delays physical aging and softens skin'
      ],
      howToPerform: 'Warm 2 tbsp oil. Massage in long strokes over long bones and circular strokes over joints for 10-15 mins before warm bath.'
    },
    hi: {
      title: 'अभ्यंग (गुनगुने तेल से स्व-मालिश)',
      description: 'स्नान से पूर्व गुनगुने तिल, नारियल या आयुर्वेदिक तेल से शरीर की मालिश करना।',
      benefits: [
        'जोड़ों में चिकनाई लाता है और तंत्रिका तंत्र को आराम देता है',
        'रक्त संचार और लिम्फैटिक ड्रेनेज में सुधार करता है',
        'त्वचा को कोमल बनाता है और उम्र के असर को धीमा करता है'
      ],
      howToPerform: '2 चम्मच तेल गुनगुना करें। स्नान से 10-15 मिनट पहले लंबी हड्डियों पर लंबे स्ट्रोक और जोड़ों पर गोलाकार मालिश करें।'
    },
    te: {
      title: 'అభ్యంగనం (గోరువెచ్చని నూనె మర్దన)',
      description: 'స్నానానికి ముందు గోరువెచ్చని నువ్వుల నూనె లేదా కొబ్బరి నూనెతో ఒంటికి మర్దన చేయడం.',
      benefits: [
        'కీళ్లకు నునుపుదనాన్ని ఇచ్చి నరాల వ్యవస్థను ప్రశాంతపరుస్తుంది',
        'రక్తప్రసరణను మరియు లింఫాటిక్ వ్యవస్థను మెరుగుపరుస్తుంది',
        'చర్మాన్ని మృదువుగా మార్చి యవ్వనాన్ని కాపాడుతుంది'
      ],
      howToPerform: '2 స్పూన్ల నూనెను వెచ్చజేసి, స్నానానికి 10-15 నిమిషాల ముందు కాళ్లు చేతులపై నిలువుగా, కీళ్లపై గుండ్రంగా మర్దన చేయాలి.'
    }
  },
  pranayama: {
    en: {
      title: 'Pranayama & Meditation',
      description: 'Breathing exercises like Anulom Vilom and Kapalabhati followed by silent mindfulness.',
      benefits: [
        'Balances Prana (life force energy) across left and right channels',
        'Reduces morning cortisol and mental fog',
        'Sharpens focus for the day ahead'
      ],
      howToPerform: 'Sit upright in Sukhasana. Practice 10 mins Anulom Vilom (alternate nostril breathing) followed by 5 mins silent meditation.'
    },
    hi: {
      title: 'प्राणायाम एवं ध्यान',
      description: 'अनुलोम-विलोम और कपालभाति जैसे श्वास अभ्यास के बाद शांत ध्यान लगाना।',
      benefits: [
        'प्राण ऊर्जा को नाड़ियों में संतुलित करता है',
        'प्रातःकालीन तनाव और मानसिक धुंधलेपन को दूर करता है',
        'दिन भर के लिए एकाग्रता और स्पष्टता प्रदान करता है'
      ],
      howToPerform: 'सुखासन में सीधे बैठें। 10 मिनट अनुलोम-विलोम और 5 मिनट शांत ध्यान का अभ्यास करें।'
    },
    te: {
      title: 'ప్రాణాయామం & ధ్యానం',
      description: 'అనులోమ విలోమ మరియు కపాలభాతి శ్వాస వ్యాయామాలు, ఆ తర్వాత నిశ్శబ్ద ధ్యానం.',
      benefits: [
        'ప్రాణ శక్తిని శరీరం అంతటా సమతుల్యం చేస్తుంది',
        'ఉదయపు ఒత్తిడిని మరియు మానసిక అలసటను తొలగిస్తుంది',
        'దినమంతటికి కావలసిన ఏకాగ్రతను అందిస్తుంది'
      ],
      howToPerform: 'సుఖాసనంలో తిన్నగా కూర్చుని 10 నిమిషాలు అనులోమ విలోమ ప్రాణాయామం, 5 నిమిషాలు ప్రశాంతంగా ధ్యానం చేయాలి.'
    }
  }
};

export const LOCALIZED_SEASONS_DATA: Record<string, Record<Language, {
  name: string;
  doshaEffect: string;
  primaryFocus: string;
  recommendedFoods: string[];
  foodsToAvoid: string[];
  lifestyleTips: string[];
  herbalTea: string;
}>> = {
  summer: {
    en: {
      name: 'Summer (Greeshma Ritu)',
      doshaEffect: 'Pitta accumulates rapidly due to external heat. Digestive Agni weakens naturally.',
      primaryFocus: 'Cooling, hydration, and protecting digestive fire from overheating.',
      recommendedFoods: ['Sweet, juicy fruits (watermelon, mango, coconut water)', 'Cooling herbs (mint, coriander, fennel)', 'Ghee, milk, and mung dhal soups'],
      foodsToAvoid: ['Excessive chilies, garlic, and fried spicy foods', 'Fermented & salty pickles', 'Hot coffee or direct midday sun exposure'],
      lifestyleTips: ['Apply coconut oil or sandalwood paste on skin', 'Wear loose white cotton clothing', 'Enjoy gentle moonlight walks in evening'],
      herbalTea: 'Coriander, Cumin & Fennel (CCF) Iced Herbal Tea'
    },
    hi: {
      name: 'ग्रीष्म ऋतु (गर्मी का मौसम)',
      doshaEffect: 'बाहरी गर्मी से पित्त दोष तेजी से बढ़ता है। जठराग्नि स्वभावतः मंद हो जाती है।',
      primaryFocus: 'शरीर को शीतलता प्रदान करना, जलग्रहण और जठराग्नि की सुरक्षा।',
      recommendedFoods: ['मीठे रसीले फल (तरबूज, आम, नारियल पानी)', 'ठंडे मसाले (पुदीना, धनिया, सौंफ)', 'गाय का घी, दूध और मूंग दाल सूप'],
      foodsToAvoid: ['अत्यधिक मिर्च-मसाले, लहसुन व तला-भुना खाना', 'खट्टे व अत्यधिक नमकीन अचार', 'कड़ी धूप में घूमना व गर्म कॉफी'],
      lifestyleTips: ['त्वचा पर नारियल तेल या चंदन लेप लगाएं', 'सूती व ढीले हल्के कपड़े पहनें', 'संध्या समय चांदनी में टहलें'],
      herbalTea: 'धनिया, जीरा व सौंफ का शीतल हर्बल पेय'
    },
    te: {
      name: 'గ్రీష్మ రుతువు (వేసవి కాలం)',
      doshaEffect: 'వేడి వల్ల పిత్త దోషం త్వరగా పెరుగుతుంది. జీర్ణక్రియ (అగ్ని) సహజంగా మందగిస్తుంది.',
      primaryFocus: 'చలువ చేయడం, శరీరంలో నీటి శాతాన్ని కాపాడటం.',
      recommendedFoods: ['తీపి, రసమున్న పండ్లు (పుచ్చకాయ, మామిడి, కొబ్బరి నీళ్లు)', 'చలువ చేసే దనియాలు, సోంపు, పుదీనా', 'ఆవు నెయ్యి, పాలు, పెసరపప్పు చారు'],
      foodsToAvoid: ['అధిక కారం, వెల్లుల్లి, వేపుళ్లు', 'అధిక పులుపు, ఊరగాయలు', 'మధ్యాహ్నపు ఎండలో తిరగడం'],
      lifestyleTips: ['కొబ్బరి నూనె లేదా చందనం పూసుకోవాలి', 'తెల్లటి వదులైన నూలు దుస్తులు ధరించాలి', 'సాయంత్రం వెన్నెల నడక చేయాలి'],
      herbalTea: 'దనియాలు, జీలకర్ర, సోంపుతో చేసిన చల్లటి మూలికా టీ'
    }
  },
  monsoon: {
    en: {
      name: 'Monsoon (Varsha Ritu)',
      doshaEffect: 'Vata gets aggravated due to damp humidity, while digestive Agni reaches its lowest yearly strength.',
      primaryFocus: 'Pacifying Vata and kindling low digestive Agni with warm, light foods.',
      recommendedFoods: ['Warm cooked soups, thin kitchari, and old rice', 'Digestive spices (ginger, black pepper, cumin)', 'Boiled and cooled drinking water'],
      foodsToAvoid: ['Raw salads and uncooked leafy greens', 'Heavy dairy and curd at night', 'Daytime sleeping and damp clothes'],
      lifestyleTips: ['Drink only boiled water with ginger', 'Keep feet dry and warm', 'Perform light indoor stretching'],
      herbalTea: 'Dry Ginger, Tulsi & Black Pepper Infusion'
    },
    hi: {
      name: 'वर्षा ऋतु (मानसून)',
      doshaEffect: 'नमी और ठंडक से वात दोष प्रकोपित होता है, और जठराग्नि वर्ष में सबसे कमजोर होती है।',
      primaryFocus: 'वात शांत करना और हल्की, गर्म खाद्य सामग्री से अग्नि को प्रज्वलित करना।',
      recommendedFoods: ['गर्म सूप, पतली खिचड़ी, पुराना चावल', 'पाचक मसाले (सोंठ, काली मिर्च, जीरा)', 'उबला हुआ गुनगुना पानी'],
      foodsToAvoid: ['कच्चे सलाद व हरी पत्तेदार सब्जियां (कच्ची)', 'रात को भारी दही व मिठाई', 'गीले कपड़े व दिन में सोना'],
      lifestyleTips: ['हमेशा सोंठ मिला उबला पानी पिएं', 'पैरों को सूखा व गर्म रखें', 'हल्का योग व प्राणायाम करें'],
      herbalTea: 'सोंठ, तुलसी व काली मिर्च का गर्म काढ़ा'
    },
    te: {
      name: 'వర్ష రుతువు (వర్షాకాలం)',
      doshaEffect: 'తడి వాతావరణం వల్ల వాత దోషం పెరుగుతుంది, జీర్ణక్రియ బాగా తగ్గుతుంది.',
      primaryFocus: 'వాతాన్ని సమతుల్యం చేయడం, తేలికపాటి వేడి ఆహారంతో అగ్నిని పెంచడం.',
      recommendedFoods: ['వేడి సూర్లు, పల్చటి కిచిడీ, పాత బియ్యం', 'అల్లం, మిరియాలు, జీలకర్ర', 'కాచి చల్లార్చిన నీరు'],
      foodsToAvoid: ['పచ్చి కూరగాయలు, ఆకుకూరలు', 'రాత్రి పూట పెరుగు, విరుద్ధ ఆహారం', 'తడి బట్టలు వేసుకోవడం, పగటి నిద్ర'],
      lifestyleTips: ['అల్లం వేసి కాచిన నీటినే త్రాగాలి', 'పాదాలను పొడిగా, వెచ్చగా ఉంచాలి', 'తేలికపాటి యోగా చేయాలి'],
      herbalTea: 'సొంటి, తులసి మరియు మిరియాల టీ'
    }
  },
  autumn: {
    en: {
      name: 'Autumn (Sharad Ritu)',
      doshaEffect: 'Pitta accumulated in summer gets inflamed by sudden bright autumn sun.',
      primaryFocus: 'Pitta pacification and gentle blood detoxification (Virechana / Raktamokshana period).',
      recommendedFoods: ['Ghee, rice, barley, and wheat', 'Sweet and bitter vegetables (gourd, asparagus)', 'Moon-activated water (Amsuudaka)'],
      foodsToAvoid: ['Sour curds, mustard oil, and alcohol', 'Pungent spices and hot sunbathing', 'Late night heavy dinners'],
      lifestyleTips: ['Expose water to moonlight overnight before drinking', 'Practice gentle Sheetali breathing', 'Wear light pastel shades'],
      herbalTea: 'Rose Petal & Licorice Tea'
    },
    hi: {
      name: 'शरद ऋतु (अक्टूबर - नवंबर)',
      doshaEffect: 'गर्मी में जमा हुआ पित्त शरद कालीन तेज धूप से भड़क उठता है।',
      primaryFocus: 'पित्त शमन और रक्त का सौम्य शोधन।',
      recommendedFoods: ['गाय का शुद्ध घी, चावल, जौ व गेहूं', 'मीठी व कड़वी सब्जियां (लौकी, तरोई)', 'चांदनी में रखा जल (अंशुदक)'],
      foodsToAvoid: ['खट्टा दही, सरसों तेल व मदिरा', 'तीखे मसाले व कड़ी धूप में बैठना', 'देर रात भारी भोजन'],
      lifestyleTips: ['रात भर चांदनी में रखा पानी पिएं', 'शीतली प्राणायाम करें', 'हल्के गुलाबी व सफेद वस्त्र पहनें'],
      herbalTea: 'गुलाब की पंखुड़ी व मुलेठी की चाय'
    },
    te: {
      name: 'శరద్ రుతువు (శరత్కాలం)',
      doshaEffect: 'వేసవిలో పేరుకుపోయిన పిత్తం ఈ రుతువులో తీవ్రమవుతుంది.',
      primaryFocus: 'పిత్త దోషాన్ని తగ్గించడం మరియు రక్తాన్ని శుద్ధి చేయడం.',
      recommendedFoods: ['ఆవు నెయ్యి, వరి అన్నం, బార్లీ', 'సొరకాయ, పొట్లకాయ వంటి తేలికపాటి కూరగాయలు', 'వెన్నెల పడిన నీరు'],
      foodsToAvoid: ['పుల్లటి పెరుగు, ఆవనూనె, మద్యం', 'కారం, మసాలాలు, మితిమీరిన ఎండ', 'దేర రాత్రి భోజనం'],
      lifestyleTips: ['రాత్రంతా వెన్నెల్లో ఉంచిన నీరు త్రాగాలి', 'శీతలి ప్రాణాయామం చేయాలి', 'లేత రంగు బట్టలు కట్టాలి'],
      herbalTea: 'గులాబీ రేకులు, అతిమధురం టీ'
    }
  },
  winter: {
    en: {
      name: 'Winter (Hemanta / Shishira)',
      doshaEffect: 'Digestive Agni becomes extremely strong due to internal heat retention. Kapha begins building.',
      primaryFocus: 'Nourishing deep tissues with rich, warm, lubricating foods.',
      recommendedFoods: ['Nutritious sesame laddoos, nuts, dates, ghee', 'Warm herbal soups and whole grains', 'Fresh milk, cane sugar, and Chyawanprash'],
      foodsToAvoid: ['Cold drinks, ice creams, and refrigerated food', 'Light dry snacks (chips, crackers)', 'Exposure to cold drafts'],
      lifestyleTips: ['Sunbathing in morning sun', 'Daily warm oil Abhyanga massage', 'Vigorous physical exercise'],
      herbalTea: 'Cinnamon, Cardamom & Cloves Chai'
    },
    hi: {
      name: 'हेमंत व शिशिर ऋतु (सर्दी)',
      doshaEffect: 'शरीर की गर्मी अंदर रुकने से जठराग्नि अत्यंत तीव्र हो जाती है। कफ का संचय शुरू होता है।',
      primaryFocus: 'पौष्टिक, गर्म व स्नेहन युक्त आहार से धातुओं का पोषण करना।',
      recommendedFoods: ['तिल के लड्डू, सूखे मेवे, खजूर, शुद्ध घी', 'गर्म सूप व अंकुरित अनाज', 'ताजा दूध, गुड़ व च्यवनप्राश'],
      foodsToAvoid: ['ठंडे पेय, आइसक्रीम व फ्रिज का खाना', 'सूखे व हल्के स्नैक्स (चिप्स, कुरकुरे)', 'ठंडी हवा के सीधे संपर्क से बचें'],
      lifestyleTips: ['सुबह धूप सेकें', 'रोजाना तिल के तेल से मालिश करें', 'अच्छी कसरत व व्यायाम करें'],
      herbalTea: 'दालचीनी, इलायची व लौंग का गर्म काढ़ा'
    },
    te: {
      name: 'హేమంత & శిశిర రుతువులు (చలికాలం)',
      doshaEffect: 'శరీర వేడి లోపలే ఉండటం వల్ల జీర్ణక్రియ (అగ్ని) చాలా బలంగా ఉంటుంది.',
      primaryFocus: 'పోషకాలతో కూడిన వేడి, చిక్కటి ఆహారంతో శరీరాన్ని బలపరచడం.',
      recommendedFoods: ['నువ్వుల లడ్డు, బాదం, జీడిపప్పు, ఖర్జూరం, నెయ్యి', 'వేడి పాలు, బెల్లం, చ్యవన్ ప్రాష్', 'చిక్కటి పప్పు చారులు'],
      foodsToAvoid: ['చల్లటి పానీయాలు, ఐస్‌క్రీమ్‌లు, ఫ్రిజ్ ఆహారం', 'ఎండు అల్పాహారాలు (చిప్స్)', 'చల్లటి గాలికి గురికావడం'],
      lifestyleTips: ['ఉదయం ఎండలో కూర్చోవాలి', 'రోజూ నువ్వుల నూనెతో అభ్యంగనం చేయాలి', 'మంచి వ్యాయామం చేయాలి'],
      herbalTea: 'దాల్చినచెక్క, యాలకులు, లవంగాలు టీ'
    }
  },
  spring: {
    en: {
      name: 'Spring (Vasanta Ritu)',
      doshaEffect: 'Accumulated winter Kapha melts under spring warmth, dulling digestive Agni.',
      primaryFocus: 'Kapha elimination, detox, light diet, and dry massage (Udvartana).',
      recommendedFoods: ['Barley, honey, roasted chickpeas, bitter greens', 'Pungent spices (black pepper, ginger, mustard)', 'Warm water with honey'],
      foodsToAvoid: ['Heavy, oily, fried, and sweet dairy foods', 'Daytime sleeping', 'Excessive cold water'],
      lifestyleTips: ['Dry herbal powder massage (Udvartana)', 'Active outdoor exercise & yoga', 'Pranayama to clear lungs'],
      herbalTea: 'Dry Ginger, Honey & Lemon Tea'
    },
    hi: {
      name: 'वसन्त ऋतु (बसंत का मौसम)',
      doshaEffect: 'सर्दी में जमा कफ सूर्य की किरणें पड़ने से पिघलता है, जिससे जठराग्नि मंद पड़ती है।',
      primaryFocus: 'कफ का निष्कासन, शरीर का डिटॉक्स, हल्का आहार व उद्वर्तन (सूखी मालिश)।',
      recommendedFoods: ['जौ, शहद, भुने चने, कड़वी सब्जियां', 'तीखे मसाले (काली मिर्च, सोंठ, राई)', 'शहद मिला गुनगुना पानी'],
      foodsToAvoid: ['भारी, तले-भुने, मीठे व मलाईदार खाद्य पदार्थ', 'दिन में सोना', 'अत्यधिक ठंडा पानी'],
      lifestyleTips: ['उद्वर्तन (हर्बल पाउडर से सूखी मालिश)', 'सक्रिय योगासन व दौड़ना', 'फेफड़ों की सफाई के लिए कपालभाति'],
      herbalTea: 'सोंठ, शहद व नींबू की चाय'
    },
    te: {
      name: 'వసంత రుతువు (వసంత కాలం)',
      doshaEffect: 'చలికాలంలో పేరుకుపోయిన కఫం సూర్యకాంతికి కరిగి, జీర్ణక్రియను మందగిస్తుంది.',
      primaryFocus: 'కఫాన్ని కరిగించడం, శరీరాన్ని డిటాక్స్ చేయడం, తేలికపాటి ఆహారం.',
      recommendedFoods: ['బార్లీ, తేనె, వేయించిన శనగలు, చేదు కూరగాయలు', 'మిరియాలు, సొంటి, ఆవాలు', 'తేనె కలిపిన గోరువెచ్చని నీరు'],
      foodsToAvoid: ['నూనె పదార్థాలు, తీపి పదార్థాలు, మీగడ పాలు', 'పగటి నిద్ర', 'చల్లటి నీరు'],
      lifestyleTips: ['ఉద్వర్తనం (పొడి మూలికా చూర్ణంతో మర్దన)', 'చురుకైన వ్యాయామం, యోగా', 'శ్వాసకోశ శుద్ధి ప్రాణాయామం'],
      herbalTea: 'సొంటి, తేనె మరియు నిమ్మకాయ టీ'
    }
  }
};
