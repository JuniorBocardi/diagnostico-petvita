export type Step = 
  | 'welcome' 
  | 'pet_data' 
  | 'symptoms' 
  | 'intensity' 
  | 'history' 
  | 'processing' 
  | 'result';

export interface PetData {
  name: string;
  breed: string;
  age: string;
  weight: string;
  size: 'Pequeno' | 'Médio' | 'Grande' | '';
  gender: 'Macho' | 'Fêmea' | '';
}

export interface IntensityData {
  coceira: number;
  lambedura: number;
  pele: number;
  fezes: number;
  energia: number;
}

export interface HistoryData {
  duration: string;
  previousSolutions: string;
}

export interface DiagnosticState {
  step: Step;
  petData: PetData;
  symptoms: string[];
  intensity: IntensityData;
  history: HistoryData;
}

export const initialDiagnosticState: DiagnosticState = {
  step: 'welcome',
  petData: {
    name: '',
    breed: '',
    age: '',
    weight: '',
    size: '',
    gender: '',
  },
  symptoms: [],
  intensity: {
    coceira: 0,
    lambedura: 0,
    pele: 0,
    fezes: 0,
    energia: 0,
  },
  history: {
    duration: '',
    previousSolutions: '',
  },
};
