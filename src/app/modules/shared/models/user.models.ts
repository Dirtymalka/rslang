export interface IUser {
  userId: string;
  name?: string;
  tokenOptions: {
    token: string;
    refreshToken: string;
    clientTokenTime?: number;
  };
}
