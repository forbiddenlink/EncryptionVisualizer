export interface TLSStep {
  stepNumber: number;
  type: 'client-hello' | 'server-hello' | 'key-share' | 'derive-keys' | 'certificate' | 'verify' | 'finished' | 'application-data';
  title: string;
  description: string;
  actor: 'client' | 'server' | 'both';
  values?: Record<string, string | number>;
  protocol?: string;
  cipherSuite?: string;
  dataExchanged?: {
    direction: 'client-to-server' | 'server-to-client';
    encrypted: boolean;
    content: string;
  };
}

export interface TLSSession {
  clientRandom: string;
  serverRandom: string;
  cipherSuite: string;
  sharedSecret: number;
  masterSecret: string;
  steps: TLSStep[];
}
