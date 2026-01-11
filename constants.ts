
import { SiteContent } from './types';

export const TRANSLATIONS = {
  afaan_oromoo: {
    selectLanguage: "Qooqee Filadhu",
    selectArea: "Naannoo Keessan Filadhu",
    home: "Ka'umsa",
    chatbot: "Gorsa Keessan",
    admin: "Bulchiinsa",
    contact: "Nu Quunnamaa",
    weather: "Haala Qilleensaa",
    soilHealth: "Fayyaa Biyyee",
    recommendedCrops: "Midhaan Gorfaman",
    soilIssues: "Rakkoolee Biyyee",
    docs: "Sanadoota",
    media: "Miidiyaa",
    soilType: "Gosa Biyyee",
    characteristics: "Amaloota",
    recommendations: "Gorsawwan",
    send: "Ergi",
    askAdvisor: "Gorsa Keessan Gaafadhu...",
    adminLogin: "Seensa Bulchiinsa",
    updateContent: "Qabiyyee Haaromsi",
    logout: "Ba'i",
    districtInfo: "Oofee Naannoo",
    calendar: "Guyyaa Itiyoophiyaa",
  },
  amharic: {
    selectLanguage: "ቋንቋ ይምረጡ",
    selectArea: "አካባቢዎን ይምረጡ",
    home: "መነሻ",
    chatbot: "አማካሪዎ",
    admin: "አስተዳደር",
    contact: "ያግኙን",
    weather: "የአየር ሁኔታ",
    soilHealth: "የአፈር ጤና",
    recommendedCrops: "የሚመከሩ ሰብሎች",
    soilIssues: "የአፈር ችግሮች",
    docs: "ሰነዶች",
    media: "ሚዲያ",
    soilType: "የአፈር አይነት",
    characteristics: "ባህሪያት",
    recommendations: "ምክረ ሃሳቦች",
    send: "ላክ",
    askAdvisor: "አማካሪዎን ይጠይቁ...",
    adminLogin: "የአስተዳዳሪ መግቢያ",
    updateContent: "ይዘትን አዘምን",
    logout: "ውጣ",
    districtInfo: "የአካባቢ መረጃ",
    calendar: "የኢትዮጵያ ቀን",
  }
};

export const INITIAL_CONTENT: SiteContent = {
  siteName: "Soil Health Ethiopia",
  primaryColor: "#065f46",
  secondaryColor: "#064e3b",
  heroImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=2000",
  adminPassword: "1234",
  adminEmail: "ayumam100@gmail.com",
  heroTitle: {
    afaan_oromoo: "Sagantaa Fayyaa Biyyee",
    amharic: "የአፈር ጤና ፕሮጀክት"
  },
  heroSub: {
    afaan_oromoo: "Oomishummaa qonnaan bultootaa guddisuu fi dachee keenya kunuunsuu.",
    amharic: "የአርሶ አደሩን ምርታማነት ማሳደግ እና መሬታችንን መንከባከብ።"
  },
  advisorTitle: {
    amharic: 'የእርስዎ አማካሪ እዚህ አለ',
    afaan_oromoo: 'Gorsi Keessan as jira'
  },
  advisorDesc: {
    amharic: 'ስለ አፈርዎ ጤና፣ ማዳበሪያ እና ሰብል ምርጫ በማንኛውም ጊዜ ይጠይቁ።',
    afaan_oromoo: "Waa'ee fayyaa biyyee keessanii, xaa'oo fi filannoo midhaanii yeroo barbaaddan gaafadhu."
  },
  advisorIcon: '🤖',
  libraryTitle: {
    amharic: 'የእውቀት ማዕከል',
    afaan_oromoo: 'Giddu-gala Beekumsaa'
  },
  libraryDesc: {
    amharic: 'ትምህርታዊ ሰነዶች፣ መመሪያዎች እና የፕሮጀክት ሚዲያ።',
    afaan_oromoo: 'Sanadoota barumsaa, qajeelfamaa fi miidiyaa pirojeektii.'
  },
  issuesTitle: {
    amharic: 'የአፈር ችግሮች',
    afaan_oromoo: 'Rakkoolee Biyyee'
  },
  issuesDesc: {
    amharic: 'የባለሙያ መለያ እና የሕክምና መመሪያዎች።',
    afaan_oromoo: 'Adda baasuu ogeessaa fi qajeelfama yaalaa.'
  },
  contactTitle: {
    amharic: 'የባለሙያ ድጋፍ',
    afaan_oromoo: 'Gargaarsa Ogeessaa'
  },
  contactSub: {
    amharic: 'በአካባቢዎ ካሉ የቴክኒክ ቡድናችን ጋር በቀጥታ ይነጋገሩ።',
    afaan_oromoo: 'Dhaabbata keenya aanaa keessan jiru waliin qunnamaa.'
  },
  districts: [
    {
      id: 'diredawa',
      name: 'Diredawa',
      displayName: { amharic: 'ድሬዳዋ', afaan_oromoo: 'Diredawaa' },
      soilTypes: { amharic: 'አሸዋማ አፈር', afaan_oromoo: 'Sandy Loam' },
      characteristics: { amharic: 'ጥሩ የውሃ ፍሳሽ ያለው', afaan_oromoo: 'Drainage gaarii qaba' },
      frequentIssues: { amharic: 'አሲዳማነት', afaan_oromoo: 'Acidity' },
      recommendedCrops: { amharic: 'ማሽላ, በቆሎ', afaan_oromoo: 'Sorghum, Maize' }
    },
    {
      id: 'haramaya',
      name: 'Haramaya',
      displayName: { amharic: 'ሐረማያ', afaan_oromoo: 'Haramayaa' },
      soilTypes: { amharic: 'ቆላማ አፈር', afaan_oromoo: 'Clay Loam' },
      characteristics: { amharic: 'ከፍተኛ ለምነት', afaan_oromoo: 'Fertility guddaa' },
      frequentIssues: { amharic: 'መሸርሸር', afaan_oromoo: 'Erosion' },
      recommendedCrops: { amharic: 'ድንች, ቀይ ሽንኩርት', afaan_oromoo: 'Potato, Onion' }
    },
    {
      id: 'metta',
      name: 'Metta',
      displayName: { amharic: 'መታ', afaan_oromoo: 'Mettaa' },
      soilTypes: { amharic: 'ጥቁር አፈር', afaan_oromoo: 'Vertisols' },
      characteristics: { amharic: 'ውሃ ይይዛል', afaan_oromoo: 'Bishaan qabata' },
      frequentIssues: { amharic: 'ጨዋማነት', afaan_oromoo: 'Salinity' },
      recommendedCrops: { amharic: 'ስንዴ, ገብስ', afaan_oromoo: 'Wheat, Barley' }
    }
  ],
  activeSections: [
    { id: '1', type: 'hero' },
    { id: '2', type: 'advisor' },
    { id: '3', type: 'library' },
    { id: '4', type: 'stats' },
    { id: '5', type: 'issues' },
    { id: '6', type: 'contact' }
  ],
  soilIssues: [
    {
      id: 's1',
      title: { amharic: 'ጨዋማነት', afaan_oromoo: 'Kukukuba' },
      description: { amharic: 'በአፈር ውስጥ ከፍተኛ የጨው ክምችት ሲኖር ምርታማነት ይቀንሳል።', afaan_oromoo: 'Biyyeen soogidda garmalee qabaachuu.' },
      recommendation: { amharic: 'የውሃ ፍሳሽን ማሻሻል እና ጨውን የሚያጥቡ ሰብሎችን መትከል።', afaan_oromoo: 'Mishaan drenaajii fooyyessuu.' },
      imageUrl: 'https://images.unsplash.com/photo-1594398044299-591b72ede999?auto=format&fit=crop&q=80&w=400'
    }
  ],
  documents: [],
  media: [],
  customModules: [],
  contactEmail: "ayumam100@gmail.com",
  contactPhone: "+251 900 000 000",
  farmers: []
};
