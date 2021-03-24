import {createReducer, on} from "@ngrx/store";
import {userLoginSuccess, userRegistrationSuccess, userTokenUpdateSuccess} from "../actions/user.actions";
import {initialUserState} from "../state/user.state";

export const userReducer = createReducer(
  initialUserState,
  on(
    userRegistrationSuccess,
    (state, { name }) => ({...state, name})),
  on(
    userLoginSuccess,
    (state, { token, refreshToken, userId, name }) => ({...state, userId, name, isAuthorized: true, tokenOptions: {
      ...state.tokenOptions,
        token,
        refreshToken,
        clientTokenTime: Date.now() + (3 * 60 * 60 * 1000),
      }})),
  on(
    userTokenUpdateSuccess,
    (state, { token, refreshToken }) => ({
        ...state, isAuthorized: true, tokenOptions: {
          ...state.tokenOptions,
          token,
          refreshToken,
          clientTokenTime: Date.now() + (3 * 60 * 60 * 1000),
        }
      })),
  );
