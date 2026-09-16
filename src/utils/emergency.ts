/**
 * Medical Emergency Detection & Direct Call System for PranAyu.
 * Detects severe emergency symptoms and triggers immediate phone dialing.
 */

export interface EmergencyCheckResult {
  isEmergency: boolean;
  type?: string;
  recommendation: string;
}

const EMERGENCY_TRIGGERS = [
  // Heart/Chest Pain
  {
    type: 'Heart Attack / Chest Pain',
    patterns: [
      /chest\s*pain/i, /heart\s*pain/i, /heart\s*attack/i, /angina/i, /left\s*arm\s*pain/i, /pressure\s*in\s*chest/i,
      /heart\s*ache/i, /heart\s*problem/i, /pain\s*in\s*heart/i, /pain\s*in\s*chest/i, /chest\s*discomfort/i,
      /छाती में दर्द/i, /छाती दर्द/i, /दिल का दौरा/i, /छाती में दबाव/i, /दिल में दर्द/i, /दिल दर्द/i,
      /ఛాతి నొప్పి/i, /గుండె పోటు/i, /గుండె నొప్పి/i, /గుండెలో నొప్పి/i
    ],
    rec: 'CRITICAL EMERGENCY: You may be experiencing a cardiac emergency. Sit down, do not strain, and press the Direct Call button below immediately to connect with emergency medical services or your emergency contact.'
  },
  // Stroke
  {
    type: 'Stroke / Face Drooping / Slurred Speech',
    patterns: [
      /stroke/i, /paralysis/i, /face\s*droop/i, /slurred\s*speech/i, /sudden\s*numbness/i, /sudden\s*weakness/i,
      /लकवा/i, /चेहरा लटकना/i, /बोलने में कठिनाई/i,
      /పక్షవాతం/i, /మాట పడిపోవడం/i, /స్పర్శ కోల్పోవడం/i
    ],
    rec: 'CRITICAL EMERGENCY: Signs of a stroke detected. Time is critical. Remember FAST (Face drooping, Arm weakness, Speech difficulty, Time to call). Connect to emergency services immediately.'
  },
  // Breathing Difficulty
  {
    type: 'Severe Breathing Difficulty',
    patterns: [
      /breathing\s*difficulty/i, /shortness\s*of\s*breath/i, /gasping/i, /cannot\s*breathe/i, /severe\s*asthma/i, /suffocating/i,
      /सांस लेने में तकलीफ/i, /दम घुटना/i, /सांस न आना/i,
      /శ్వాస తీసుకోవడంలో ఇబ్బంది/i, /ఊపిరాడకపోవడం/i
    ],
    rec: 'CRITICAL EMERGENCY: Severe breathing distress requires urgent oxygenation. Sit upright and call emergency ambulance transport immediately.'
  },
  // Bleeding
  {
    type: 'Severe Bleeding / Hemorrhage',
    patterns: [
      /severe\s*bleeding/i, /heavy\s*bleeding/i, /arterial\s*bleeding/i, /hemorrhage/i, /gushing\s*blood/i,
      /अत्यधिक रक्तस्राव/i, /खून का बहना/i,
      /తీవ్ర రక్తస్రావం/i, /రక్తం కారడం/i
    ],
    rec: 'CRITICAL EMERGENCY: Apply firm pressure to the wound with a clean cloth and call emergency medical transport immediately.'
  },
  // Crisis / Self-Harm
  {
    type: 'Crisis / Self-Harm / Suicidal Thoughts',
    patterns: [
      /suicide/i, /want\s*to\s*die/i, /kill\s*myself/i, /end\s*my\s*life/i, /self\s*harm/i,
      /आत्महत्या/i, /मरना चाहता/i, /जीवन समाप्त/i,
      /ఆత్మహత్య/i, /చనిపోవాలని ఉంది/i
    ],
    rec: 'Please know that you are not alone. Please reach out immediately: in India call 9999666555 / 112, or call 988.'
  },
  // Poisoning
  {
    type: 'Poisoning / Chemical Ingestion',
    patterns: [
      /poison/i, /drank\s*bleach/i, /chemical\s*ingestion/i, /swallowed\s*acid/i, /overdose/i,
      /जहर/i, /एसिड पी लिया/i, /अतिमात्रा/i,
      /విషం/i, /ఆసిడ్ తాగడం/i, /మందులు ఎక్కువ వేసుకోవడం/i
    ],
    rec: 'CRITICAL EMERGENCY: Ingestion of poison requires immediate hospital care. Do not induce vomiting. Press Direct Call now.'
  }
];

export function detectEmergency(text: string): EmergencyCheckResult {
  if (!text) return { isEmergency: false, recommendation: '' };
  const normalized = text.toLowerCase();
  
  for (const item of EMERGENCY_TRIGGERS) {
    for (const pattern of item.patterns) {
      if (pattern.test(normalized)) {
        return {
          isEmergency: true,
          type: item.type,
          recommendation: item.rec
        };
      }
    }
  }

  return {
    isEmergency: false,
    recommendation: ''
  };
}

/**
 * Initiates a direct telephone call via native tel URI (e.g. tel:108 or tel:+919876543210)
 */
export function triggerDirectEmergencyCall(phoneNumber?: string) {
  const targetPhone = phoneNumber && phoneNumber.trim().length > 3 ? phoneNumber.trim() : '108';
  const cleanPhone = targetPhone.replace(/[^0-9+]/g, '');
  const telUrl = `tel:${cleanPhone}`;

  if (typeof window !== 'undefined') {
    try {
      window.location.href = telUrl;
    } catch (_) {
      window.open(telUrl, '_self');
    }
  }
}
