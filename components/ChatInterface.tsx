
import React, { useState, useRef, useEffect } from 'react';
import { Language, District, ChatMessage } from '../types';
import { TRANSLATIONS } from '../constants';
import { getSoilAdvisorResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  lang: Language;
  district: District;
  onBack?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ lang, district, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: input }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getSoilAdvisorResponse(input, messages, lang, district);
    
    const modelMessage: ChatMessage = {
      role: 'model',
      parts: [{ text: aiResponseText }]
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const welcomeMessage = lang === 'amharic' 
    ? `ሰላም! እኔ ለ${district} ወረዳ አማካሪዎ ነኝ። ዛሬ ስለ አፈር አያያዝ ወይም ስለ ሰብል ምርጫዎ እንዴት ልረዳዎት እችላለሁ?`
    : `Baga nagaan dhuftan! Ani Gorsa keessan kan aanaa ${district} ti. Har'a akkamitti waa'ee bulchiinsa biyyee ykn filannoo midhaanii keessanii isin gargaaruu danda'a?`;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in duration-500">
      <div className="bg-stone-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group"
              title="Return Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <div>
            <h2 className="font-black text-xl tracking-tight leading-none uppercase">{t.chatbot}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{district} • Online Advisor</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-stone-50 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-12 px-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-200 inline-block max-w-lg">
              <p className="text-stone-800 font-bold text-xl leading-relaxed italic">
                "{welcomeMessage}"
              </p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-[2rem] shadow-sm ${
              m.role === 'user' 
                ? 'bg-stone-900 text-white rounded-tr-none' 
                : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none shadow-xl'
            }`}>
              <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{m.parts[0].text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-[1.5rem] shadow-md border border-stone-100 animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
              <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
              <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-stone-100 flex items-center space-x-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.askAdvisor}
          className="flex-grow bg-stone-50 border border-stone-200 rounded-[2rem] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 transition-all font-bold text-stone-800"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-stone-900 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-stone-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};
