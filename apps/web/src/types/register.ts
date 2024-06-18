export interface RegisterRequestData {
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponseData {
  token: string;
}
