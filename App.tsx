
import React, { useState, useEffect } from 'react';
import { Language, SiteContent, DistrictData, PageSection } from './types';
import { INITIAL_CONTENT, TRANSLATIONS } from './constants';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { AdminPanel } from './components/AdminPanel';
import { getEthiopianDateString } from './utils/ethiopianCalendar';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('soil_health_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CONTENT;
      }
    }
    return INITIAL_CONTENT;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getEthiopianDateString(lang || 'amharic'));
    }, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('soil_health_content', JSON.stringify(content));
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === content.adminEmail && loginForm.password === content.adminPassword) {
      setIsAdmin(true);
      setActiveTab('admin');
    } else {
      alert('Unauthorized access. Verify email and pin.');
    }
  };

  const currentLang = lang || 'amharic';
  const t = TRANSLATIONS[currentLang];

  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-stone-900 text-white min-h-[500px] flex items-center p-8 md:p-16 shadow-2xl">
            <div className="absolute inset-0">
              <img src={content.heroImageUrl} className="w-full h-full object-cover opacity-40" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-3xl space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-7xl font-black leading-none tracking-tighter">{content.heroTitle[currentLang]}</h2>
              <p className="text-stone-300 text-lg md:text-xl font-medium leading-relaxed">{content.heroSub[currentLang]}</p>
            </div>
          </section>
        );
      case 'advisor':
        return (
          <section key={section.id} className="bg-stone-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl shadow-2xl">
                {content.advisorIcon}
              </div>
              <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
                {content.advisorTitle[currentLang]}
              </h3>
              <p className="text-stone-300 text-base md:text-xl font-medium leading-relaxed max-w-xl">
                {content.advisorDesc[currentLang]}
              </p>
              <button 
                onClick={() => {
                  if (!lang || !selectedDistrict) alert(currentLang === 'amharic' ? 'እባክዎ መጀመሪያ አካባቢዎን ይምረጡ' : 'Maaloo dura naannoo keessan filadhu');
                  else setActiveTab('chat');
                }}
                style={{ backgroundColor: content.primaryColor }}
                className="group px-8 py-4 md:px-10 md:py-5 text-white rounded-[2rem] font-black text-lg md:text-xl shadow-2xl transition-all hover:scale-105 flex items-center space-x-3 active:scale-95"
              >
                <span>{t.chatbot}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-stone-800 rounded-full flex items-center justify-center text-8xl md:text-9xl shadow-inner border border-stone-700 animate-pulse">
                 {content.advisorIcon}
              </div>
            </div>
          </section>
        );
      case 'library':
        return (
          <div key={section.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch animate-fade-in">
            <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-stone-100 space-y-8 flex flex-col justify-between">
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tighter">
                {lang ? t.selectArea : t.selectLanguage}
              </h2>
              {!lang ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => setLang('afaan_oromoo')} className="py-6 bg-stone-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all">Afaan Oromoo</button>
                  <button onClick={() => setLang('amharic')} className="py-6 border-2 border-stone-100 text-stone-900 rounded-2xl font-black text-lg hover:bg-stone-50 hover:scale-105 transition-all">አማርኛ</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {content.districts.map(d => (
                    <button 
                      key={d.id}
                      onClick={() => setSelectedDistrict(d)}
                      className={`py-5 px-6 rounded-2xl font-black text-left flex items-center justify-between transition-all border-2 ${selectedDistrict?.id === d.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-stone-100 text-stone-700 hover:border-emerald-300'}`}
                    >
                      <span>{d.displayName[currentLang]}</span>
                      {selectedDistrict?.id === d.id && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </button>
                  ))}
                </div>
              )}
            </section>
            <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-stone-100 space-y-8">
              <h3 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tighter">{content.libraryTitle[currentLang]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.documents.map(doc => (
                  <a key={doc.id} href={doc.url} download={doc.title[currentLang]} target="_blank" rel="noreferrer" className="p-5 bg-stone-50 rounded-2xl border border-stone-100 flex items-center space-x-3 hover:shadow-lg transition-all">
                    <span className="text-2xl">📄</span>
                    <span className="font-black text-stone-800 text-xs truncate">{doc.title[currentLang]}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        );
      case 'stats':
        return selectedDistrict && lang && (
          <section key={section.id} className="space-y-12 animate-slide-up py-8">
            <div className="text-center space-y-3">
              <h3 className="text-5xl md:text-6xl font-black text-stone-900 tracking-tighter">{selectedDistrict.displayName[currentLang]}</h3>
              <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em]">{currentTime}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100">
                <span className="text-5xl">🌋</span>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 mt-6">{t.soilType}</p>
                <p className="text-2xl font-black text-stone-900 leading-tight">{selectedDistrict.soilTypes[currentLang]}</p>
              </div>
              <div style={{ backgroundColor: content.primaryColor }} className="p-10 rounded-[2.5rem] shadow-2xl text-white scale-105 border border-white/10">
                <span className="text-5xl">🌾</span>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1 mt-6">{t.recommendedCrops}</p>
                <p className="text-3xl font-black leading-tight">{selectedDistrict.recommendedCrops[currentLang]}</p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100">
                <span className="text-5xl">⚠️</span>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1 mt-6">Frequent Issues</p>
                <p className="text-2xl font-black text-stone-900 leading-tight">{selectedDistrict.frequentIssues[currentLang]}</p>
              </div>
            </div>
          </section>
        );
      case 'issues':
        return (
          <div key={section.id} className="space-y-12 animate-fade-in">
             <div className="text-center space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter">{content.issuesTitle[currentLang]}</h3>
                <p className="text-stone-500 font-medium">{content.issuesDesc[currentLang]}</p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {content.soilIssues.map(issue => (
                  <div key={issue.id} className="bg-white rounded-[3rem] overflow-hidden flex flex-col sm:flex-row shadow-md border border-stone-100 hover:shadow-2xl transition-all">
                     <div className="w-full sm:w-1/3 h-48 sm:h-auto"><img src={issue.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                     <div className="p-8 w-full sm:w-2/3 space-y-4">
                        <h4 className="font-black text-stone-900 text-xl">{issue.title[currentLang]}</h4>
                        <p className="text-stone-500 text-sm leading-relaxed">{issue.description[currentLang]}</p>
                        <div className="pt-4 border-t border-stone-50">
                           <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-1">Recommendation</p>
                           <p className="text-stone-800 text-sm font-bold">{issue.recommendation[currentLang]}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'contact':
        return (
          <section key={section.id} className="bg-stone-50 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 border border-stone-100 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-inner">
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <h3 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter leading-none">{content.contactTitle[currentLang]}</h3>
              <p className="text-stone-500 font-medium text-lg italic leading-relaxed">{content.contactSub[currentLang]}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a href={`mailto:${content.contactEmail}`} className="px-12 py-6 bg-white border border-stone-200 rounded-3xl font-black text-center shadow-lg hover:scale-105 transition-all">Send Email</a>
              <a href={`tel:${content.contactPhone}`} className="px-12 py-6 bg-stone-900 text-white rounded-3xl font-black text-center shadow-lg hover:scale-105 transition-all">Expert Call</a>
            </div>
          </section>
        );
      case 'weather':
        return (
          <section key={section.id} className="bg-blue-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl animate-fade-in">
             <div className="space-y-2 text-center md:text-left">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Regional Climate Overview</p>
               <h3 className="text-4xl font-black tracking-tighter">Live Weather Feed</h3>
             </div>
             <div className="flex items-center space-x-10">
               <div className="text-center">
                 <span className="text-6xl">☀️</span>
                 <p className="text-2xl font-black">26°C</p>
               </div>
               <div className="h-20 w-px bg-white/20 hidden md:block"></div>
               <div className="text-center opacity-60">
                 <p className="text-xs font-black uppercase tracking-widest">Soil Temp</p>
                 <p className="text-xl font-bold">19°C</p>
               </div>
             </div>
          </section>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-24 pb-20">
            {content.activeSections.map(section => renderSection(section))}
          </div>
        );
      case 'chat':
        return <ChatInterface lang={lang!} district={selectedDistrict!.name} onBack={() => setActiveTab('home')} />;
      case 'admin':
        return <AdminPanel lang={currentLang} content={content} setContent={setContent} />;
      case 'login':
        return (
          <div className="max-w-md mx-auto py-20 px-6">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-stone-100 text-center space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900"></div>
              <div className="w-24 h-24 bg-stone-950 text-white rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-2xl">🔐</div>
              <h2 className="text-3xl font-black tracking-tighter">Manager Portal</h2>
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <LabeledInput label="Manager Email" value={loginForm.email} onChange={v => setLoginForm({...loginForm, email: v})} required />
                <LabeledInput type="password" label="Access Pin" value={loginForm.password} onChange={v => setLoginForm({...loginForm, password: v})} required />
                <button type="submit" className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-stone-800 transition-colors">Authorize Session</button>
              </form>
              <button onClick={() => setActiveTab('home')} className="text-stone-400 text-xs font-black uppercase tracking-widest hover:text-stone-900">Cancel</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      lang={currentLang} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isAdmin={isAdmin}
      onLogout={isAdmin ? () => { setIsAdmin(false); setActiveTab('home'); } : undefined}
    >
      {renderContent()}
    </Layout>
  );
};

const LabeledInput = ({ label, value, onChange, type = "text", required = false }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">{label}</label>
    <input 
      type={type}
      required={required}
      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-stone-100 focus:border-stone-900 outline-none transition-all font-bold text-stone-800"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default App;
