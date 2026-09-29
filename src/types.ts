/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StationId = 'station-1' | 'station-2' | 'station-3' | 'station-4';

export interface StationInfo {
  id: StationId;
  number: number;
  title: string;
  tagline: string;
  concept: string;
  skillGoal: string;
  color: string;
  accentColor: string;
  iconName: string;
}

export interface TrainingCard {
  id: string;
  name: string;
  category: string;
  legs?: number;
  isAnimal?: boolean;
  isFood?: boolean;
  isHealthy?: boolean;
  sweetness?: 'sweet' | 'savory' | 'neutral';
  weekendFunScore?: number;
  icon: string;
}

export interface SpotTheBotImage {
  id: string;
  title: string;
  src: string;
  isAi: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Detective Master';
  glitches: {
    pointType: 'anatomy' | 'text' | 'edge';
    title: string;
    description: string;
    x: number; // percentage
    y: number; // percentage
  }[];
  realEvidence?: string;
  explanation: string;
}

export interface DilemmaScenario {
  id: string;
  title: string;
  context: string;
  question: string;
  example: string;
  category: 'School & Honesty' | 'Privacy & Friendship' | 'Creativity & Art' | 'Safety & Fact-Checking';
  parentTip: string;
  suggestedAnswers: {
    allowed: string;
    notAllowed: string;
    itDepends: string;
  };
}

export interface PassportState {
  station1Completed: boolean;
  station2Completed: boolean;
  station3Completed: boolean;
  station4Completed: boolean;
  studentName: string;
  schoolName: string;
  completedAt?: string;
}

export interface FamilyAgreement {
  familyName: string;
  rules: string[];
  customRules: string[];
  signatureParent: string;
  signatureStudent: string;
  date: string;
}
