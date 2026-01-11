
export type Language = 'afaan_oromoo' | 'amharic';

export type District = string;

export type PageSectionType = 'hero' | 'advisor' | 'library' | 'issues' | 'contact' | 'stats' | 'custom' | 'weather';

export interface PageSection {
  id: string;
  type: PageSectionType;
  customId?: string; // Link to a CustomModule if type is 'custom'
}

export interface SoilIssue {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  recommendation: Record<Language, string>;
  imageUrl: string;
}

export interface Document {
  id: string;
  title: Record<Language, string>;
  type: 'pdf' | 'doc' | 'video';
  url: string;
  base64Data?: string;
}

export interface Media {
  id: string;
  title: Record<Language, string>;
  url: string;
  thumbnail: string;
  base64Data?: string;
}

export interface CustomModule {
  id: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  backgroundColor?: string;
}

export interface DistrictData {
  id: string;
  name: string;
  displayName: Record<Language, string>;
  soilTypes: Record<Language, string>;
  characteristics: Record<Language, string>;
  frequentIssues: Record<Language, string>;
  recommendedCrops: Record<Language, string>;
}

export interface FarmerUser {
  id: string;
  name: string;
  district: string;
  joinedDate: string;
  lastActive: string;
  status: 'active' | 'restricted';
}

export interface SiteContent {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  heroImageUrl: string;
  adminPassword: string;
  adminEmail: string;
  
  heroTitle: Record<Language, string>;
  heroSub: Record<Language, string>;
  advisorTitle: Record<Language, string>;
  advisorDesc: Record<Language, string>;
  advisorIcon: string;
  libraryTitle: Record<Language, string>;
  libraryDesc: Record<Language, string>;
  issuesTitle: Record<Language, string>;
  issuesDesc: Record<Language, string>;
  contactTitle: Record<Language, string>;
  contactSub: Record<Language, string>;
  
  districts: DistrictData[];
  activeSections: PageSection[];
  
  soilIssues: SoilIssue[];
  documents: Document[];
  media: Media[];
  customModules: CustomModule[];
  
  contactEmail: string;
  contactPhone: string;
  
  farmers: FarmerUser[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
