// Dados principais do questionário
export interface QuestionnaireData {
  projectName: string;
  niche: string;
  colors: string;
  features: string[];
  aiIntegration: string;
  messageAutomation: string;
  targetAudience: string;
  adminPanel: string;
  platform: string;
  observations: string;
  hasLogo: boolean;
  logoFile: File | null;
  colorPalette: string[];
}

// IDs possíveis de perguntas
export type QuestionId = keyof QuestionnaireData | 'logo' | 'colors';

// Tipo de cada pergunta do formulário
export interface Question {
  id: QuestionId;
  title: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'file' | 'color' | 'input';
  options?: { id: string; label: string }[]; // apenas para radio/checkbox
  placeholder?: string;
}

export type QuestionnaireAnswers = Partial<QuestionnaireData> & {
  logo?: File | null;
  colors?: string[];
};
