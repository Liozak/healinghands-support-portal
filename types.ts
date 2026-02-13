
export type UrgencyLevel = 'Low' | 'Medium' | 'High';

export enum ProblemCategory {
  Medicine = 'Medicine',
  Appointment = 'Appointment',
  Financial = 'Financial',
  Emergency = 'Emergency',
  Other = 'Other'
}

export enum SkillType {
  Medical = 'Medical',
  Tech = 'Tech',
  Fundraising = 'Fundraising',
  Counseling = 'Counseling',
  Logistics = 'Logistics'
}

export interface PatientRequest {
  id?: string;
  fullName: string;
  age: number;
  phone: string;
  city: string;
  category: ProblemCategory;
  description: string;
  preferredContact: 'Call' | 'WhatsApp';
  aiSummary: string;
  urgencyLevel: UrgencyLevel;
  createdAt: string;
}

export interface Volunteer {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: SkillType;
  availability: 'Weekdays' | 'Weekends' | 'Flexible';
  createdAt: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface AIAnalysis {
  summary: string;
  urgency: UrgencyLevel;
}
