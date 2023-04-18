export interface User {
  username: string;
  fullName: string;
}

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}