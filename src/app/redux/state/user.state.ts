export interface IUserState {
  isAuthorized: boolean;
  name: string;
  userId: string;
  isFetching: boolean;
  tokenOptions: {
    token: string;
    clientTokenTime: number;
    refreshToken: string;
  };
}

export const initialUserState: IUserState = {
  isAuthorized: false,
  name: null,
  userId: null,
  isFetching: false,
  tokenOptions: {
    token: null,
    clientTokenTime: null,
    refreshToken: null,
  },
};
