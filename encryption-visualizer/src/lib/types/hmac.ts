export interface HMACStep {
  stepNumber: number;
  type: 'input' | 'key-padding' | 'inner-hash' | 'outer-hash' | 'output' | 'verify';
  title: string;
  description: string;
  values?: Record<string, string>;
}
