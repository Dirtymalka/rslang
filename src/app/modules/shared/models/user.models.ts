export interface IUser {
  userId: string;
  tokenOptions: {
    token: string;
    refreshToken: string;
    clientTokenTime?: number;
  };
}
