import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {IUserState} from "../state/user.state";

export const selectUserInfo = createFeatureSelector<AppState, IUserState>('user');

export const selectUserId = createSelector(
  selectUserInfo,
  (userInfo) => userInfo.userId
)

export const selectUserToken = createSelector(
  selectUserInfo,
  userInfo => userInfo.tokenOptions.token
)

export const selectUserRefreshToken = createSelector(
  selectUserInfo,
  userInfo => userInfo.tokenOptions.refreshToken
)

export const selectClientTokenTime = createSelector(
  selectUserInfo,
  userInfo => userInfo.tokenOptions.clientTokenTime
)
