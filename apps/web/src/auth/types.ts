export interface RSA_JWK {
  kty: string;
  n: string;
  e: string;
  d?: string | undefined;
  p?: string | undefined;
  q?: string | undefined;
  dp?: string | undefined;
  dq?: string | undefined;
  qi?: string | undefined;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
}
