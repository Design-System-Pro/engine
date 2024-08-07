export interface KVCredentialsRead {
  readKey: string;
}

export interface KVCredentials {
  accessToken: string;
  refreshToken: string;

  expiresAt: number;
}

export interface KVOAuthState {
  state: string;
}
