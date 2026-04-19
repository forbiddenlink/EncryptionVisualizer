export type PaddingScheme = 'pkcs7' | 'zero' | 'ansi-x923';

export interface PaddingStep {
  stepNumber: number;
  type: 'input' | 'measure' | 'calculate-padding' | 'apply-padding' | 'show-blocks' | 'verify';
  title: string;
  description: string;
  scheme: PaddingScheme;
  values?: Record<string, string | number>;
  blocks?: string[];
  paddingBytes?: number[];
}
