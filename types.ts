
export interface User {
  name: string;
  avatarUrl: string;
  level: number;
  progress: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  score?: number;
}

export interface DigitalTwinScenario {
  title: string;
  description: string;
  environment: string;
  challenge: string;
}

export interface CurriculumItem {
  year: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export enum View {
  Dashboard = 'DASHBOARD',
  Training = 'TRAINING',
  DigitalTwin = 'DIGITAL_TWIN',
  Curriculum = 'CURRICULUM',
}
