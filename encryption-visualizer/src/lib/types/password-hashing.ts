export interface PasswordHashStep {
  stepNumber: number;
  type: 'input' | 'generate-salt' | 'combine' | 'iterate' | 'stretch' | 'output' | 'verify';
  title: string;
  description: string;
  values?: Record<string, string | number>;
  iteration?: number;
  totalIterations?: number;
}
