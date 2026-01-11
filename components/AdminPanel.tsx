
import React, { useState } from 'react';
import { SiteContent, Language, PageSectionType, PageSection, CustomModule, SoilIssue, Document, Media, DistrictData } from '../types';

interface AdminPanelProps {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  lang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ content, setContent }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'branding' | 'sections' | 'districts' | 'issues' | 'library' | 'security'>('dashboard');
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });

  const update = (patch: Partial<SiteContent>) => {
    const newContent = { ...content, ...patch };
    setContent(newContent);
    localStorage.setItem('soil_health_content', JSON.stringify(newContent));
  };

  const LabeledInput = ({ label, value, onChange, type = "text", placeholder = "" }: { label: string, value: string, onChange: (v: string) => void, type?: string, placeholder?: string }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-stone-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const TextArea = ({ label, value, onChange, placeholder = "" }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">{label}</label>
      <textarea 
        placeholder={placeholder}
        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-stone-800 min-h-[100px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const FileUpload = ({ label, onUpload }: { label: string, onUpload: (base64: string, name: string) => void }) => {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onUpload(reader.result as string, file.name);
        };
        reader.readAsDataURL(file);
      }
    };
    return (
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">{label}</label>
        <div className="relative">
          <input type="file" onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-full p-4 bg-white border-2 border-dashed border-stone-200 rounded-2xl font-bold text-stone-500 text-center hover:border-emerald-500 transition-colors">
            Tap to upload file from device
          </div>
        </div>
      </div>
    );
  };

  const addSection = (type: PageSectionType) => {
    const newSection: PageSection = { id: `sec-${Date.now()}`, type };
    update({ activeSections: [...content.activeSections, newSection] });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...content.activeSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      update({ activeSections: newSections });
    }
  };

  const handleAddDistrict = () => {
    const newDist: DistrictData = {
      id: `dist-${Date.now()}`,
      name: 'New Area',
      displayName: { amharic: 'አዲስ ወረዳ', afaan_oromoo: 'Aanaa Haaraa' },
      soilTypes: { amharic: '', afaan_oromoo: '' },
      characteristics: { amharic: '', afaan_oromoo: '' },
      frequentIssues: { amharic: '', afaan_oromoo: '' },
      recommendedCrops: { amharic: '', afaan_oromoo: '' }
    };
    update({ districts: [...content.districts, newDist] });
  };

  const handleAddIssue = () => {
    const newIssue: SoilIssue = {
      id: `issue-${Date.now()}`,
      title: { amharic: 'አዲስ ችግር', afaan_oromoo: 'Rakkoo Haaraa' },
      description: { amharic: '', afaan_oromoo: '' },
      recommendation: { amharic: '', afaan_oromoo: '' },
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400'
    };
    update({ soilIssues: [...content.soilIssues, newIssue] });
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 pb-20 animate-in fade-in">
      <aside className="lg:w-80 shrink-0 space-y-2">
        <div className="p-8 bg-stone-900 rounded-[2.5rem] text-white mb-6 shadow-2xl relative overflow-hidden">
          <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1 relative z-10">Absolute Manager</p>
          <p className="font-black truncate text-emerald-400 relative z-10">{content.siteName}</p>
        </div>
        <nav className="space-y-1.5 sticky top-24">
          {[
            { id: 'dashboard', label: 'Overview', icon: '📊' },
            { id: 'branding', label: 'Site Branding', icon: '🎨' },
            { id: 'sections', label: 'Layout Editor', icon: '🏗️' },
            { id: 'districts', label: 'Project Areas', icon: '📍' },
            { id: 'issues', label: 'Soil Knowledge', icon: '🧪' },
            { id: 'library', label: 'Library Assets', icon: '📂' },
            { id: 'security', label: 'Manager Settings', icon: '🔐' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-black transition-all ${
                activeTab === tab.id ? 'bg-white shadow-xl text-stone-900' : 'text-stone-500 hover:bg-white/50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-grow bg-white p-6 md:p-12 rounded-[3.5rem] shadow-2xl border border-stone-100 min-h-[800px]">
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <h3 className="text-4xl font-black tracking-tighter">Portal Dashboard</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                <p className="text-xs font-black text-emerald-600 uppercase mb-2">Total Areas</p>
                <p className="text-5xl font-black text-emerald-900">{content.districts.length}</p>
              </div>
              <div className="p-10 bg-stone-50 rounded-[3rem] border border-stone-100">
                <p className="text-xs font-black text-stone-600 uppercase mb-2">Knowledge Assets</p>
                <p className="text-5xl font-black text-stone-900">{content.documents.length + content.media.length}</p>
              </div>
              <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-100">
                <p className="text-xs font-black text-amber-600 uppercase mb-2">Live Sections</p>
                <p className="text-5xl font-black text-amber-900">{content.activeSections.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="space-y-12">
            <h3 className="text-3xl font-black tracking-tighter">Branding & Visuals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LabeledInput label="Site Name" value={content.siteName} onChange={v => update({ siteName: v })} />
              <LabeledInput label="Theme Color (Hex)" value={content.primaryColor} onChange={v => update({ primaryColor: v })} />
              <LabeledInput label="Hero Banner URL" value={content.heroImageUrl} onChange={v => update({ heroImageUrl: v })} />
              <FileUpload label="Upload Background" onUpload={(b64) => update({ heroImageUrl: b64 })} />
              <LabeledInput label="Advisor Icon (Emoji)" value={content.advisorIcon} onChange={v => update({ advisorIcon: v })} />
            </div>
            <div className="pt-8 border-t border-stone-100 space-y-8">
               <h4 className="text-xl font-black uppercase text-stone-800">Localized Headings</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <LabeledInput label="Hero Title (AM)" value={content.heroTitle.amharic} onChange={v => update({ heroTitle: { ...content.heroTitle, amharic: v } })} />
                 <LabeledInput label="Hero Title (OR)" value={content.heroTitle.afaan_oromoo} onChange={v => update({ heroTitle: { ...content.heroTitle, afaan_oromoo: v } })} />
                 <TextArea label="Hero Description (AM)" value={content.heroSub.amharic} onChange={v => update({ heroSub: { ...content.heroSub, amharic: v } })} />
                 <TextArea label="Hero Description (OR)" value={content.heroSub.afaan_oromoo} onChange={v => update({ heroSub: { ...content.heroSub, afaan_oromoo: v } })} />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tighter">Layout Configuration</h3>
              <div className="flex items-center space-x-2">
                <select id="section-select" className="p-3 bg-stone-100 rounded-xl font-bold text-xs border-none">
                  <option value="hero">Hero Section</option>
                  <option value="advisor">Expert Advisor</option>
                  <option value="library">Library Section</option>
                  <option value="stats">Area Soil Data</option>
                  <option value="issues">Common Problems</option>
                  <option value="weather">Live Weather</option>
                  <option value="contact">Contact Info</option>
                </select>
                <button onClick={() => addSection((document.getElementById('section-select') as HTMLSelectElement).value as PageSectionType)} className="px-6 py-3 bg-stone-900 text-white rounded-xl font-black text-xs uppercase">Add</button>
              </div>
            </div>
            <div className="space-y-4">
              {content.activeSections.map((sec, idx) => (
                <div key={sec.id} className="p-6 bg-stone-50 border border-stone-200 rounded-3xl flex items-center justify-between group transition-all hover:bg-stone-100">
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-stone-400 text-xs">#{idx + 1}</span>
                    <span className="font-black text-stone-900 uppercase tracking-widest text-sm">{sec.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => moveSection(idx, 'up')} className="p-2 hover:bg-white rounded-xl transition-colors">▲</button>
                    <button onClick={() => moveSection(idx, 'down')} className="p-2 hover:bg-white rounded-xl transition-colors">▼</button>
                    <button onClick={() => update({ activeSections: content.activeSections.filter(s => s.id !== sec.id) })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">✖</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'districts' && (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tighter">Project Locations</h3>
              <button onClick={handleAddDistrict} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl">Add New Area</button>
            </div>
            {content.districts.map((d, idx) => (
              <div key={d.id} className="p-8 bg-stone-50 rounded-[3rem] border border-stone-200 space-y-8 relative group">
                <button onClick={() => update({ districts: content.districts.filter(it => it.id !== d.id) })} className="absolute top-8 right-8 text-red-400 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Delete Area</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <LabeledInput label="Internal Name" value={d.name} onChange={v => {
                    const copy = [...content.districts]; copy[idx].name = v; update({ districts: copy });
                  }} />
                  <div className="grid grid-cols-2 gap-4">
                    <LabeledInput label="Display (AM)" value={d.displayName.amharic} onChange={v => {
                      const copy = [...content.districts]; copy[idx].displayName.amharic = v; update({ districts: copy });
                    }} />
                    <LabeledInput label="Display (OR)" value={d.displayName.afaan_oromoo} onChange={v => {
                      const copy = [...content.districts]; copy[idx].displayName.afaan_oromoo = v; update({ districts: copy });
                    }} />
                  </div>
                  <TextArea label="Soil Types" value={d.soilTypes.amharic} onChange={v => {
                    const copy = [...content.districts]; copy[idx].soilTypes.amharic = v; update({ districts: copy });
                  }} />
                  <TextArea label="Crop Recs" value={d.recommendedCrops.amharic} onChange={v => {
                    const copy = [...content.districts]; copy[idx].recommendedCrops.amharic = v; update({ districts: copy });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tighter">Soil Health Problems</h3>
              <button onClick={handleAddIssue} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl">Register Issue</button>
            </div>
            {content.soilIssues.map((issue, idx) => (
              <div key={issue.id} className="p-8 bg-stone-50 rounded-[3rem] border border-stone-200 space-y-6 group relative">
                <button onClick={() => update({ soilIssues: content.soilIssues.filter(it => it.id !== issue.id) })} className="absolute top-8 right-8 text-red-400 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <LabeledInput label="Title (AM)" value={issue.title.amharic} onChange={v => {
                      const copy = [...content.soilIssues]; copy[idx].title.amharic = v; update({ soilIssues: copy });
                    }} />
                    <TextArea label="Description (AM)" value={issue.description.amharic} onChange={v => {
                      const copy = [...content.soilIssues]; copy[idx].description.amharic = v; update({ soilIssues: copy });
                    }} />
                    <TextArea label="Recommendation (AM)" value={issue.recommendation.amharic} onChange={v => {
                      const copy = [...content.soilIssues]; copy[idx].recommendation.amharic = v; update({ soilIssues: copy });
                    }} />
                  </div>
                  <div className="space-y-4">
                    <LabeledInput label="Image URL" value={issue.imageUrl} onChange={v => {
                      const copy = [...content.soilIssues]; copy[idx].imageUrl = v; update({ soilIssues: copy });
                    }} />
                    <FileUpload label="Upload Picture" onUpload={(b64) => {
                       const copy = [...content.soilIssues]; copy[idx].imageUrl = b64; update({ soilIssues: copy });
                    }} />
                    <img src={issue.imageUrl} className="w-full h-40 object-cover rounded-2xl border border-stone-200" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-12">
            <h3 className="text-3xl font-black tracking-tighter">Knowledge Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-stone-50 rounded-[3rem] border border-stone-200 space-y-4">
                 <h4 className="font-black uppercase text-xs tracking-widest text-stone-500">Add New Document</h4>
                 <LabeledInput label="Title" value="" onChange={() => {}} placeholder="Manual Name..." />
                 <FileUpload label="Select File" onUpload={(b64, name) => {
                    const newDoc: Document = { id: `doc-${Date.now()}`, title: { amharic: name, afaan_oromoo: name }, type: 'pdf', url: b64, base64Data: b64 };
                    update({ documents: [...content.documents, newDoc] });
                 }} />
               </div>
               <div className="p-8 bg-stone-50 rounded-[3rem] border border-stone-200 space-y-4">
                 <h4 className="font-black uppercase text-xs tracking-widest text-stone-500">Add New Media</h4>
                 <LabeledInput label="Media Title" value="" onChange={() => {}} placeholder="Video Name..." />
                 <FileUpload label="Select Asset" onUpload={(b64, name) => {
                    const nm: Media = { id: `med-${Date.now()}`, title: { amharic: name, afaan_oromoo: name }, url: b64, thumbnail: b64, base64Data: b64 };
                    update({ media: [...content.media, nm] });
                 }} />
               </div>
            </div>
            <div className="pt-8 border-t border-stone-100">
               <h4 className="font-black text-xl mb-6">Current Assets</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...content.documents, ...content.media].map(item => (
                    <div key={item.id} className="p-4 bg-white border border-stone-100 rounded-2xl flex items-center justify-between shadow-sm">
                       <span className="font-bold text-xs truncate max-w-[120px]">{item.title.amharic}</span>
                       <button onClick={() => {
                         if (item.id.startsWith('doc')) update({ documents: content.documents.filter(d => d.id !== item.id) });
                         else update({ media: content.media.filter(m => m.id !== item.id) });
                       }} className="text-red-500 font-black text-[10px]">DELETE</button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-md space-y-12">
            <h3 className="text-3xl font-black tracking-tighter">Security Credentials</h3>
            <div className="space-y-6">
              <LabeledInput label="Administrator Email" value={content.adminEmail} onChange={v => update({ adminEmail: v })} />
              <div className="pt-8 border-t border-stone-100 space-y-4">
                <h4 className="font-black text-stone-800 text-sm uppercase tracking-widest">Change Access Pin</h4>
                <LabeledInput type="password" label="Current Pin" value={passForm.current} onChange={v => setPassForm({...passForm, current: v})} />
                <LabeledInput type="password" label="New Pin" value={passForm.new} onChange={v => setPassForm({...passForm, new: v})} />
                <LabeledInput type="password" label="Confirm New Pin" value={passForm.confirm} onChange={v => setPassForm({...passForm, confirm: v})} />
                <button 
                  onClick={() => {
                    if (passForm.current === content.adminPassword && passForm.new === passForm.confirm) {
                      update({ adminPassword: passForm.new });
                      alert("Password changed successfully");
                      setPassForm({ current: '', new: '', confirm: '' });
                    } else { alert("Credentials mismatch"); }
                  }}
                  className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-transform"
                >Update Security Key</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
