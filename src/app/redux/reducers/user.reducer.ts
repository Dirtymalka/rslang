import { createReducer, on } from '@ngrx/store';
import {
  userLogin,
  userLoginFailure,
  userLoginSuccess,
  userLogout,
  userRegistrationSuccess,
  userTokenUpdateSuccess,
} from '../actions/user.actions';
import { initialUserState } from '../state/user.state';

export const userReducer = createReducer(
  initialUserState,
  on(userRegistrationSuccess, (state, { name }) => ({ ...state, name })),
  on(userLogin, (state) => ({ ...state, isFetching: true })),
  on(userLoginSuccess, (state, { token, refreshToken, userId, name }) => ({
    ...state,
    isFetching: false,
    userId,
    name,
    isAuthorized: true,
    tokenOptions: {
      ...state.tokenOptions,
      token,
      refreshToken,
      clientTokenTime: Date.now() + 3 * 60 * 60 * 1000,
    },
  })),
  on(userLoginFailure, (state) => ({ ...state, isFetching: false })),
  on(userTokenUpdateSuccess, (state, { token, refreshToken }) => ({
    ...state,
    isAuthorized: true,
    tokenOptions: {
      ...state.tokenOptions,
      token,
      refreshToken,
      clientTokenTime: Date.now() + 3 * 60 * 60 * 1000,
    },
  })),
  on(userLogout, () => ({ ...initialUserState })),
);
