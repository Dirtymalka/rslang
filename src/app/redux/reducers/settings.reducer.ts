import { createReducer, on } from '@ngrx/store';
import { initialSettingsState } from '../state/settings.state';
import {
  changeSettings,
  changeSettingsModes,
  getSettingsSuccess,
  changeGroup,
  changePaginationOptions,
} from '../actions/settings.actions';
import { userLogout } from '../actions/user.actions';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(changeGroup, (state, group) => ({
    ...state,
    ...group,
  })),
  on(changePaginationOptions, (state, pagination) => ({
    ...state,
    pagination: { group: pagination.group, page: pagination.page },
  })),
  on(changeSettingsModes, (state, settingsState) => ({
    ...state,
    ...settingsState,
  })),
  on(changeSettings, (state, { settingsState }) => ({
    ...state,
    ...settingsState,
  })),
  on(getSettingsSuccess, (state, { settingsState }) => ({
    ...state,
    ...settingsState,
  })),
  on(userLogout, () => initialSettingsState),
);
