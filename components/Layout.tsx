
import React from 'react';
import { TRANSLATIONS, INITIAL_CONTENT } from '../constants';
import { Language, SiteContent } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  isAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, lang, activeTab, setActiveTab, onLogout, isAdmin }) => {
  const t = TRANSLATIONS[lang];
  
  const savedContent = localStorage.getItem('soil_health_content');
  const content: SiteContent = savedContent ? JSON.parse(savedContent) : INITIAL_CONTENT;
  const primaryColor = content.primaryColor;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <header className="bg-white/90 backdrop-blur-xl border-b border-stone-100 sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center space-x-3">
            <div style={{ backgroundColor: primaryColor }} className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">S</div>
            <div className="hidden sm:block text-left leading-none">
              <h1 className="font-black text-stone-900 text-xl tracking-tighter uppercase">Soil Health</h1>
              <p className="text-[9px] font-black text-stone-400 tracking-[0.2em] uppercase">Ethio-Advisor Portal</p>
            </div>
          </button>
          
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'home' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Portal
            </button>
            
            {isAdmin ? (
               <button 
                 onClick={() => setActiveTab('admin')}
                 style={{ backgroundColor: primaryColor }}
                 className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all"
               >
                 <span>Manager Dash</span>
               </button>
            ) : (
              <button 
                onClick={() => setActiveTab('login')}
                className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                title="Administrator Access"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-500 py-16">
        <div className="container mx-auto px-6 text-center space-y-6">
          <p className="text-white font-black tracking-widest uppercase text-sm">Soil Health Project Ethiopia</p>
          <p className="text-xs font-medium">Regional districts: Diredawa, Haramaya, Metta</p>
          <div className="flex justify-center space-x-6 text-[10px] font-black uppercase tracking-widest">
            <button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button>
            <button onClick={() => setActiveTab('login')} className="hover:text-white">Admin</button>
          </div>
          {onLogout && (
            <button onClick={onLogout} className="mt-4 px-6 py-3 border border-red-900/50 text-red-500 rounded-xl text-[10px] font-black uppercase hover:bg-red-900/20">Sign Out</button>
          )}
        </div>
      </footer>
    </div>
  );
};
