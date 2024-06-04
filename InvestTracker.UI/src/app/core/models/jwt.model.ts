export interface Jwt {
  aud: string;
  exp: number;
  iat: string;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  system_role: string;
  system_subscription: string;
  unique_name: string;
}