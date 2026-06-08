export interface PartCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to dynamic associate Lucide icons
  popularVehicles?: string[];
  imageUrl?: string;
  categoryCode: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarLetter: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export type ComplianceDocType = 'privacidade' | 'termos' | 'garantia' | 'troca' | null;
