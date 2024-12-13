export interface IAccountLoginRequest {
  username: number;
  password: string;
}

export interface IAccountLoginResponse {
  username: string;
  accessToken: string;
  expiresIn: number;
  userGroup: string;
  fullName: string;
}
