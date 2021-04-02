import { createReducer, on } from '@ngrx/store';
import { initialSettingsState } from '../state/settings.state';
import {
  changeSettings,
  changeSettingsModes,
  getSettingsSuccess,
  changeGroup,
} from '../actions/settings.actions';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(changeGroup, (state, group) => ({
    ...state,
    ...group,
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
);
