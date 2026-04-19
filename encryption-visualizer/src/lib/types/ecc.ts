export interface ECCPoint {
  x: number;
  y: number;
  isInfinity?: boolean;
}

export interface ECCCurve {
  a: number;
  b: number;
  p: number;
  G: ECCPoint; // generator point
  n: number; // order of G
}

export interface ECCStep {
  stepNumber: number;
  type: 'curve-setup' | 'generator-point' | 'private-key' | 'scalar-multiply' | 'public-key' | 'shared-secret' | 'signing' | 'verification' | 'complete';
  title: string;
  description: string;
  values?: Record<string, string | number>;
  formula?: string;
  calculation?: string;
  point?: ECCPoint;
  curve?: ECCCurve;
}

export interface ECCKeyPair {
  privateKey: number;
  publicKey: ECCPoint;
  curve: ECCCurve;
}

export interface ECDHResult {
  alicePrivate: number;
  alicePublic: ECCPoint;
  bobPrivate: number;
  bobPublic: ECCPoint;
  sharedSecret: ECCPoint;
}

export interface ECDSASignature {
  r: number;
  s: number;
}
