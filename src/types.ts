export interface StudioMetric {
  label: string;
  value: string;
  detail: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  recommendedBudget: string;
}

export interface CaseStudyItem {
  id: string;
  badge: string;
  status: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: {
    icon: string;
    label: string;
  }[];
  techStack: string[];
}

export interface PricingPackage {
  id: string;
  tier?: string;
  title: string;
  startingPrice: string;
  priceRange?: string;
  domainHosting?: string;
  description: string;
  isPopular?: boolean;
  timeline?: string;
  features: string[];
  buttonText: string;
  scopeValue: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface InquiryFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  scope: string;
  budget: string;
  details: string;
}
