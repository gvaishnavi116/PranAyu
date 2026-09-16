import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Mic, MicOff, Volume2, Copy, Trash2, ArrowUp, AlertCircle, Loader2, Sparkles, RefreshCw, Phone, ShieldAlert } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { speakText, stopSpeech } from '../utils/speechUtils';
import { triggerDirectEmergencyCall } from '../utils/emergency';

interface ChatbotProps {
  language: Language;
  token: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
}

export default function Chatbot({ language, token }: ChatbotProps) {
  const t = translations[language];
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  
  // Audio Speech States
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Loading / safety states
  const [isLoading, setIsLoading] = useState(false);
  const [isEmergencyAlert, setIsEmergencyAlert] = useState(false);
  const [emergencyText, setEmergencyText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested Prompts
  const suggestedPrompts = [
    { text: 'Are my current medicines safe to take with Ayurvedic Kadha or herbal tea?', lang: 'en', icon: '💊' },
    { text: 'What precautions should I take regarding timing and dosage for my medications?', lang: 'en', icon: '⏰' },
    { text: 'Remedy for acid reflux, indigestion, and bloating', lang: 'en', icon: '🌱' },
    { text: 'Ask me about my daily symptoms, diet, and medications', lang: 'en', icon: '💬' },
    { text: 'क्या मेरी दवाइयों के साथ हर्बल काढ़ा या हल्दी वाला दूध लेना सुरक्षित है?', lang: 'hi', icon: '💊' },
    { text: 'दवाइयां भोजन से पहले या बाद में लेने के क्या नियम हैं?', lang: 'hi', icon: '⏰' },
    { text: 'నా ప్రస్తుత మందులు మరియు ఆయుర్వేద మూలికలను కలిపి వేసుకోవచ్చా?', lang: 'te', icon: '💊' },
    { text: 'నా రోజువారీ ఆహారం, మందులు మరియు లక్షణాల గురించి నన్ను అడగండి', lang: 'te', icon: '💬' }
  ].filter(p => p.lang === language || p.lang === 'en');

  // Quick Action Topic Chips
  const quickTopics = [
    { label: '💊 Medicines & Dosage', prompt: 'I would like to discuss my current medications, dosage precautions, and timing.' },
    { label: '⏰ Best Time to Take Meds', prompt: 'When is the best time to take my medicines in relation to meals and sleep?' },
    { label: '⚠️ Check Side Effects', prompt: 'What common side effects or food interactions should I watch out for with my medicines?' },
    { label: '🥗 Diet & Meal Precautions', prompt: 'What foods or drinks should I avoid while taking my current medications?' },
    { label: '🌱 Natural Home Remedies', prompt: 'Can you recommend safe, gentle Ayurvedic home remedies for my current symptoms?' }
  ];

  // ==========================================
  // INITIALIZATION & SPEECH SETUP
  // ==========================================

  useEffect(() => {
    fetchChats();
    setupWebSpeech();
  }, [token]);

  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId);
    } else {
      setMessages([]);
    }
  }, [activeChatId, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const setupWebSpeech = () => {
    // Check Speech Recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev + (prev ? ' ' : '') + transcript);
      };

      setRecognition(rec);
      setSpeechSupported(true);
    }
  };

  // ==========================================
  // API SERVICE CALLS
  // ==========================================

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/chats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
        if (data.length > 0 && !activeChatId) {
          setActiveChatId(data[data.length - 1].id);
        }
      }
    } catch (e) {
      console.error('Error fetching chats', e);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const res = await fetch(`/api/chats/${chatId}/messages?lang=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error('Error fetching messages', e);
    }
  };

  const handleStartNewChat = async () => {
    try {
      const titlePrompt = `Session on ${new Date().toLocaleDateString()}`;
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: titlePrompt })
      });

      if (res.ok) {
        const newChat = await res.json();
        setChats(prev => [...prev, newChat]);
        setActiveChatId(newChat.id);
      }
    } catch (e) {
      console.error('Error starting chat', e);
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this conversation?')) return;
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) {
          setActiveChatId(null);
        }
      }
    } catch (e) {
      console.error('Error deleting chat', e);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    let chatId = activeChatId;
    if (!chatId) {
      // Auto-create chat if none active
      try {
        const titlePrompt = textToSend.length > 25 ? textToSend.substring(0, 25) + '...' : textToSend;
        const res = await fetch('/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ title: titlePrompt })
        });
        if (res.ok) {
          const newChat = await res.json();
          setChats(prev => [...prev, newChat]);
          chatId = newChat.id;
          setActiveChatId(newChat.id);
        } else {
          return;
        }
      } catch (e) {
        console.error('Error auto-starting chat', e);
        return;
      }
    }

    setInputText('');
    setIsLoading(true);
    setIsEmergencyAlert(false);

    // Optimistically update user message locally
    const optimisticUserMsg: Message = {
      id: `opt_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticUserMsg]);

    try {
      const res = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: textToSend, language })
      });

      if (res.ok) {
        const data = await res.json();
        
        // Remove optimistic message and replace with verified server list
        fetchMessages(chatId!);
        
        // Check if response represents an emergency safety block
        if (data.botMessage.text.includes('🚨')) {
          setIsEmergencyAlert(true);
          setEmergencyText(data.botMessage.text);
        }
      } else {
        throw new Error('Offline or server error');
      }
    } catch (e) {
      console.warn('Error posting message online. Generating offline assistant response.', e);
      // Construct a localized, intelligent offline response based on user keywords
      let offlineText = "⚡ **[Offline Mode Guidance]**\n\nIt looks like you are currently offline or disconnected from the server.\n\n";
      const queryLower = textToSend.toLowerCase();

      if (queryLower.includes('fever') || queryLower.includes('बुखार') || queryLower.includes('జ్వరం')) {
        if (queryLower.includes('100') || queryLower.includes('101') || queryLower.includes('102') || queryLower.includes('mild') || queryLower.includes('high') || queryLower.includes('day') || queryLower.includes('today')) {
          offlineText += "Thank you for sharing your temperature details. To guide your Ayurvedic care, **do you also have a cold, cough, sore throat, or body aches/chills?**\n\n**Quick Options:**\n- Yes, I have cold and cough\n- Dry cough & sore throat\n- Body pain & chills\n- No cold or cough, just fever";
        } else if (queryLower.includes('cold') || queryLower.includes('cough') || queryLower.includes('throat') || queryLower.includes('pain') || queryLower.includes('no cold')) {
          offlineText += "Thank you for providing your complete symptom details. Here are safe, customized Ayurvedic remedies & precautions for your fever:\n\n### 🌿 Customized Remedies:\n- **Tulsi-Ginger Kadha:** Boil 8-10 Tulsi leaves, 1 tsp crushed ginger, and 3 crushed black peppercorns in 2 cups water until reduced to 1 cup. Sip warm twice daily.\n- **Giloy Tea:** Sip Giloy tea to help manage body temperature and support immunity.\n- **Dietary Advice:** Eat warm, light soups (like Moong Dal soup). Avoid cold water, dairy, and heavy fried meals.\n\nAre you currently taking any fever medicine like Paracetamol?\n\n**Quick Options:**\n- How to prepare Tulsi Kadha\n- Taking Paracetamol with herbal tea\n- Foods to eat & avoid during fever";
        } else {
          offlineText += "I'm so sorry to hear that you are dealing with a fever! To give you safe, accurate guidance, **what is your current body temperature (if you've checked with a thermometer), or does it feel like a mild or high fever? How many days have you had it?**\n\n**Quick Options:**\n- Mild fever (~99°F - 100°F)\n- High fever (101°F or higher)\n- Just started today\n- Fever for 2-3 days";
        }
      } else if (queryLower.includes('cold') || queryLower.includes('cough') || queryLower.includes('काढ़ा') || queryLower.includes('దగ్గు')) {
        offlineText += "I'm sorry you're dealing with a cold/cough! **Is it a dry cough or a wet cough with phlegm/mucus?**\n\n**Quick Options:**\n- Dry cough with throat irritation\n- Wet cough with chest phlegm\n- Cold with runny nose & fever\n- How to make Ginger Honey mixture";
      } else if (queryLower.includes('acid') || queryLower.includes('stomach') || queryLower.includes('gas') || queryLower.includes('digest') || queryLower.includes('पेट')) {
        offlineText += "I'm sorry you're experiencing stomach discomfort! **Is it accompanied by bloating, gas, acidity, or nausea?**\n\n**Quick Options:**\n- Gas and bloating after meals\n- Acidity & chest burning\n- Indigestion & nausea\n- Show CCF Tea recipe";
      } else if (queryLower.includes('pain') || queryLower.includes('joint') || queryLower.includes('headache') || queryLower.includes('दर्द')) {
        offlineText += "I'm sorry you're in pain! **Is it a headache, joint pain, or muscle soreness?**\n\n**Quick Options:**\n- Headache from stress or eye strain\n- Joint stiffness or pain\n- Muscle soreness & fatigue";
      } else {
        offlineText += "### 🌿 General Holistic Guidance:\n- **Daily Routine (Dinacharya):** Maintain regular meal times, stay hydrated with warm water, and practice 10 minutes of Pranayama (Anulom Vilom).\n- **Medication Safety:** Keep a 1-hour gap between allopathic medicines and herbal teas.\n\n**Quick Options:**\n- Tell me about remedies for fever\n- Remedies for cold & cough\n- Remedies for digestion & acidity";
      }

      const offlineBotMsg: Message = {
        id: `off_bot_${Date.now()}`,
        sender: 'assistant',
        text: offlineText,
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, offlineBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // TEXT & AUDIO UTILITIES
  // ==========================================

  const handleMicClick = () => {
    if (!speechSupported) return;
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  const handleSpeakText = (text: string, msgId: string) => {
    if (speakingMessageId === msgId) {
      stopSpeech();
      setSpeakingMessageId(null);
    } else {
      speakText(
        text,
        language,
        () => setSpeakingMessageId(msgId),
        () => setSpeakingMessageId(null),
        () => setSpeakingMessageId(null)
      );
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Extract interactive quick response options from assistant text or symptom context
  const extractQuickOptions = (text: string, isLatestMsg: boolean): string[] => {
    // 1. Try to extract explicit options under headers like "**Quick Options:**" or "**Quick Reply:**"
    const match = text.match(/(?:\*\*Quick Options:\*\*|\*\*Quick Reply:\*\*|\*\*Quick Suggestions:\*\*|Quick Options:|Quick Reply:)\s*([\s\S]*?)(?:\n\n|\n[#*]|$)/i);
    if (match && match[1]) {
      const parsed = match[1]
        .split('\n')
        .map(l => l.replace(/^[-*•\d.\s]+/, '').trim())
        .filter(l => l.length > 0 && l.length < 80);
      if (parsed.length > 0) return parsed.slice(0, 4);
    }

    // 2. Fallback to smart symptom context options if this is the latest assistant message
    if (!isLatestMsg) return [];
    const textLower = text.toLowerCase();

    if (textLower.includes('fever') || textLower.includes('बुखार') || textLower.includes('జ్వరం')) {
      return [
        'Yes, I have cold and cough too',
        'Just fever, no cold or cough',
        'High fever with body pain & chills',
        'Show me Tulsi Kadha recipe'
      ];
    }

    if (textLower.includes('cough') || textLower.includes('cold') || textLower.includes('దగ్గు') || textLower.includes('खांसी')) {
      return [
        'Dry cough with throat irritation',
        'Wet cough with chest congestion',
        'Cold with runny nose & fever',
        'How to make Ginger Honey mixture'
      ];
    }

    if (textLower.includes('stomach') || textLower.includes('acid') || textLower.includes('gas') || textLower.includes('pet')) {
      return [
        'Gas and bloating after meals',
        'Acidity & chest burning',
        'Indigestion & nausea',
        'Show CCF Tea recipe'
      ];
    }

    if (textLower.includes('headache') || textLower.includes('pain') || textLower.includes('joint')) {
      return [
        'Headache from stress or eye strain',
        'Joint stiffness or pain',
        'Muscle soreness & fatigue'
      ];
    }

    return [
      'Tell me remedies for fever',
      'Remedies for cold & cough',
      'Remedies for indigestion'
    ];
  };

  // Render text containing custom lightweight markdown elements
  const renderFormattedMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Check for headers (### or ##)
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-base font-bold text-slate-900 mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-lg font-serif font-black text-slate-900 mt-4 mb-2">{line.replace('## ', '')}</h3>;
      }
      
      // Check for bullet lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.replace(/^[\s*-]+/, '').trim();
        return (
          <ul key={idx} className="list-disc pl-5 text-sm leading-relaxed mb-1 space-y-0.5">
            <li>{parseBoldText(content)}</li>
          </ul>
        );
      }

      // Check for numbered lists
      if (/^\d+\.\s+/.test(line.trim())) {
        const content = line.replace(/^\d+\.\s+/, '').trim();
        return (
          <ol key={idx} className="list-decimal pl-5 text-sm leading-relaxed mb-1 space-y-0.5">
            <li>{parseBoldText(content)}</li>
          </ol>
        );
      }

      // Standard paragraph
      if (line.trim() === '') return <div key={idx} className="h-2" />;
      
      return <p key={idx} className="text-sm leading-relaxed mb-1">{parseBoldText(line)}</p>;
    });
  };

  // Convert **text** inside paragraphs to <strong> tags
  const parseBoldText = (input: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        parts.push(input.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-extrabold text-slate-950">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < input.length) {
      parts.push(input.substring(lastIndex));
    }

    return parts.length > 0 ? parts : input;
  };

  return (
    <div id="ai_chatbot_workspace" className="grid grid-cols-1 md:grid-cols-4 border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-xl min-h-[75vh]">
      
      {/* Left Drawer: Sessions list */}
      <div className="md:col-span-1 bg-stone-50 border-r border-stone-200 flex flex-col justify-between p-4 space-y-4">
        <div className="space-y-4 overflow-y-auto max-h-[50vh] md:max-h-[60vh]">
          <button
            onClick={handleStartNewChat}
            className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-800 font-bold rounded-2xl text-xs sm:text-sm flex justify-center items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-emerald-800" />
            <span>{t.newChat}</span>
          </button>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-2">Session History</span>
            {chats.length === 0 ? (
              <span className="text-xs text-slate-400 pl-2 block italic">No recent chats</span>
            ) : (
              chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 group transition-all cursor-pointer ${
                    activeChatId === chat.id 
                      ? 'bg-emerald-700 text-white' 
                      : 'hover:bg-stone-150 text-slate-700'
                  }`}
                >
                  <span className="truncate pr-2">{chat.title}</span>
                  <Trash2
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className={`h-4 w-4 transition-colors shrink-0 ${
                      activeChatId === chat.id ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-red-700'
                    }`}
                  />
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-3 bg-stone-100 rounded-2xl text-[10px] leading-relaxed text-slate-500 border border-stone-200">
          🔒 Conversations are secure and kept local inside private database storage.
        </div>
      </div>

      {/* Right Drawer: Active chat area */}
      <div className="md:col-span-3 flex flex-col justify-between bg-white relative">
        
        {/* Messages stream */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[50vh] md:max-h-[55vh] space-y-6">
          
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-6 py-8 px-4">
              <div className="p-4 bg-emerald-100/80 text-emerald-900 rounded-3xl border border-emerald-200 shadow-sm animate-bounce-subtle">
                <Sparkles className="h-10 w-10 text-emerald-800" />
              </div>
              <div className="space-y-2 max-w-md">
                <h4 className="font-serif font-bold text-slate-900 text-2xl">Hi there! I'm PranAyu AI</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Your interactive health & medicine companion. Ask me about your current medications, dosage precautions, symptoms, daily meals, or natural Ayurvedic remedies!
                </p>
              </div>

              {/* Suggestion Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
                {suggestedPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInputText(p.text); handleSendMessage(p.text); }}
                    className="p-3.5 bg-stone-50 hover:bg-emerald-50/80 border border-stone-200 hover:border-emerald-200 rounded-2xl text-xs font-semibold text-slate-800 transition-all text-left flex items-start gap-2.5 shadow-sm hover:shadow cursor-pointer group"
                  >
                    <span className="text-base shrink-0 group-hover:scale-110 transition-transform">{p.icon || '💡'}</span>
                    <span className="leading-snug">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => {
                const isLatest = idx === messages.length - 1;
                const quickOpts = msg.sender === 'assistant' ? extractQuickOptions(msg.text, isLatest) : [];

                return (
                <div 
                  key={msg.id} 
                  className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="h-4 w-4 text-emerald-800" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-3xl p-5 shadow-sm text-slate-800 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-tr-none font-medium'
                      : 'bg-stone-50/90 border border-stone-200/80 rounded-tl-none'
                  }`}>
                    {msg.sender === 'user' ? (
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          {renderFormattedMessageText(msg.text)}
                        </div>

                        {/* Emergency Direct Call Button if emergency detected */}
                        {(msg.text.includes('🚨') || msg.text.toLowerCase().includes('emergency')) && (
                          <div className="pt-3 border-t border-red-200 space-y-2">
                            <div className="bg-red-50 p-3 rounded-2xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-red-800 text-xs font-bold">
                                <ShieldAlert className="h-5 w-5 text-red-600 shrink-0" />
                                <span>Immediate Call Action Required</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => triggerDirectEmergencyCall('108')}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-95"
                              >
                                <Phone className="h-4 w-4 fill-current animate-bounce" />
                                <span>📞 Direct Call Emergency (108)</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Interactive Quick Option Chips */}
                        {quickOpts.length > 0 && (
                          <div className="pt-3 border-t border-stone-200/60 space-y-2">
                            <span className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
                              <Sparkles className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
                              <span>Interactive Quick Options:</span>
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {quickOpts.map((opt, oIdx) => (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => { setInputText(opt); handleSendMessage(opt); }}
                                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-700 hover:text-white border border-emerald-200/90 text-emerald-900 font-bold rounded-xl text-xs transition-all shadow-2xs cursor-pointer active:scale-95 flex items-center gap-1.5"
                                >
                                  <span>{opt}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Audio & Copy buttons */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-stone-200/60">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSpeakText(msg.text, msg.id)}
                              className={`p-1.5 px-2.5 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                                speakingMessageId === msg.id 
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                  : 'text-slate-500 hover:bg-stone-100 hover:text-slate-700'
                              }`}
                            >
                              <Volume2 className="h-4 w-4" />
                              <span>{speakingMessageId === msg.id ? 'Stop' : 'Listen'}</span>
                            </button>
                            <button
                              onClick={() => handleCopyText(msg.text)}
                              className="p-1.5 px-2.5 rounded-xl hover:bg-stone-100 text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                            >
                              <Copy className="h-4 w-4" />
                              <span>Copy</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                  )}
                </div>
              );
              })}

              {/* Bot thinking placeholder */}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-emerald-800" />
                  </div>
                  <div className="max-w-[80%] rounded-3xl p-5 bg-stone-50 border border-stone-200/60 rounded-tl-none flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-700" />
                    <span className="text-xs font-semibold text-slate-600 animate-pulse">PranAyu is synthesizing health advice & checking medicine safety...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Emergency Alert Panel Overlay */}
        <AnimatePresence>
          {isEmergencyAlert && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute left-6 right-6 bottom-24 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 shadow-lg z-25 text-red-900"
            >
              <AlertCircle className="h-6 w-6 text-red-700 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h5 className="font-bold text-sm text-red-800">{t.emergencyAlert}</h5>
                <p className="text-xs text-red-700 leading-relaxed">
                  We detected symptoms demanding instant critical care. Please immediately contact regional ambulance transport numbers (102 or 108 in India, or 911 in US) and head to the nearest pediatric or cardiac emergency ward.
                </p>
                <button
                  onClick={() => setIsEmergencyAlert(false)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-900 font-bold rounded-lg text-[10px] cursor-pointer"
                >
                  Dismiss safety warning
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat input form panel */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/50 space-y-3">
          
          {/* Quick interactive topic chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {quickTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setInputText(item.prompt); handleSendMessage(item.prompt); }}
                className="whitespace-nowrap px-3 py-1.5 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-full text-slate-700 hover:text-emerald-900 font-semibold transition-all shadow-2xs cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
            className="flex items-center gap-2 relative bg-white border border-stone-200 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-700/20 focus-within:border-emerald-700 transition-all shadow-inner"
          >
            {/* STT Microphone Button */}
            {speechSupported && (
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isListening 
                    ? 'bg-red-100 text-red-700 animate-pulse' 
                    : 'text-slate-400 hover:bg-stone-100 hover:text-slate-600'
                }`}
                title={isListening ? 'Stop Listening' : 'Start Voice Input'}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
              className="flex-1 py-2 text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800"
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-150 text-white disabled:text-slate-400 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center">
            {t.safetyDisclaimer}
          </p>
        </div>

      </div>

    </div>
  );
}
