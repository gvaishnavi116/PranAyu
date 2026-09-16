export interface RemedyTranslation {
  title: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  preparation: string;
  dosage: string;
  warnings: string[];
}

export const remedyTranslations: Record<string, Record<'en' | 'hi' | 'te', RemedyTranslation>> = {
  rem_1: {
    en: {
      title: 'Ginger-Tulsi Kadha for Cold & Cough',
      description: 'A traditional warming herbal decoction designed to balance Vata and Kapha, soothe throat irritation, and boost respiratory immunity.',
      benefits: ['Relieves nasal congestion', 'Soothes throat inflammation', 'Improves digestion', 'Acts as a natural antioxidant'],
      ingredients: ['Fresh Ginger (grated) - 1 inch', 'Fresh Tulsi (Holy Basil) Leaves - 8-10', 'Black Pepper - 3-4 crushed kernels', 'Honey - 1 teaspoon', 'Water - 2 cups'],
      preparation: '1. Boil water in a pan.\n2. Add the grated ginger, Tulsi leaves, and crushed black pepper.\n3. Reduce the heat and simmer until the liquid is halved (approx. 10-12 mins).\n4. Strain the liquid and let it cool down to warm/lukewarm.\n5. Stir in the honey (never add honey to boiling liquid as Ayurveda considers heated honey toxic).',
      dosage: 'Drink 1/2 cup (warm) twice daily after meals.',
      warnings: ['Avoid if you have active acid reflux or bleeding disorders (Pitta imbalance).', 'Do not boil honey directly.']
    },
    hi: {
      title: 'सर्दी और खांसी के लिए अदरक-तुलसी काढ़ा',
      description: 'वात और कफ को संतुलित करने, गले की जलन को शांत करने और श्वसन प्रणाली की प्रतिरक्षा को बढ़ाने के लिए डिज़ाइन किया गया एक पारंपरिक हर्बल काढ़ा।',
      benefits: ['नाक की जकड़न से राहत देता है', 'गले की सूजन को शांत करता है', 'पाचन में सुधार करता है', 'प्राकृतिक एंटीऑक्सीडेंट के रूप में कार्य करता है'],
      ingredients: ['ताजा अदरक (घिसा हुआ) - 1 इंच', 'ताजा तुलसी के पत्ते - 8-10', 'काली मिर्च - 3-4 पिसी हुई', 'शहद - 1 चम्मच', 'पानी - 2 कप'],
      preparation: '1. एक पैन में पानी उबालें।\n2. घिसा हुआ अदरक, तुलसी के पत्ते और पिसी हुई काली मिर्च डालें।\n3. आंच धीमी करें और तब तक उबालें जब तक पानी आधा न रह जाए (लगभग 10-12 मिनट)।\n4. काढ़े को छान लें और इसे गुनगुना होने दें।\n5. शहद मिलाएं (उबलते पानी में कभी भी शहद न मिलाएं क्योंकि आयुर्वेद में गर्म शहद को हानिकारक माना जाता है)।',
      dosage: 'भोजन के बाद दिन में दो बार 1/2 कप (गुनगुना) पिएं।',
      warnings: ['यदि आपको एसिडिटी या रक्तस्राव विकार (पित्त असंतुलन) है तो इससे बचें।', 'शहद को सीधे कभी न उबालें।']
    },
    te: {
      title: 'జలుబు & దగ్గు కోసం అల్లం-తులసి కషాయం',
      description: 'వాత మరియు కఫ దోషాలను సమతుల్యం చేయడానికి, గొంతు నొప్పిని తగ్గించడానికి మరియు శ్వాసకోశ రోగనిరోధక శక్తిని పెంచడానికి ఒక సాంప్రదాయ మూలికా కషాయం.',
      benefits: ['ముక్కు జలుబు నుండి ఉపశమనం ఇస్తుంది', 'గొంతు వాపు మరియు నొప్పిని తగ్గిస్తుంది', 'జీర్ణక్రియను మెరుగుపరుస్తుంది', 'సహజ రోగనిరోధక శక్తిని పెంపొందిస్తుంది'],
      ingredients: ['తాజా అల్లం (తురిమినది) - 1 అంగుళం', 'తాజా తులసి ఆకులు - 8-10', 'మిరియాల పొడి - కొద్దిగా', 'తేనె - 1 టీస్పూన్', 'నీరు - 2 కప్పులు'],
      preparation: '1. ఒక పాత్రలో నీటిని మరిగించండి.\n2. తురిమిన అల్లం, తులసి ఆకులు మరియు మిరియాల పొడి జోడించండి.\n3. మంటను తగ్గించి, నీరు సగం అయ్యే వరకు (సుమారు 10-12 నిమిషాలు) మరిగించండి.\n4. కషాయాన్ని వడకట్టి, గోరువెచ్చగా అయ్యే వరకు చల్లారనివ్వండి.\n5. చివరగా తేనె కలపండి (మరుగుతున్న కషాయంలో తేనె కలపకూడదు, ఆయుర్वेదం ప్రకారం వేడి తేనె విషतुल్యంగా మారుతుంది).',
      dosage: 'భోజనం తర్వాత రోజుకు రెండుసార్లు 1/2 కప్పు (గోరువెచ్చగా) తీసుకోండి.',
      warnings: ['యాసిడ్ రిఫ్లక్స్ లేదా పిత్త రుగ్మతలు ఉన్నవారు దీనిని నివారించాలి.', 'తేనెను నేరుగా వేడి చేయవద్దు.']
    }
  },
  rem_2: {
    en: {
      title: 'Golden Milk (Haldi Doodh) for Immunity & Pain',
      description: 'A soothing, warm wellness drink packed with anti-inflammatory properties, perfect for pacifying Vata and Pitta doshas while strengthening joints and immunity.',
      benefits: ['Reduces joint and muscle pain', 'Boosts cellular immunity', 'Promotes restful sleep', 'Aids in skin healing'],
      ingredients: ['Milk (or almond milk) - 1 cup', 'Turmeric Powder (organic) - 1/2 teaspoon', 'Crushed Black Pepper - a tiny pinch', 'Cardamom Powder - a pinch', 'Maple Syrup or Honey - 1/2 teaspoon'],
      preparation: '1. Heat milk in a saucepan on medium heat.\n2. Stir in turmeric powder, black pepper, and cardamom powder.\n3. Bring to a gentle boil, then simmer on low heat for 5 minutes.\n4. Pour into a cup, let it cool slightly, and sweeten with honey or maple syrup.',
      dosage: 'Drink 1 cup warm before bedtime.',
      warnings: ['Turmeric in medicinal doses is warming; reduce usage if experiencing extreme body heat.', 'Pregnant women should consult a practitioner before taking high doses.']
    },
    hi: {
      title: 'इम्युनिटी और दर्द के लिए हल्दी दूध (गोल्डन मिल्क)',
      description: 'विरोधी भड़काऊ (anti-inflammatory) गुणों से भरपूर एक सुखदायक, गर्म स्वास्थ्य पेय, जो जोड़ों और इम्युनिटी को मजबूत करते हुए वात और पित्त दोष को शांत करने के लिए एकदम सही है।',
      benefits: ['जोड़ों और मांसपेशियों के दर्द को कम करता है', 'कोशिका स्तर पर इम्युनिटी बढ़ाता है', 'गहरी और शांतिपूर्ण नींद को बढ़ावा देता है', 'त्वचा के घावों को भरने में मदद करता है'],
      ingredients: ['दूध (या बादाम का दूध) - 1 कप', 'हल्दी पाउडर (ऑर्गेनिक) - 1/2 छोटा चम्मच', 'कुटी हुई काली मिर्च - एक चुटकी', 'इलायची पाउडर - एक चुटकी', 'शहद या गुड़ - 1/2 छोटा चम्मच'],
      preparation: '1. एक सॉस पैन में दूध को मध्यम आंच पर गर्म करें।\n2. हल्दी पाउडर, काली मिर्च और इलायची पाउडर डालें।\n3. इसे धीरे से उबालें, फिर धीमी आंच पर 5 मिनट तक पकने दें।\n4. एक कप में निकालें, थोड़ा ठंडा होने दें और शहद या गुड़ मिलाकर मीठा करें।',
      dosage: 'सोने से पहले 1 कप गर्म पिएं।',
      warnings: ['हल्दी की औषधीय खुराक गर्म होती है; अत्यधिक शरीर की गर्मी होने पर उपयोग कम करें।', 'गर्भवती महिलाओं को अधिक मात्रा में लेने से पहले चिकित्सक से परामर्श करना चाहिए।']
    },
    te: {
      title: 'రోగనిరోధక శక్తి & నొప్పుల కోసం పసుపు పాలు (గోల్డెన్ మిల్క్)',
      description: 'శరీరంలో వాపులు మరియు నొప్పులను తగ్గించే గుణాలు ఉన్న ఒక అద్భుతమైన గోరువెచ్చని పానీయం. ఇది వాత, పిత్త దోషాలను శాంతింపజేసి, కీళ్ల నొప్పులను తగ్గిస్తుంది.',
      benefits: ['కీళ్ల మరియు కండరాల నొప్పులను తగ్గిస్తుంది', 'కణాల రోగనిరోధक శక్తిని పెంచుతుంది', 'ప్రశాంతమైన నిద్రను కలిగిస్తుంది', 'చర్మ సౌందర్యాన్ని పెంపొందిస్తుంది'],
      ingredients: ['పాలు (లేదా బాదం పాలు) - 1 కప్పు', 'పసుపు పొడి (ఆర్గానిక్) - 1/2 టీస్పూన్', 'మిరియాల పొడి - ఒక చిన్న చిటికెడు', 'యాలకుల పొడి - చిటికెడు', 'తేనె లేదా బెల్లం - 1/2 టీస్పూన్'],
      preparation: '1. ఒక పాత్రలో పాలను మధ్యస్థ మంట మీద వేడి చేయండి.\n2. పసుపు పొడి, మిరియాల పొడి మరియు యాలకుల పొడి కలపండి.\n3. పాలను ఒక పొంగు రానిచ్చి, చిన్న మంట మీద 5 నిమిషాలు మరిగించండి.\n4. ఒక కప్పులోకి తీసుకుని, కొద్దిగా చల్లారిన తర్వాత తేనె లేదా బెల్లం కలపండి.',
      dosage: 'రాత్రి పడుకునే ముందు 1 కప్పు గోరువెచ్చని పాలు తీసుకోండి.',
      warnings: ['పసుపు వేడి చేసే తత్త్వం కలిగి ఉంటుంది; శరీర వేడి ఎక్కువగా ఉన్నప్పుడు మోతాదు తగ్గించండి.', 'గర్భిణీ స్త్రీలు ఎక్కువ మొత్తంలో తీసుకునే ముందు వైద్యుడిని సంప్రదించాలి.']
    }
  },
  rem_3: {
    en: {
      title: 'Cumin-Coriander-Fennel (CCF) Tea for Digestion',
      description: 'A highly revered Ayurvedic blend known as CCF Tea. It balances all three doshas (Tridoshic), enlivens Agni (digestive fire) without overheating, and removes Ama (toxins).',
      benefits: ['Reduces bloating and gas', 'Enhances nutrient absorption', 'Gentle detoxification', 'Cools hot flashes or stomach acidity'],
      ingredients: ['Cumin Seeds - 1/2 teaspoon', 'Coriander Seeds - 1/2 teaspoon', 'Fennel Seeds - 1/2 teaspoon', 'Water - 4 cups'],
      preparation: '1. Combine water and the seeds (cumin, coriander, fennel) in a small pot.\n2. Bring to a boil, then reduce heat and simmer covered for 5-10 minutes.\n3. Strain and pour into a thermos to sip throughout the day, or enjoy fresh.',
      dosage: 'Sip warm throughout the day, particularly 15-30 minutes before or after meals.',
      warnings: ['Generally extremely safe for everyone.', 'If pregnant, consult your doctor prior to excessive intake of herbal teas.']
    },
    hi: {
      title: 'पाचन के लिए जीरा-धनिया-सौंफ (CCF) चाय',
      description: 'एक अत्यधिक सम्मानित आयुर्वेदिक मिश्रण जिसे सीसीएफ चाय के रूप में जाना जाता है। यह तीनों दोषों (त्रिदोष) को संतुलित करता है, बिना अधिक गर्मी पैदा किए अग्नि (पाचन अग्नि) को प्रज्वलित करता है, और आम (विषाक्त पदार्थों) को निकालता है।',
      benefits: ['पेट फूलना और गैस कम करता है', 'पोषक तत्वों के अवशोषण को बढ़ाता है', 'हल्का डिटॉक्सिफिकेशन करता है', 'पेट की एसिडिटी या गर्मी को शांत करता है'],
      ingredients: ['जीरा - 1/2 छोटा चम्मच', 'साबुत धनिया - 1/2 छोटा चम्मच', 'सौंफ - 1/2 छोटा चम्मच', 'पानी - 4 कप'],
      preparation: '1. एक छोटे बर्तन में पानी और तीनों बीजों (जीरा, धनिया, सौंफ) को मिलाएं।\n2. इसे उबालें, फिर आंच कम करें और ढककर 5-10 मिनट तक धीमी आंच पर उबलने दें।\n3. छान लें और पूरे दिन पीने के लिए थर्मस में रखें, या ताजा आनंद लें।',
      dosage: 'दिन भर गुनगुना घूंट-घूंट करके पिएं, विशेष रूप से भोजन से 15-30 मिनट पहले या बाद में।',
      warnings: ['आम तौर पर सभी के लिए बेहद सुरक्षित है।', 'यदि गर्भवती हैं, तो हर्बल चाय के अत्यधिक सेवन से पहले डॉक्टर से परामर्श करें।']
    },
    te: {
      title: 'జీర్ణక్రియ కోసం జీలకర్ర-ధనియాలు-సోంపు (CCF) టీ',
      description: 'ఆయుర్వేదంలో ఎంతో ప్రాచుర్యం పొందిన CCF టీ. ఇది త్రిదోషాలను సమతుల్యం చేస్తుంది, గుండెల్లో మంట కలిగించకుండా జీర్ణక్రియను మెరుగుపరుస్తుంది మరియు శరీరంలో పేరుకుపోయిన ఆమమును (టాక్సిన్స్) తొలగిస్తుంది.',
      benefits: ['కడుపు ఉబ్బరం మరియు గ్యాస్‌ను తగ్గిస్తుంది', 'పోషకాల శోషణను పెంచుతుంది', 'శరీరాన్ని సున్నితంగా శుద్ధి చేస్తుంది', 'కడుపులో అసిడిటీని మరియు వేడిని తగ్గిస్తుంది'],
      ingredients: ['జీలకర్ర - 1/2 టీస్పూన్', 'ధనియాలు - 1/2 టీస్పూన్', 'సోంపు గింజలు - 1/2 టీస్పూన్', 'నీరు - 4 కప్పులు'],
      preparation: '1. ఒక పాత్రలో నీరు మరియు గింజలను (జీలకర్ర, ధనియాలు, సోంపు) కలపండి.\n2. మరిగించి, ఆపై మంటను తగ్గించి 5-10 నిమిషాలు మూత పెట్టి ఉంచండి.\n3. వడకట్టి రోజు మొత్తం సిప్ చేయడానికి ఫ్లాస్క్‌లో పోసుకోండి లేదా అప్పటికప్పుడు వేడిగా తాగండి.',
      dosage: 'రోజంతా గోరువెచ్చగా తాగండి, ముఖ్యంగా భోజనానికి 15-30 నిమిషాల ముందు లేదా తర్వాత సిప్ చేయండి.',
      warnings: ['అందరికీ సాధారణంగా ఎంతో సురక్షితమైనది.', 'గర్భిణీలు ఈ హెర్బల్ టీలను ఎక్కువగా తాగే ముందు డాక్టర్‌ను సంప్రదించాలి.']
    }
  },
  rem_4: {
    en: {
      title: 'Ashwagandha Latte for Stress & Sleep',
      description: 'An adaptogenic evening brew designed to ground a hyperactive nervous system, calm Vata dosha, and invite restful, restorative sleep.',
      benefits: ['Reduces cortisol and stress levels', 'Deepens sleep cycles', 'Revitalizes physical energy over time', 'Nourishes the nervous system'],
      ingredients: ['Warm Milk (dairy or oat) - 1 cup', 'Ashwagandha Powder - 1/2 teaspoon', 'Nutmeg Powder - a tiny pinch', 'Ghee - 1/4 teaspoon', 'Honey or Coconut Sugar - 1/2 teaspoon'],
      preparation: '1. Heat the milk in a pot until warm.\n2. Whisk in the Ashwagandha powder, nutmeg powder, and ghee.\n3. Warm on low heat for 3-4 minutes to activate the herbs.\n4. Pour into a mug, let cool slightly, and stir in your sweetener.',
      dosage: 'Drink warm 45 minutes before sleeping.',
      warnings: ['Not recommended during active fever or severe congestion.', 'Consult an Ayurvedic doctor if pregnant.']
    },
    hi: {
      title: 'तनाव और नींद के लिए अश्वगंधा लाते',
      description: 'एक एडाप्टोजेनिक शाम का पेय जो अति सक्रिय तंत्रिका तंत्र को शांत करने, वात दोष को दूर करने और आरामदायक, ताज़ा नींद लाने के लिए डिज़ाइन किया गया है।',
      benefits: ['कोर्टिसोल और तनाव के स्तर को कम करता है', 'नींद के चक्र को गहरा करता है', 'समय के साथ शारीरिक ऊर्जा को पुनर्जीवित करता है', 'तंत्रिका तंत्र को पोषण देता है'],
      ingredients: ['गर्म दूध (डेयरी या ओट) - 1 कप', 'अश्वगंधा पाउडर - 1/2 छोटा चम्मच', 'जायफल पाउडर - एक छोटी चुटकी', 'घी - 1/4 छोटा चम्मच', 'शहद या नारियल की चीनी - 1/2 छोटा चम्मच'],
      preparation: '1. एक बर्तन में दूध गर्म होने तक गर्म करें।\n2. अश्वगंधा पाउडर, जायफल पाउडर और घी डालें और अच्छी तरह मिलाएं।\n3. जड़ी-बूटियों को सक्रिय करने के लिए धीमी आंच पर 3-4 मिनट तक गर्म करें।\n4. एक मग में डालें, थोड़ा ठंडा होने दें, और अपने स्वादानुसार मीठा मिलाएं।',
      dosage: 'सोने से 45 मिनट पहले गर्म पिएं।',
      warnings: ['सक्रिय बुखार या भारी कफ संचय के दौरान अनुशंसित नहीं है।', 'यदि गर्भवती हैं तो आयुर्वेदिक डॉक्टर से सलाह लें।']
    },
    te: {
      title: 'ఒత్తిడి & నిద్ర కోసం అశ్వగంధ లాతే',
      description: 'నరాల బలహీనత మరియు మానసిక ఒత్తిడిని తగ్గించి, వాత దోషాన్ని దూరం చేసి, గాఢమైన నిద్రను కలిగించే రాత్రి తాగే అద్భుతమైన పానీయం.',
      benefits: ['స్ట్రెస్ హార్మోన్‌ను తగ్గిస్తుంది', 'గాఢ నిద్రను కలిగిస్తుంది', 'శారీరక శక్తిని పునరుజ్జీవింపజేస్తుంది', 'నరాల వ్యవస్థకు బలాన్ని ఇస్తుంది'],
      ingredients: ['గోరువెచ్చని పాలు (సాధారణ లేదా ఓట్ పాలు) - 1 కప్పు', 'అశ్వగంధ పొడి - 1/2 టీస్పూన్', 'జాజికాయ పొడి - చిటికెడు', 'నెయ్యి - 1/4 టీస్పూన్', 'తేనె లేదా కొబ్బరి చక్కెర - 1/2 టీస్పూన్'],
      preparation: '1. గిన్నెలో పాలను వేడి చేయండి.\n2. అందులో అశ్వగంధ పొడి, జాజికాయ పొడి మరియు నెయ్యి కలపండి.\n3. మూలికలు సక్రియం కావడానికి చిన్న మంట మీద 3-4 నిమిషాలు ఉంచండి.\n4. కప్పులోకి తీసుకుని, కొద్దిగా చల్లారిన తర్వాత తీపి కలపండి.',
      dosage: 'పడుకోవడానికి 45 నిమిషాల ముందు గోరువెచ్చగా తాగండి.',
      warnings: ['జ్వరం లేదా విపరీతమైన కఫ దోషం ఉన్నప్పుడు దీనిని తీసుకోకూడదు.', 'గర్భిణీలు ఆయుర్వేద వైద్యుడిని సంప్రదించిన తర్వాతే వాడాలి.']
    }
  },
  rem_5: {
    en: {
      title: 'Triphala Gentle Detox Cleanser',
      description: 'A classic formula combining three native fruits: Amalaki, Bibhitaki, and Haritaki. It is the premier formula for colon health, digestive regularity, and tissue rejuvenation.',
      benefits: ['Relieves chronic constipation gently', 'Tones the digestive tract', 'Rich in Vitamin C and antioxidants', 'Balances all three doshas'],
      ingredients: ['Triphala Powder (Churna) - 1/2 to 1 teaspoon', 'Warm Water - 1 cup'],
      preparation: '1. Add Triphala powder to a cup of warm water.\n2. Stir well and let it sit for 2-3 minutes to dissolve.',
      dosage: 'Drink before bedtime, at least 1-2 hours after your final meal.',
      warnings: ['Do not use during active diarrhea or dysentery.', 'Discontinue if it causes stomach cramps.']
    },
    hi: {
      title: 'त्रिफला सौम्य डिटॉक्स क्लींजर',
      description: 'तीन देशी फलों: आमलकी, बिभीतकी और हरीतकी को मिलाने वाला एक क्लासिक फॉर्मूला। यह कोलन स्वास्थ्य, पाचन नियमितता और ऊतकों के कायाकल्प के लिए प्रमुख फॉर्मूला है।',
      benefits: ['पुरानी कब्ज से धीरे से राहत देता है', 'पाचन तंत्र को मजबूत करता है', 'विटामिन सी और एंटीऑक्सीडेंट से भरपूर है', 'तीनों दोषों को संतुलित करता है'],
      ingredients: ['त्रिफला चूर्ण - 1/2 से 1 छोटा चम्मच', 'गुनगुना पानी - 1 कप'],
      preparation: '1. एक कप गुनगुने पानी में त्रिफला चूर्ण मिलाएं।\n2. अच्छी तरह हिलाएं और घुलने के लिए 2-3 मिनट तक छोड़ दें।',
      dosage: 'सोने से पहले पिएं, अपने अंतिम भोजन के कम से कम 1-2 घंटे बाद।',
      warnings: ['सक्रिय दस्त या पेचिश के दौरान उपयोग न करें।', 'यदि पेट में ऐंठन महसूस हो तो उपयोग बंद कर दें।']
    },
    te: {
      title: 'త్రిఫల సున్నితమైన శరీరం శుద్ధి కారకం',
      description: 'ఉసిరి, తానికాయ, కరక్కాయల కలయికతో రూపొందించిన ప్రసిద్ధ ఔషధం. ఇది పేగుల ఆరోగ్యాన్ని పెంపొందిస్తుంది మరియు మలబద్ధకాన్ని తగ్గిస్తుంది.',
      benefits: ['మలబద్ధకాన్ని సున్నితంగా నివారిస్తుంది', 'జీర్ణకోశాన్ని టోన్ చేస్తుంది', 'విటమిన్ సి మరియు యాంటీఆక్సిడెంట్స్ పుష్కలంగా ఉన్నాయి', 'త్రిదోషాలను సమతుల్యం చేస్తుంది'],
      ingredients: ['త్రిఫల చూర్ణం - 1/2 నుండి 1 టీస్పూన్', 'గోరువెచ్చని నీరు - 1 కప్పు'],
      preparation: '1. ఒక కప్పు గోరువెచ్చని నీటిలో త్రిఫల చూర్ణం కలపండి.\n2. బాగా తిప్పి, కరగడానికి 2-3 నిమిషాలు ఉంచండి.',
      dosage: 'రాత్రి పడుకునే ముందు, భోజనం చేసిన కనీసం 1-2 గంటల తర్వాత తాగండి.',
      warnings: ['విరేచనాలు అవుతున్నప్పుడు దీనిని వాడకూడదు.', 'కడుపులో నొప్పులు వస్తే వాడటం నిలిపివేయండి.']
    }
  },
  rem_6: {
    en: {
      title: 'Aloe Vera & Mint Cooler for Acidity & Pitta',
      description: 'A cooling, soothing elixir formulated to calm elevated Pitta dosha, cool stomach acid, heal skin rashes, and relieve heartburn.',
      benefits: ['Reduces acid reflux and heartburn', 'Hydrates and cools the system', 'Clears inflammatory skin issues', 'Detoxifies the liver'],
      ingredients: ['Pure Aloe Vera Juice - 3 tablespoons', 'Fresh Mint Leaves - 5-6', 'Coconut Water or Pure Water - 1 cup', 'Lemon Juice - 1/2 teaspoon', 'Fennel Powder - 1/4 teaspoon'],
      preparation: '1. Blend fresh mint leaves with aloe vera juice and lemon juice.\n2. Strain if desired, then stir into coconut water.\n3. Add a pinch of fennel powder for extra digestive cooling.',
      dosage: 'Drink on an empty stomach in the morning or 30 mins before lunch.',
      warnings: ['Avoid if you have cold, cough, or strong Kapha accumulation.', 'Do not consume Aloe Vera latex; only use pure edible inner leaf juice.']
    },
    hi: {
      title: 'एसिडिटी और पित्त के लिए एलोवेरा और पुदीना कूलर',
      description: 'बढ़े हुए पित्त दोष को शांत करने, पेट के एसिड को ठंडा करने, त्वचा के चकत्तों को ठीक करने और सीने की जलन से राहत देने के लिए तैयार किया गया एक ठंडा, सुखदायक अमृत।',
      benefits: ['एसिड रिफ्लक्स और सीने की जलन को कम करता है', 'प्रणाली को हाइड्रेट और ठंडा करता है', 'त्वचा की सूजन संबंधी समस्याओं को साफ करता है', 'लिवर को डिटॉक्सिफाई करता है'],
      ingredients: ['शुद्ध एलोवेरा जूस - 3 बड़े चम्मच', 'ताजा पुदीना पत्ती - 5-6', 'नारियल पानी या शुद्ध पानी - 1 कप', 'नींबू का रस - 1/2 छोटा चम्मच', 'सौंफ पाउडर - 1/4 छोटा चम्मच'],
      preparation: '1. ताजा पुदीने के पत्तों को एलोवेरा जूस और नींबू के रस के साथ ब्लेंड करें।\n2. यदि चाहें तो छान लें, फिर नारियल पानी में मिलाएं।\n3. अतिरिक्त पाचन ठंडक के लिए एक चुटकी सौंफ पाउडर मिलाएं।',
      dosage: 'सुबह खाली पेट या दोपहर के भोजन से 30 मिनट पहले पिएं।',
      warnings: ['यदि आपको सर्दी, खांसी या भारी कफ संचय है तो इससे बचें।', 'एलोवेरा लेटेक्स का सेवन न करें; केवल शुद्ध खाद्य आंतरिक पत्ती के रस का उपयोग करें।']
    },
    te: {
      title: 'అసిడిటీ & పిత్త దోష నివారణకు కలబంద & పుదీనా పానీయం',
      description: 'శరీరంలో అధిక వేడిని మరియు పిత్త దోషాన్ని తగ్గించి, కడుపులో అసిడిటీ, గుండెల్లో మంట నుండి ఉపశమనం కలిగించే అద్భుతమైన చల్లని పానీయం.',
      benefits: ['యాసిడ్ రిఫ్లక్స్ మరియు గుండెల్లో మంటను తగ్గిస్తుంది', 'శరీరాన్ని చల్లబరుస్తుంది మరియు హైడ్రేట్ చేస్తుంది', 'చర్మ సమస్యలను నివారిస్తుంది', 'కాలేయాన్ని శుద్ధి చేస్తుంది'],
      ingredients: ['కలబంద రసం (ఎడిబుల్) - 3 టేబుల్ స్పూన్లు', 'తాజా పుదీనా ఆకులు - 5-6', 'కొబ్బరి నీళ్లు లేదా మంచినీళ్లు - 1 కప్పు', 'నిమ్మరసం - 1/2 టీస్పూన్', 'సోంపు పొడి - 1/4 టీస్పూన్'],
      preparation: '1. పుదీనా ఆకులు, కలబంద రసం మరియు నిమ్మరసం మిక్सी పట్టండి.\n2. వడకట్టి, కొబ్బరి నీళ్లలో కలపండి.\n3. జీర్ణక్రియ చల్లబడటానికి చిటికెడు సోంపు పొడి జోడించండి.',
      dosage: 'ఉదయం పరిగడుపున లేదా మధ్యాహ్నం భోజనానికి 30 నిమిషాల ముందు తాగండి.',
      warnings: ['జలుబు, దగ్గు లేదా కఫ దోషం ఎక్కువగా ఉన్నప్పుడు దీనిని నివారించండి.', 'కేవలం కలబంద లోపలి తెల్లటి గుజ్జు రసాన్ని మాత్రమే వాడాలి.']
    }
  },
  rem_7: {
    en: {
      title: 'Shallaki (Boswellia) & Nirgundi Decoction for Knee Pain & Arthritis',
      description: 'A potent anti-inflammatory herbal decoction balancing Vata dosha, reducing knee joint stiffness, preserving cartilage, and alleviating morning joint pain.',
      benefits: ['Reduces knee joint swelling & stiffness', 'Preserves joint cartilage & flexibility', 'Improves daily mobility', 'Pacifies aggravated Vata in joints'],
      ingredients: ['Shallaki Powder (Boswellia) - 1/2 teaspoon', 'Nirgundi Powder or Leaves - 1/2 teaspoon', 'Fresh Ginger (crushed) - 1/2 inch', 'Water - 2 cups'],
      preparation: '1. Boil 2 cups of water with Shallaki, Nirgundi, and crushed ginger in a pot.\n2. Simmer on medium heat until reduced to 1 cup.\n3. Strain and let cool until pleasantly warm before sipping.',
      dosage: 'Drink 1/2 cup warm twice daily after meals.',
      warnings: ['Avoid taking on an empty stomach if you have severe acid reflux.', 'Pregnant women should consult an Ayurvedic physician prior to use.']
    },
    hi: {
      title: 'घुटनों के दर्द और आर्थराइटिस के लिए शल्लकी और निर्गुंडी काढ़ा',
      description: 'वात दोष को संतुलित करने, घुटनों की जकड़न कम करने और जोड़ों के दर्द में तुरंत आराम देने वाला एक शक्तिशाली सूजन-रोधी आयुर्वेदिक काढ़ा।',
      benefits: ['घुटनों की सूजन और जकड़न कम करता है', 'जोड़ों के कार्टिलेज और लचीलेपन को सुरक्षित रखता है', 'दैनिक चलने-फिरने की क्षमता में सुधार करता है', 'जोड़ों में बढ़े हुए वात को शांत करता है'],
      ingredients: ['शल्लकी पाउडर (बोसवेलिया) - 1/2 छोटा चम्मच', 'निर्गुंडी पाउडर या पत्तियां - 1/2 छोटा चम्मच', 'ताजा अदरक (कुचला हुआ) - 1/2 इंच', 'पानी - 2 कप'],
      preparation: '1. एक बर्तन में 2 कप पानी में शल्लकी, निर्गुंडी और अदरक डालकर उबालें।\n2. मध्यम आंच पर पानी 1 कप रहने तक पकने दें।\n3. छान लें और गुनगुना होने पर पिएं।',
      dosage: 'भोजन के बाद दिन में दो बार 1/2 कप गुनगुना काढ़ा पिएं।',
      warnings: ['गंभीर एसिडिटी होने पर खाली पेट सेवन न करें।', 'गर्भवती महिलाएं सेवन से पहले आयुर्वेदिक चिकित्सक से सलाह लें।']
    },
    te: {
      title: 'మోకాళ్ల నొప్పులు & ఆర్త్రైటిస్ కోసం శల్లకి, నిర్గుండి కషాయం',
      description: 'వాత దోషాన్ని నివారించి, మోకాళ్ల నొప్పులు, కీళ్ల వాపు మరియు బిగుతును తగ్గించే శక్తివంతమైన ఆయుర్వేద కషాయం.',
      benefits: ['మోకాళ్ల వాపు మరియు బిగుతును తగ్గిస్తుంది', 'కీళ్ల మృదులాస్థి (కార్టిలేజ్)ని రక్షిస్తుంది', 'సులభంగా నడవడానికి సహాయపడుతుంది', 'కీళ్లలో వాత దోషాన్ని నివారిస్తుంది'],
      ingredients: ['శల్లకి పొడి (బోస్వెల్లియా) - 1/2 టీస్పూన్', 'నిర్గుండి పొడి లేదా ఆకులు - 1/2 టీస్పూన్', 'తాజా అల్లం (తురిమినది) - 1/2 అంగుళం', 'నీరు - 2 కప్పులు'],
      preparation: '1. పాత్రలో 2 కప్పుల నీటిలో శల్లకి, నిర్గుండి మరియు అల్లం వేసి మరిగించండి.\n2. నీరు 1 కప్పు అయ్యే వరకు సన్నని మంటపై ఉంచండి.\n3. వడకట్టి, గోరువెచ్చగా ఉన్నప్పుడు తాగండి.',
      dosage: 'భోజనం తర్వాత రోజుకు రెండుసార్లు 1/2 కప్పు గోరువెచ్చని కషాయం తీసుకోండి.',
      warnings: ['తీవ్రమైన అసిడిటీ ఉన్నవారు ఖాళీ కడుపుతో తీసుకోకూడదు.', 'గర్భిణీలు వైద్యుడి సలహా మేరకు మాత్రమే వాడాలి.']
    }
  },
  rem_8: {
    en: {
      title: 'Mahanarayana & Warm Sesame Oil Poultice for Knee Stiffness',
      description: 'A traditional Ayurvedic external Janu Basti compress using warm sesame and Mahanarayana oil to deeply lubricate knee joints and ease chronic pain.',
      benefits: ['Deeply lubricates knee joint space', 'Relieves sharp chronic knee pain', 'Warmth improves localized micro-circulation', 'Calms Vata nerve sensitivity'],
      ingredients: ['Mahanarayana Oil (or Pure Sesame Oil) - 4 tablespoons', 'Camphor - 1 tiny pinch', 'Clean Cotton Cloth or Poultice'],
      preparation: '1. Gently warm the Mahanarayana oil in a bowl over a water bath.\n2. Add a tiny pinch of camphor.\n3. Dip a clean cotton cloth into the warm oil and place over the knee joint for 15-20 minutes.',
      dosage: 'Apply warm compress once daily in the evening or after bath.',
      warnings: ['Ensure the oil is pleasantly warm, not hot, to prevent skin burns.', 'Do not apply on open cuts or inflamed skin breaks.']
    },
    hi: {
      title: 'घुटनों के कड़ापन के लिए महानारायण और गर्म तिल तेल की पट्टी',
      description: 'घुटनों के जोड़ों को अंदर तक चिकनाई देने और पुराने दर्द को दूर करने के लिए गर्म तिल और महानारायण तेल का पारंपरिक बाह्य जानु बस्ति सेक।',
      benefits: ['घुटनों के जोड़ों में चिकनाई बढ़ाता है', 'पुराने घुटनों के दर्द से राहत दिलाता है', 'रक्त संचार में सुधार करता है', 'तंत्रिका संवेदनशीलता को शांत करता है'],
      ingredients: ['महानारायण तेल (या शुद्ध तिल तेल) - 4 बड़े चम्मच', 'कपूर - 1 चुटकी', 'सूती कपड़ा या पोटली'],
      preparation: '1. तेल को कटोरी में हल्का गर्म करें।\n2. एक चुटकी कपूर मिलाएं।\n3. कपड़े को गर्म तेल में डुबोकर घुटने पर 15-20 मिनट के लिए रखें।',
      dosage: 'शाम को या स्नान के बाद दिन में एक बार गर्म सेक करें।',
      warnings: ['ध्यान रखें कि तेल गुनगुना हो, अत्यधिक गर्म न हो।', 'कटे हुए या छिले हुए स्थान पर न लगाएं।']
    },
    te: {
      title: 'మోకాళ్ల బిగుతు & నొప్పులకు మహానారాయణ, నువ్వుల నూనె పట్టు',
      description: 'మోకాళ్ల కీళ్లకు లోతైన జిడ్డును (ల్యూబ్రికేషన్) అందించి, దీర్ఘకాలిక మోకాళ్ల నొప్పులను తగ్గించే సాంప్రదాయ ఆయుర్వేద తైల చికిత్స.',
      benefits: ['మోకాళ్ల కీళ్లలో జిడ్డును పెంచుతుంది', 'తీవ్రమైన మోకాళ్ల నొప్పులను తగ్గిస్తుంది', 'రక్త ప్రసరణను మెరుగుపరుస్తుంది', 'వాత నరాల బలహీనతను తగ్గిస్తుంది'],
      ingredients: ['మహానారాయణ తైలం (లేదా నువ్వుల నూనె) - 4 టేబుల్ స్పూన్లు', 'కర్పూరం - చిటికెడు', 'పరిశుభ్రమైన నూలు గుడ్డ'],
      preparation: '1. నూనెను స్వల్పంగా వేడి చేయండి.\n2. చిటికెడు కర్పూరం కలపండి.\n3. నూలు గుడ్డను వెచ్చని నూనెలో ముంచి 15-20 నిమిషాలు మోకాలుపై వేసి ఉంచండి.',
      dosage: 'రోజుకు ఒకసారి సాయంత్రం లేదా స్నానం తర్వాత వేడి పట్టు వేయండి.',
      warnings: ['నూనె మరీ వేడిగా ఉండకూడదు, గోరువెచ్చగా మాత్రమే ఉండాలి.', 'గాయాలు ఉన్న చోట రాయకూడదు.']
    }
  },
  rem_9: {
    en: {
      title: 'Sunthi (Dry Ginger) & Castor Oil Paste for Inflammatory Knee Swelling',
      description: 'A soothing topical ginger-castor paste (Lepa) formulated to draw out fluid accumulation, reduce joint swelling (Ama Vata), and restore knee flex.',
      benefits: ['Reduces joint fluid accumulation & swelling', 'Draws out Ama (metabolic toxins)', 'Restores smooth knee flexion', 'Soothes acute joint inflammation'],
      ingredients: ['Dry Ginger Powder (Sunthi) - 2 teaspoons', 'Pure Castor Oil - 1 tablespoon', 'Warm Water - 1 teaspoon'],
      preparation: '1. Mix dry ginger powder with castor oil and a splash of warm water to form a smooth paste.\n2. Apply evenly over the affected knee joint.\n3. Cover loosely with a cloth for 30 minutes, then wash with warm water.',
      dosage: 'Apply topically once daily for 5-7 days during swelling.',
      warnings: ['Perform a small patch test on skin first.', 'Discontinue if redness or skin irritation occurs.']
    },
    hi: {
      title: 'सूजन और घुटने की जकड़न के लिए सोंठ और एरंड तेल का लेप',
      description: 'घुटनों में जमा पानी/सूजन को खींचने, आमवात को शांत करने और घुटने के मोड़ने को आसान बनाने वाला एक प्रभावी लेप।',
      benefits: ['जोड़ों की सूजन और पानी का जमाव कम करता है', 'विषैले तत्वों (आम) को बाहर निकालता है', 'घुटने मोड़ने में आसानी प्रदान करता है', 'सूजन रोधी प्रभाव दिखाता है'],
      ingredients: ['सोंठ पाउडर (शुष्क अदरक) - 2 छोटे चम्मच', 'शुद्ध एरंड (कैस्टर) का तेल - 1 बड़ा चम्मच', 'गुनगुना पानी - 1 छोटा चम्मच'],
      preparation: '1. सोंठ पाउडर, एरंड तेल और गुनगुने पानी को मिलाकर गाढ़ा लेप बनाएं।\n2. प्रभावित घुटने पर समान रूप से लगाएं।\n3. 30 मिनट तक रखें, फिर गुनगुने पानी से धो लें।',
      dosage: 'सूजन रहने पर दिन में एक बार 5-7 दिनों तक लगाएं।',
      warnings: ['पहले त्वचा पर पैच टेस्ट करें।', 'रेडनेस होने पर उपयोग बंद कर दें।']
    },
    te: {
      title: 'మోకాళ్ల వాపు మరియు నొప్పులకు శొంటి, ఆముదం లేపనం',
      description: 'మోకాళ్లలో చేరుకున్న నీరు మరియు వాపును లాగివేసి, కీళ్ల కదలికలను సులభతరం చేసే శొంటి-ఆముదం లేపనం.',
      benefits: ['మోకాళ్లలో నీరు పటడం మరియు వాపును తగ్గిస్తుంది', 'శరీరంలోని టాక్సిన్స్ (ఆమము) నివారిస్తుంది', 'మోకాళ్లు వంచడానికి వీలు కలిగిస్తుంది', 'కీళ్ల మంటను తగ్గిస్తుంది'],
      ingredients: ['శొంటి పొడి - 2 టీస్పూన్లు', 'మంచి ఆముదం - 1 టేబుల్ స్పూన్', 'గోరువెచ్చని నీరు - 1 టీస్పూన్'],
      preparation: '1. శొంటి పొడి, ఆముదం మరియు కొద్దిగా గోరువెచ్చని నీరు కలిపి మెత్తటి లేపనం తయారుచేయండి.\n2. మోకాలుపై సమానంగా రాయండి.\n3. 30 నిమిషాల తర్వాత గోరువెచ్చని నీటితో కడిగివేయండి.',
      dosage: 'వాపు ఉన్నప్పుడు రోజుకు ఒకసారి 5-7 రోజులు వర్తించండి.',
      warnings: ['ముందుగా చర్మంపై చిన్న పరీక్ష (ప్యాచ్ టెస్ట్) చేయండి.', 'చర్మం ఎర్రబడితే వాడటం ఆపండి.']
    }
  },
  rem_10: {
    en: {
      title: 'Fenugreek (Methi) & Flaxseed Porridge for Osteoarthritis & Lubrication',
      description: 'A warm dietary porridge rich in Omega-3 fatty acids and phyto-nutrients that nourishes Synovial fluid (Shleshaka Kapha) and protects joint movement.',
      benefits: ['Nourishes synovial joint fluid', 'Provides natural Omega-3 anti-inflammatory fats', 'Reduces joint crepitus & cracking sounds', 'Relieves Vata joint dryness'],
      ingredients: ['Fenugreek Seeds (soaked overnight) - 1 teaspoon', 'Roasted Flaxseeds (ground) - 1 tablespoon', 'Milk or Almond Milk - 1 cup', 'Organic Jaggery - 1 teaspoon'],
      preparation: '1. Boil soaked fenugreek seeds and flaxseed meal in milk for 8 minutes.\n2. Sweeten with natural jaggery and serve warm.',
      dosage: 'Consume 1 bowl warm in the morning as breakfast support.',
      warnings: ['Fenugreek is slightly warming; reduce dose if experiencing nosebleeds or body heat.']
    },
    hi: {
      title: 'ऑस्टियोआर्थराइटिस और चिकनाई के लिए मेथी और अलसी की दलिया/खीर',
      description: 'ओमेगा-3 और पोषक तत्वों से भरपूर एक पौष्टिक दलिया जो जोड़ों के द्रव (साइनोवियल फ्लूइड) का पोषण करता है और कटकट की आवाज को रोकता है।',
      benefits: ['जोड़ों के प्राकृतिक द्रव को पोषण देता है', 'ओमेगा-3 सूजनरोधी फैट प्रदान करता है', 'जोड़ों के कटकटाने की आवाज कम करता है', 'वात की शुष्कता को दूर करता है'],
      ingredients: ['मेथी दाना (रात भर भीगा हुआ) - 1 छोटा चम्मच', 'भुने हुए अलसी के बीज का पाउडर - 1 बड़ा चम्मच', 'दूध - 1 कप', 'गुड़ - 1 छोटा चम्मच'],
      preparation: '1. भीगी मेथी और अलसी पाउडर को दूध में 8 मिनट तक उबालें।\n2. गुड़ मिलाकर गर्म-गर्म खाएं।',
      dosage: 'सुबह नाश्ते में 1 कटोरी गर्म सेवन करें।',
      warnings: ['अत्यधिक शरीर की गर्मी होने पर मात्रा कम करें।']
    },
    te: {
      title: 'మోకాళ్ల అరుగుదల (ఆర్థరైటిస్) & జిడ్డు కోసం మెంతులు, అవిసె గింజల జావ',
      description: 'ఒమేగా-3 మరియు పోషకాలు సమృద్ధిగా ఉండే ఆయుర్వేద ఆహారం. ఇది మోకాళ్లలోని జిడ్డును (సైనోవియల్ ఫ్లూయిడ్) పెంచి, కీళ్లు శబ్దం చేయడాన్ని తగ్గిస్తుంది.',
      benefits: ['కీళ్లలోని జిడ్డును పెంపొందిస్తుంది', 'సహజమైన ఒమేగా-3 క్రొవ్వు ఆమ్లాలను అందిస్తుంది', 'కీళ్లు సప్పుడు చేయడాన్ని తగ్గిస్తుంది', 'ఎముకల పొడిబారడాన్ని నివారిస్తుంది'],
      ingredients: ['నానబెట్టిన మెంతులు - 1 టీస్పూన్', 'వేయించిన అవిసె గింజల పొడి - 1 టేబుల్ స్పూన్', 'పాలు - 1 కప్పు', 'బెల్లం - 1 టీస్పూన్'],
      preparation: '1. పాలల్లో నానబెట్టిన మెంతులు మరియు అవిసె పొడి వేసి 8 నిమిషాలు మరిగించండి.\n2. బెల్లం కలిపి వేడిగా తీసుకోండి.',
      dosage: 'ఉదయం అల్పాహారంగా 1 కప్పు వేడిగా తీసుకోండి.',
      warnings: ['వేడి చేసే తత్త్వం ఉన్నవారు మోతాదు తగ్గించాలి.']
    }
  },
  rem_11: {
    en: {
      title: 'Dashamoola Kashayam for Lower Back & Sciatica Nerve Pain',
      description: 'The famous ten-root classic Ayurvedic decoction (Dashamoola) that specifically targets spinal stiffness, sciatica, lower back strain, and nerve pain.',
      benefits: ['Relieves sciatica & back strain', 'Soothes spinal nerve inflammation', 'Strengthens spinal column & hips', 'Deeply grounds aggravated Vata'],
      ingredients: ['Dashamoola Churna - 1 teaspoon', 'Dry Ginger Powder - 1/4 teaspoon', 'Water - 2 cups'],
      preparation: '1. Combine Dashamoola powder and ginger in 2 cups of water.\n2. Boil on medium heat until reduced to 1/2 cup.\n3. Strain and drink warm.',
      dosage: 'Drink 1/2 cup warm in the morning or bedtime.',
      warnings: ['Consult an Ayurvedic doctor if taking prescribed blood thinners.']
    },
    hi: {
      title: 'कमर दर्द और साइटिका नसों के दर्द के लिए दशमूल कषायम',
      description: 'दस जड़ियों के मिश्रण से बना प्रसिद्ध दशमूल काढ़ा जो रीढ़ की जकड़न, साइटिका और नसों के खिंचाव को जड़ से शांत करता है।',
      benefits: ['साइटिका और कमर दर्द से राहत देता है', 'नसों की सूजन को शांत करता है', 'रीढ़ की हड्डी और कूल्हों को मजबूत करता है', 'वात दोष को संतुलित करता है'],
      ingredients: ['दशमूल चूर्ण - 1 छोटा चम्मच', 'सोंठ पाउडर - 1/4 छोटा चम्मच', 'पानी - 2 कप'],
      preparation: '1. 2 कप पानी में दशमूल और सोंठ मिलाकर उबालें।\n2. 1/2 कप रहने तक पकाएं और छान लें।',
      dosage: 'सुबह या रात को सोने से पहले 1/2 कप गुनगुना पिएं।',
      warnings: ['रक्त पतला करने वाली दवाइयां लेने वाले डॉक्टर से परामर्श करें।']
    },
    te: {
      title: 'నడుము నొప్పి & సైటికా నరాల నొప్పుల కోసం దశమూల కషాయం',
      description: 'పది మూలికల సమ్మేళనంతో తయారయ్యే దశమూల కషాయం నడుము నొప్పి, సైటికా మరియు వెన్నుముక బిగుతును నివారిస్తుంది.',
      benefits: ['సైటికా మరియు నడుము నొప్పిని తగ్గిస్తుంది', 'నరాల వాపును నివారిస్తుంది', 'వెన్నుముకను దృఢపరుస్తుంది', 'తీవ్రమైన వాత దోషాన్ని శాంతింపజేస్తుంది'],
      ingredients: ['దశమూల చూర్ణం - 1 టీస్పూన్', 'శొంటి పొడి - 1/4 టీస్పూన్', 'నీరు - 2 కప్పులు'],
      preparation: '1. 2 కప్పుల నీటిలో దశమూల చూర్ణం, శొంటి వేసి మరిగించండి.\n2. సగం కప్పు అయ్యే వరకు సన్నని మంటపై మరిగించి వడకట్టండి.',
      dosage: 'ఉదయం లేదా రాత్రి పడుకునే ముందు 1/2 కప్పు వేడిగా తాగండి.',
      warnings: ['రక్తాన్ని పలచబరిచే మందులు వాడేవారు వైద్యుల సలహా తీసుకోండి.']
    }
  },
  rem_12: {
    en: {
      title: 'Hadjod (Bone Setter) & Turmeric Milk for Bone Density & Ligament Repair',
      description: "Hadjod (Cissus quadrangularis) is Ayurveda's legendary bone-building herb. Paired with turmeric, it accelerates ligament recovery and fortifies knee bone density.",
      benefits: ['Strengthens bone mineral density', 'Repairs strained knee ligaments', 'Fast-tracks joint recovery', 'Reduces calcification discomfort'],
      ingredients: ['Hadjod Powder - 1/4 teaspoon', 'Turmeric Powder - 1/4 teaspoon', 'Cow Milk or Sesame Milk - 1 cup', 'Raw Honey - 1/2 teaspoon'],
      preparation: '1. Whisk Hadjod and turmeric powder into warm milk.\n2. Simmer gently for 3 minutes.\n3. Let cool to lukewarm and stir in raw honey.',
      dosage: 'Drink 1 cup warm once daily after dinner.',
      warnings: ['Do not exceed recommended dosage.', 'Not advised for children without physician guidance.']
    },
    hi: {
      title: 'हड्डी की मजबूती और लिगामेंट मरम्मत के लिए हड़जोड़ और हल्दी दूध',
      description: 'हड़जोड़ (अस्थिसंहारक) आयुर्वेद की प्रसिद्ध हड्डी जोड़ने वाली बूटी है। यह घुटने के लिगामेंट और हड्डियों को मजबूत बनाती है।',
      benefits: ['हड्डियों के घनत्व (बोन डेंसिटी) को बढ़ाता है', 'घुटने के लिगामेंट खिंचाव को ठीक करता है', 'जोड़ों की रिकवरी तेज करता है', 'कैल्शियम अवशोषण में मदद करता है'],
      ingredients: ['हड़जोड़ पाउडर - 1/4 छोटा चम्मच', 'हल्दी पाउडर - 1/4 छोटा चम्मच', 'दूध - 1 कप', 'शहद - 1/2 छोटा चम्मच'],
      preparation: '1. गर्म दूध में हड़जोड़ और हल्दी मिलाएं।\n2. 3 मिनट तक धीमी आंच पर पकाएं और गुनगुना होने पर शहद मिलाएं।',
      dosage: 'रात को खाने के बाद 1 कप गर्म पिएं।',
      warnings: ['निर्धारित मात्रा से अधिक न लें।']
    },
    te: {
      title: 'ఎముకల బలం & లిగమెంట్ మరమ్మత్తు కోసం నల్లేరు (హడ్జోడ్), పసుపు పాలు',
      description: 'ఆయుర్వేదంలో ఎముకలను దృఢపరిచే సంజీవని "నల్లేరు". ఇది మోకాళ్ల లిగమెంట్ గాయాలను మాన్పి ఎముకల సాంద్రతను పెంచుతుంది.',
      benefits: ['ఎముకల బలాన్ని పెంచుతుంది', 'మోకాళ్ల లిగమెంట్ల నొప్పులను తగ్గిస్తుంది', 'కీళ్లు త్వరగా కోలుకోవడానికి దోహదపడుతుంది', 'కాల్సిఫికేషన్ సమస్యను నివారిస్తుంది'],
      ingredients: ['నల్లేరు చూర్ణం - 1/4 టీస్పూన్', 'పసుపు - 1/4 టీస్పూన్', 'పాలు - 1 కప్పు', 'తేనె - 1/2 టీస్పూన్'],
      preparation: '1. వేడి పాలల్లో నల్లేరు చూర్ణం, పసుపు కలపండి.\n2. 3 నిమిషాలు మరిగించి, గోరువెచ్చగా అయ్యాక తేనె కలపండి.',
      dosage: 'రాత్రి భోజనం తర్వాత 1 కప్పు పాలు తీసుకోండి.',
      warnings: ['తగిన మోతాదు కంటే ఎక్కువ తీసుకోకూడదు.']
    }
  },
  rem_13: {
    en: {
      title: 'Guggulu & Ajwain Warm Herbal Compress for Morning Joint Stiffness',
      description: 'A warming herbal steam compress (Potali Sweda) using Carom seeds (Ajwain) and Guggulu to melt morning stiffness and improve joint flexion.',
      benefits: ['Melts morning joint stiffness', 'Improves knee flexion angle', 'Relieves muscle spasms around joints', 'Enhances local tissue circulation'],
      ingredients: ['Ajwain (Carom) Seeds - 3 tablespoons', 'Rock Salt - 1 tablespoon', 'Garlic - 2 crushed cloves', 'Clean Cotton Pouch'],
      preparation: '1. Dry roast Ajwain seeds, rock salt, and garlic on a pan until fragrant.\n2. Tie tightly into a cotton pouch (Potali).\n3. Warm the pouch on a dry pan and gently press onto the stiff knee.',
      dosage: 'Apply warm Potali compress for 10-15 minutes twice daily.',
      warnings: ['Test temperature on forearm before applying to avoid heat discomfort.']
    },
    hi: {
      title: 'सुबह की जोड़ों की जकड़न के लिए अजवाइन और गुग्गुलु पोटली सेक',
      description: 'अजवाइन, सेंधा नमक और लहसुन की गर्म पोटली सेक (पोटली स्वेद) जो सुबह घुटनों के कड़ेपन को पिघलाकर मोड़ने योग्य बनाती है।',
      benefits: ['सुबह की जोड़ों की जकड़न दूर करती है', 'घुटने मोड़ने के लचीलेपन में सुधार करती है', 'मांसपेशियों की ऐंठन से राहत देती है', 'रक्त प्रवाह बढ़ाती है'],
      ingredients: ['अजवाइन - 3 बड़े चम्मच', 'सेंधा नमक - 1 बड़ा चम्मच', 'लहसुन - 2 कुचली कलियां', 'सूती कपड़े की पोटली'],
      preparation: '1. तवे पर अजवाइन, सेंधा नमक और लहसुन को भूनें।\n2. कपड़े में बांधकर पोटली बनाएं।\n3. तवे पर हल्का गर्म करके घुटने पर सेक करें।',
      dosage: 'दिन में दो बार 10-15 मिनट गर्म सेक करें।',
      warnings: ['त्वचा पर लगाने से पहले तापमान की जांच करें।']
    },
    te: {
      title: 'ఉదయాన్నే కీళ్ల బిగుతు కోసం వాము, సైంధవ లవణం పొట్లం కాపడం',
      description: 'వాము, కల్లుప్పు, వెల్లుల్లితో చేసే వేడి పొట్లం కాపడం (పొటలి స్వేదం). ఇది ఉదయాన్నే మోకాళ్లు వంచలేకపోవడం మరియు బిగుతుగా ఉండటాన్ని తగ్గిస్తుంది.',
      benefits: ['ఉదయాన్నే ఉండే కీళ్ల బిగుతును కరిగిస్తుంది', 'మోకాళ్లు ఉంచడానికి సులువు చేస్తుంది', 'కండరాల పట్టును సడలిస్తుంది', 'స్థానిక రక్త ప్రసరణను పెంచుతుంది'],
      ingredients: ['వాము - 3 టేబుల్ స్పూన్లు', 'సైంధవ లవణం/రాతి ఉప్పు - 1 టేబుల్ స్పూన్', 'వెల్లుల్లి రేకలు - 2', 'నూలు గుడ్డ పొట్లం'],
      preparation: '1. పెనంపై వాము, రాతి ఉప్పు, వెల్లుల్లి దోరగా వేయించండి.\n2. నూలు గుడ్డలో వేసి పొట్లం కట్టండి.\n3. పెనంపై వేడి చేస్తూ మోకాలుపై కాపడం పెట్టండి.',
      dosage: 'రోజుకు రెండుసార్లు 10-15 నిమిషాలు కాపడం పెట్టండి.',
      warnings: ['చర్మం కాలకుండా ఉందో లేదో చేతిపై చూసి కాపడం పెట్టండి.']
    }
  },
  rem_14: {
    en: {
      title: 'Punarnava & Giloy Decoction for Gout & High Uric Acid Joint Pain',
      description: 'A purifying Ayurvedic herbal remedy that promotes kidney uric acid excretion, reduces gout flare-ups, and relieves swelling in big toes and knees.',
      benefits: ['Flushes excess uric acid from blood', 'Relieves gout toe & knee joint pain', 'Reduces inflammatory swelling', 'Purifies blood tissue (Rakta Dhatu)'],
      ingredients: ['Punarnava Powder - 1/2 teaspoon', 'Giloy (Guduchi) Stem or Powder - 1/2 teaspoon', 'Coriander Seeds - 1/2 teaspoon', 'Water - 2 cups'],
      preparation: '1. Boil Punarnava, Giloy, and coriander seeds in 2 cups of water.\n2. Reduce to 1 cup, strain, and let cool to room temperature.',
      dosage: 'Drink 1/2 cup twice daily before meals.',
      warnings: ['Keep well hydrated with warm water throughout the day.']
    },
    hi: {
      title: 'गाउट और यूरिक एसिड के दर्द के लिए पुनर्नवा और गिलोय काढ़ा',
      description: 'रक्त से अत्यधिक यूरिक एसिड को बाहर निकालने, गाउट के दर्द को दूर करने और अंगूठे व घुटनों की सूजन घटाने वाला शोधक काढ़ा।',
      benefits: ['यूरिक एसिड को शरीर से बाहर निकालता है', 'गाउट और जोड़ों के तीव्र दर्द में राहत देता है', 'सूजन को कम करता है', 'रक्त को शुद्ध करता है'],
      ingredients: ['पुनर्नवा पाउडर - 1/2 छोटा चम्मच', 'गिलोय चूर्ण या तना - 1/2 छोटा चम्मच', 'साबुत धनिया - 1/2 छोटा चम्मच', 'पानी - 2 कप'],
      preparation: '1. 2 कप पानी में पुनर्नवा, गिलोय और धनिया उबालें।\n2. 1 कप रहने पर छान लें और गुनगुना पिएं।',
      dosage: 'भोजन से पहले दिन में दो बार 1/2 कप पिएं।',
      warnings: ['दिन भर पर्याप्त गुनगुना पानी पिएं।']
    },
    te: {
      title: 'గౌట్ నొప్పులు & యూరిక్ యాసిడ్ నివారణకు పునర్నవ, తిప్పతీగ కషాయం',
      description: 'రక్తంలో పేరుకుపోయిన అధిక యూరిక్ యాసిడ్‌ను మూత్రపిండాల ద్వారా బయటకు పంపి, కాలి బొటనవేలు, మోకాళ్ల వాపులను తగ్గించే ఆయుర్వేద కషాయం.',
      benefits: ['అధిక యూరిక్ యాసిడ్‌ను బయటకు పంపుతుంది', 'గౌట్ మోకాళ్ల నొప్పులను తగ్గిస్తుంది', 'వాపులు మరియు మంటను నివారిస్తుంది', 'రక్తాన్ని శుద్ధి చేస్తుంది'],
      ingredients: ['పునర్నవ పొడి - 1/2 టీస్పూన్', 'తిప్పతీగ పొడి - 1/2 టీస్పూన్', 'ధనియాలు - 1/2 టీస్పూన్', 'నీరు - 2 కప్పులు'],
      preparation: '1. 2 కప్పుల నీటిలో పునర్నవ, తిప్పతీగ, ధనియాలు మరిగించండి.\n2. 1 కప్పు అయ్యే వరకు ఉంచి వడకట్టండి.',
      dosage: 'భోజనానికి ముందు రోజుకు రెండుసార్లు 1/2 కప్పు తాగండి.',
      warnings: ['రోజంతా తగినంత గోరువెచ్చని నీరు తాగుతూ ఉండాలి.']
    }
  },
  rem_15: {
    en: {
      title: 'Bala & Ashwagandha Nourishing Tonic for Knee Weakness & Muscle Atrophy',
      description: 'A restorative Rasayana formula containing Country Mallow (Bala) and Ashwagandha to rebuild quadriceps muscle strength supporting the knee joint.',
      benefits: ['Builds muscle strength around knees', 'Prevents knee joint instability', 'Rejuvenates nervous system', 'Supports senior leg agility'],
      ingredients: ['Bala Powder - 1/2 teaspoon', 'Ashwagandha Powder - 1/2 teaspoon', 'Warm Milk - 1 cup', 'Ghee - 1/2 teaspoon'],
      preparation: '1. Simmer Bala and Ashwagandha powders in milk with ghee for 5 minutes.\n2. Serve warm.',
      dosage: 'Drink 1 cup warm daily after breakfast or dinner.',
      warnings: ['Avoid during acute fever or indigestion (Ama).']
    },
    hi: {
      title: 'घुटनों की कमजोरी और मांसपेशियों की ताकत के लिए बला व अश्वगंधा टॉनिक',
      description: 'घुटने के चारों ओर की मांसपेशियों (क्वार्ड्स) को मजबूत बनाने और बुजुर्गों की चलने की शक्ति बढ़ाने वाला पौष्टिक रसायन।',
      benefits: ['घुटने की मांसपेशियों को मजबूती देता है', 'जोड़ों के लचकने/अस्थिरता को रोकता है', 'तंत्रिका तंत्र को पुनर्जीवित करता है', 'पैरों की शक्ति बढ़ाता है'],
      ingredients: ['बला पाउडर - 1/2 छोटा चम्मच', 'अश्वगंधा पाउडर - 1/2 छोटा चम्मच', 'गर्म दूध - 1 कप', 'गाय का घी - 1/2 छोटा चम्मच'],
      preparation: '1. दूध में बला, अश्वगंधा और घी डालकर 5 मिनट पकाएं।\n2. गुनगुना पिएं।',
      dosage: 'दिन में एक बार भोजन के बाद 1 कप पिएं।',
      warnings: ['बुखार या अपच होने पर न लें।']
    },
    te: {
      title: 'మోకాళ్ల బలహీనత & కండరాల దృఢత్వం కోసం ముత్తిరముత్యము (బలా), అశ్వగంధ టానిక్',
      description: 'మోకాళ్ల చుట్టూ ఉండే కండరాలను దృఢపరిచి, వయస్సు పైబడిన వారిలో నడిచే శక్తిని పెంపొందించే అద్భుతమైన ఆయుర్వేద రసాయనం.',
      benefits: ['మోకాళ్ల చుట్టూ కండరాల బలాన్ని పెంచుతుంది', 'కీళ్లు తొలగిపోకుండా కాపాడుతుంది', 'నరాల బలహీనతను తొలగిస్తుంది', 'కాళ్ల నడకను వేగవంతం చేస్తుంది'],
      ingredients: ['బలా చూర్ణం - 1/2 టీస్పూన్', 'అశ్వగంధ పొడి - 1/2 టీస్పూన్', 'వేడి పాలు - 1 కప్పు', 'ఆవు నెయ్యి - 1/2 టీస్పూన్'],
      preparation: '1. పాలల్లో బలా, అశ్వగంధ, నెయ్యి వేసి 5 నిమిషాలు మరిగించండి.\n2. వేడిగా ఉన్నప్పుడు తాగండి.',
      dosage: 'రోజుకు ఒకసారి ఉదయం లేదా రాత్రి 1 కప్పు తీసుకోండి.',
      warnings: ['జ్వరం లేదా అజీర్తి ఉన్నప్పుడు వాడకూడదు.']
    }
  },
  rem_16: {
    en: {
      title: 'Eucalyptus & Camphor Liniment for Acute Knee Soreness & Spasms',
      description: 'A fast-acting cooling-warming herbal liniment that penetrates deep into sore knee tendons, easing acute muscle tightness and sports soreness.',
      benefits: ['Rapid pain relief for knee soreness', 'Soothes muscle spasms & cramps', 'Cools tendon inflammation', 'Improves local circulation'],
      ingredients: ['Coconut Oil - 3 tablespoons', 'Eucalyptus Essential Oil - 5 drops', 'Edible Camphor - 1/4 teaspoon'],
      preparation: '1. Dissolve camphor in warm coconut oil.\n2. Stir in eucalyptus oil drops.\n3. Gently rub into knee joint with light upward strokes.',
      dosage: 'Apply 2-3 times daily as needed for pain.',
      warnings: ['External application only.', 'Keep away from eyes and broken skin.']
    },
    hi: {
      title: 'घुटने के दर्द और ऐंठन के लिए नीलगिरी और कपूर का तेल',
      description: 'घुटनों के स्नायुबंधन (टेंडन) और मांसपेशियों की ऐंठन को तुरंत शांत करने वाला ठंडा-गर्म जड़ी-बूटी तेल।',
      benefits: ['दर्द से तुरंत राहत प्रदान करता है', 'मांसपेशियों की ऐंठन और ऐंठन शांत करता है', 'टेंडन की सूजन घटाता है', 'स्थानीय रक्त संचार बढ़ाता है'],
      ingredients: ['नारियल का तेल - 3 बड़े चम्मच', 'नीलगिरी (युकलिप्टस) का तेल - 5 बूंदें', 'कपूर - 1/4 छोटा चम्मच'],
      preparation: '1. गर्म नारियल तेल में कपूर घोलें।\n2. नीलगिरी तेल मिलाएं।\n3. घुटने पर ऊपर की ओर हल्के हाथ से मालिश करें।',
      dosage: 'दर्द होने पर दिन में 2-3 बार मालिश करें।',
      warnings: ['केवल बाहरी उपयोग के लिए। आंख से दूर रखें।']
    },
    te: {
      title: 'మోకాళ్ల తీవ్రమైన నొప్పి & కండరాల పట్టు కోసం నీలగిరి, కర్పూరం తైలం',
      description: 'మోకాళ్ల నరాల పట్టు మరియు తీవ్రమైన నొప్పుల నుండి తక్షణ ఉపశమనం అందించే వేడి-చల్లని మూలికా తైలం.',
      benefits: ['మోకాళ్ల నొప్పుల నుండి తక్షణ ఉపశమనం ఇస్తుంది', 'కండరాల పట్టు మరియు తిమ్మిర్లను తగ్గిస్తుంది', 'నరాల మంటను నివారిస్తుంది', 'రక్త ప్రసరణను మెరుగుపరుస్తుంది'],
      ingredients: ['కొబ్బరి నూనె - 3 టేబుల్ స్పూన్లు', 'నీలగిరి తైలం - 5 చుక్కలు', 'పచ్చ కర్పూరం - 1/4 టీస్పూన్'],
      preparation: '1. వెచ్చని కొబ్బరి నూనెలో కర్పూరాన్ని కరిగించండి.\n2. నీలగిరి నూనె చుక్కలు కలపండి.\n3. మోకాలుపై క్రింది నుండి పైకి మెల్లగా మర్దన చేయండి.',
      dosage: 'నొప్పి ఉన్నప్పుడు రోజుకు 2-3 సార్లు రాయండి.',
      warnings: ['బాహ్య వాడకానికి మాత్రమే. కళ్లలోకి పోకుండా చూసుకోండి.']
    }
  },
  rem_17: {
    en: {
      title: 'Neem, Turmeric & Aloe Vera Face Lepa for Acne & Glowing Skin',
      description: 'A purifying herbal face mask (Lepa) that cools excess Pitta, detoxifies skin pores, clears blemishes, and restores natural radiance.',
      benefits: ['Clears acne & pimple breakouts', 'Reduces dark spots & pigmentation', 'Cools skin inflammation & redness', 'Balances excess skin sebum'],
      ingredients: ['Neem Leaf Powder - 1 teaspoon', 'Wild Turmeric (Kasturi Manjal) - 1/2 teaspoon', 'Pure Aloe Vera Gel - 1 tablespoon', 'Rose Water - 1 teaspoon'],
      preparation: '1. Mix neem leaf powder and wild turmeric in a small bowl.\n2. Add fresh aloe vera gel and rose water, stirring into a smooth paste.\n3. Apply evenly to clean face, avoiding the eye area.\n4. Leave on for 15-20 minutes until dry, then rinse with lukewarm water.',
      dosage: 'Apply 2-3 times a week for glowing skin.',
      warnings: ['Perform a patch test behind the ear prior to first application.', 'Avoid using on open cuts or active bleeding skin lesions.']
    },
    hi: {
      title: 'मुंहासों और दमकती त्वचा के लिए नीम, हल्दी और एलोवेरा लेप',
      description: 'अतिरिक्त पित्त को शांत करने, त्वचा के छिद्रों को साफ करने, दाग-धब्बे हटाने और प्राकृतिक चमक लाने वाला एक शोधक आयुर्वेदिक फेस पैक।',
      benefits: ['कील-मुंहासे और पिंपल्स दूर करता है', 'काले धब्बे और झाइयों को कम करता है', 'त्वचा की जलन और लाली शांत करता है', 'त्वचा के अतिरिक्त तेल को संतुलित करता है'],
      ingredients: ['नीम के पत्तों का पाउडर - 1 छोटा चम्मच', 'कस्तूरी हल्दी - 1/2 छोटा चम्मच', 'शुद्ध एलोवेरा जेल - 1 बड़ा चम्मच', 'गुलाब जल - 1 छोटा चम्मच'],
      preparation: '1. कटोरी में नीम पाउडर और कस्तूरी हल्दी मिलाएं।\n2. एलोवेरा जेल और गुलाब जल मिलाकर गाढ़ा लेप बनाएं।\n3. चेहरे पर 15-20 मिनट लगाएं, फिर गुनगुने पानी से धो लें।',
      dosage: 'सप्ताह में 2-3 बार चेहरे पर लगाएं।',
      warnings: ['उपयोग से पहले कान के पीछे पैच टेस्ट करें।', 'कटे-छिले स्थानों पर न लगाएं।']
    },
    te: {
      title: 'మొటిమలు & కాంతివంతమైన చర్మం కోసం వేప, పసుపు, కలబంద లేపనం',
      description: 'రక్తాన్ని శుద్ధి చేసి, చర్మరంధ్రాలలోని మలినాలను తొలగించి, పిత్త దోషాన్ని నివారించే ఆయుర్వేద ముఖ లేపనం.',
      benefits: ['మొటిమలు మరియు మచ్చలను నివారిస్తుంది', 'చర్మంపై నల్లటి మచ్చలను తగ్గిస్తుంది', 'చర్మ మంట మరియు ఎర్రబడటాన్ని తగ్గిస్తుంది', 'చర్మ నూనె శాతాన్ని సమతుల్యం చేస్తుంది'],
      ingredients: ['వేప పొడి - 1 టీస్పూన్', 'కస్తూరి పసుపు - 1/2 టీస్పూన్', 'కలబంద గుజ్జు - 1 టేబుల్ స్పూన్', 'గులాబీ నీరు - 1 టీస్పూన్'],
      preparation: '1. గిన్నెలో వేప పొడి, కస్తూరి పసుపు కలపండి.\n2. కలబంద గుజ్జు, గులాబీ నీరు చేర్చి మెత్తటి లేపనం చేయండి.\n3. ముఖానికి రాసి 15-20 నిమిషాల తర్వాత గోరువెచ్చని నీటితో కడగండి.',
      dosage: 'వారానికి 2-3 సార్లు ముఖానికి రాసుకోండి.',
      warnings: ['మొదట చెవి వెనుక భాగంలో చిన్న ప్యాచ్ టెస్ట్ చేయండి.', 'గాయాలున్న చోట రాయకూడదు.']
    }
  },
  rem_18: {
    en: {
      title: 'Bhringraj, Amla & Coconut Oil Massage for Hair Loss & Scalp Strength',
      description: 'A classic Ayurvedic scalp treatment infused with "King of Hair" (Bhringraj) and Gooseberry (Amla) to stimulate follicles, reduce hair fall, and prevent early graying.',
      benefits: ['Promotes thick hair follicle growth', 'Strengthens hair roots & prevents breakage', 'Soothes dry scalp & clears dandruff', 'Prevents premature graying of hair'],
      ingredients: ['Bhringraj Powder - 1 tablespoon', 'Amla Powder - 1 tablespoon', 'Pure Coconut Oil or Sesame Oil - 1/2 cup', 'Curry Leaves - 8-10 fresh leaves'],
      preparation: '1. Warm coconut oil in a small pan on low heat.\n2. Add Bhringraj powder, Amla powder, and fresh curry leaves.\n3. Simmer gently for 8-10 minutes until oil darkens slightly.\n4. Strain the oil into a glass jar and let cool until lukewarm.\n5. Gently massage into scalp in circular motions for 10 minutes.',
      dosage: 'Apply to scalp twice weekly, leave for 1 hour or overnight before washing.',
      warnings: ['Ensure oil is lukewarm, not hot, before scalp massage.', 'Rinse thoroughly with mild natural shampoo.']
    },
    hi: {
      title: 'बालों के झड़ने और मजबूती के लिए भृंगराज, आंवला और नारियल तेल मालिश',
      description: 'भृंगराज और आंवला से समृद्ध एक प्रामाणिक आयुर्वेदिक तेल जो बालों की जड़ों को मजबूत बनाता है, झड़ना रोकता है और समय से पहले सफेद होने से बचाता है।',
      benefits: ['घने बालों के विकास को बढ़ावा देता है', 'जड़ों को मजबूत बनाता है और टूटना रोकता है', 'रूसी (डैंड्रफ) को दूर करता है', 'असमय सफेद बालों की समस्या रोकता है'],
      ingredients: ['भृंगराज पाउडर - 1 बड़ा चम्मच', 'आंवला पाउडर - 1 बड़ा चम्मच', 'शुद्ध नारियल या तिल का तेल - 1/2 कप', 'कढ़ी पत्ते - 8-10'],
      preparation: '1. धीमी आंच पर नारियल तेल गर्म करें।\n2. भृंगराज, आंवला पाउडर और कढ़ी पत्ते डालें।\n3. 8-10 मिनट तक पकाएं, छान लें और गुनगुना होने पर सिर की मालिश करें।',
      dosage: 'सप्ताह में दो बार सिर की त्वचा पर 10 मिनट मालिश करें।',
      warnings: ['सिर पर लगाने से पहले तेल का तापमान जांचें।']
    },
    te: {
      title: 'జుట్టు రాలడం తగ్గడానికి & కుదుళ్ల బలానికి భృంగరాజ్ (గుంటగలగర), ఉసిరి నూనె',
      description: 'జుట్టుకు రాజైన భృంగరాజ్ మరియు ఉసిరితో చేసిన నూనె. ఇది కుదుళ్లను దృఢపరిచి, జుట్టు ఒత్తుగా పెరగడానికి, తెల్లబడకుండా ఉండటానికి సహాయపడుతుంది.',
      benefits: ['జుట్టు ఒత్తుగా పెరిగేలా చేస్తుంది', 'కుదుళ్లను దృఢపరిచి జుట్టు రాలడం తగ్గిస్తుంది', 'చుండ్రును తొలగించి మండే తత్త్వాన్ని తగ్గిస్తుంది', 'జుట్టు అకాలంగా తెల్లబడకుండా కాపాడుతుంది'],
      ingredients: ['గుంటగలగర (భృంగరాజ్) పొడి - 1 టేబుల్ స్పూన్', 'ఉసిరి పొడి - 1 టేబుల్ స్పూన్', 'కొబ్బరి నూనె - 1/2 కప్పు', 'కరివేపాకు - 8-10 ఆకులు'],
      preparation: '1. కొబ్బరి నూనెను సన్నని మంటపై వేడి చేయండి.\n2. భృంగరాజ్, ఉసిరి పొడి, కరివేపాకు వేసి 8-10 నిమిషాలు కాచండి.\n3. వడకట్టి, గోరువెచ్చగా ఉన్నప్పుడు తలకు మర్దన చేయండి.',
      dosage: 'వారానికి రెండుసార్లు తలకు రాయండి.',
      warnings: ['నూనె మరీ వేడిగా ఉన్నప్పుడు తలపై రాయకూడదు.']
    }
  },
  rem_19: {
    en: {
      title: 'Chyawanprash & Golden Warm Milk for Daily Vitality & Ojas',
      description: 'A time-honored daily Ayurvedic Rasayana ritual that nourishes all seven tissue layers (Dhatus), builds core energy (Ojas), and protects daily immunity.',
      benefits: ['Enhances daily energy & physical stamina', 'Nourishes all 7 body tissue layers (Dhatus)', 'Improves digestion & cellular metabolism', 'Strengthens respiratory immunity year-round'],
      ingredients: ['Authentic Herbal Chyawanprash - 1 tablespoon', 'Warm Cow Milk or Almond Milk - 1 cup', 'Cardamom Powder - 1 pinch'],
      preparation: '1. Warm a cup of milk gently on the stove with a pinch of cardamom.\n2. Consume 1 tablespoon of Chyawanprash slowly on an empty stomach.\n3. Sip the warm milk immediately after to enhance absorption into tissues.',
      dosage: 'Take 1 tablespoon every morning after waking up.',
      warnings: ['Diabetic individuals should select sugar-free Chyawanprash formulation.', 'Avoid taking milk immediately after acidic fruit juices.']
    },
    hi: {
      title: 'दैनिक ऊर्जा और ओजस के लिए च्यवनप्राश और गर्म दूध',
      description: 'सभी सात धातुओं का पोषण करने वाला, ओजस (आंतरिक शक्ति) बढ़ाने वाला और प्रतिरक्षा प्रणाली को मजबूत करने वाला एक पारंपरिक रसायन।',
      benefits: ['शारीरिक शक्ति और सहनशक्ति बढ़ाता है', 'शरीर की सभी 7 धातुओं का पोषण करता है', 'पाचन और चयापचय में सुधार करता है', 'श्वसन तंत्र को मजबूत बनाता है'],
      ingredients: ['आयुर्वेदिक च्यवनप्राश - 1 बड़ा चम्मच', 'गर्म दूध - 1 कप', 'इलायची पाउडर - 1 चुटकी'],
      preparation: '1. दूध में इलायची डालकर हल्का गर्म करें।\n2. खाली पेट 1 चम्मच च्यवनप्राश खाएं।\n3. ऊपर से गर्म दूध पिएं।',
      dosage: 'रोजाना सुबह खाली पेट 1 चम्मच सेवन करें।',
      warnings: ['मधुमेह के रोगी शुगर-फ्री च्यवनप्राश का चुनाव करें।']
    },
    te: {
      title: 'రోజువారీ నిరోధక శక్తి & ఓజస్సు కోసం చ్యవనప్రాశం, గోరువెచ్చని పాలు',
      description: 'శరీరంలోని సప్త ధాతువులను పోషించి, శరీర బలాన్ని (ఓజస్సు) పెంచి, రోగనిరోధక శక్తిని పెంపొందించే సాంప్రదాయ ఆయుర్వేద రసాయన మూలిక.',
      benefits: ['రోజువారీ ఉత్సాహాన్ని మరియు బలాన్ని ఇస్తుంది', 'సప్త ధాతువులకు పోషణనందిస్తుంది', 'జీర్ణక్రియను వేగవంతం చేస్తుంది', 'శ్వాసకోశ ఆరోగ్యానికి తోడ్పడుతుంది'],
      ingredients: ['చ్యవనప్రాశం - 1 టేబుల్ స్పూన్', 'గోరువెచ్చని పాలు - 1 కప్పు', 'యాలకుల పొడి - చిటికెడు'],
      preparation: '1. పాలల్లో చిటికెడు యాలకుల పొడి వేసి గోరువెచ్చగా చేయండి.\n2. ఉదయాన్నే పరిగడుపున 1 స్పూన్ చ్యవనప్రాశం తినండి.\n3. వెంటనే వేడి పాలు తాగండి.',
      dosage: 'ప్రతిరోజు ఉదయాన్నే 1 స్పూన్ తీసుకోండి.',
      warnings: ['షుగర్ వ్యాధిగ్రస్తులు షుగర్ రహిత చ్యవనప్రాశం వాడాలి.']
    }
  },
  rem_20: {
    en: {
      title: 'Triphala Water Bedtime Tonic for Daily Detox & Longevity',
      description: 'The foundational 3-fruit rejuvenation blend (Amalaki, Bibhitaki, Haritaki) taken every night to cleanse the digestive tract, brighten vision, and promote longevity.',
      benefits: ['Gently cleanses digestive system overnight', 'Supports liver detoxification & eye health', 'Promotes clear skin & metabolic balance', 'Balances all 3 Vata, Pitta & Kapha doshas'],
      ingredients: ['Organic Triphala Powder - 1/2 teaspoon', 'Luke-warm Water - 1 cup', 'Organic Honey - 1/2 teaspoon (optional)'],
      preparation: '1. Stir 1/2 teaspoon of Triphala powder into 1 cup of warm water.\n2. Let it infuse for 5 minutes.\n3. Add a dash of honey if desired once lukewarm, and sip slowly.',
      dosage: 'Drink 1 cup every night 30 minutes before sleep.',
      warnings: ['Reduce dosage if loose stools occur.', 'Do not consume during pregnancy without consulting your physician.']
    },
    hi: {
      title: 'दैनिक विषहरण और दीर्घायु के लिए रात्रि त्रिफला जल',
      description: 'आंवला, बहेड़ा और हरड़ का त्रिदोषनाशक मिश्रण जो पाचन तंत्र की सफाई करता है, आंखों की रोशनी बढ़ाता है और शरीर को ऊर्जावान बनाए रखता है।',
      benefits: ['रात भर पाचन तंत्र की सौम्य सफाई करता है', 'लीवर और आंखों के स्वास्थ्य के लिए उत्तम', 'त्वचा को साफ करता है', 'तीनों दोषों (वात, पित्त, कफ) को संतुलित करता है'],
      ingredients: ['त्रिफला चूर्ण - 1/2 छोटा चम्मच', 'गुनगुना पानी - 1 कप', 'शहद - 1/2 छोटा चम्मच (ऐच्छिक)'],
      preparation: '1. गुनगुने पानी में त्रिफला पाउडर मिलाएं।\n2. 5 मिनट रखें और रात को सोने से पहले पिएं।',
      dosage: 'रात को सोने से 30 मिनट पहले 1 कप पिएं।',
      warnings: ['दस्त होने पर मात्रा कम करें।']
    },
    te: {
      title: 'శరీర శుద్ధి & దీర్ఘాయువు కోసం రాత్రి వేళ త్రిఫల తీర్థం',
      description: 'ఉసిరి, తానిక్కాయ, కరక్కాయల త్రిదोष నివారిణి సమ్మేళనం. ఇది రాత్రివేళ జీర్ణవ్యవస్థను శుభ్రపరచి, కంటి చూపును మెరుగుపరుస్తుంది.',
      benefits: ['రాత్రికి జీర్ణనాళాన్ని శుభ్రపరుస్తుంది', 'కాలేయం మరియు కంటి ఆరోగ్యానికి మంచిది', 'చర్మ కాంతిని పెంచుతుంది', 'వాత, పిత్త, కఫ దోషాలను సమతుల్యం చేస్తుంది'],
      ingredients: ['త్రిఫల చూర్ణం - 1/2 టీస్పూన్', 'గోరువెచ్చని నీరు - 1 కప్పు', 'తేనె - 1/2 టీస్పూన్ (ఐచ్ఛికం)'],
      preparation: '1. గోరువెచ్చని నీటిలో త్రిఫల చూర్ణం కలపండి.\n2. 5 నిమిషాల తర్వాత రాత్రి పడుకునే ముందు తాగండి.',
      dosage: 'ప్రతి రాత్రి నిద్రపోయే ముందు 1 కప్పు తాగండి.',
      warnings: ['విరేచనాలు ఎక్కువైతే మోతాదు తగ్గించండి.']
    }
  }
};
