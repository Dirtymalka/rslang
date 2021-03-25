import { createReducer, on } from '@ngrx/store';
import { initialSettingsState } from '../state/settings.state';
import {
  changeSettings,
  getSettingsSuccess,
} from '../actions/settings.actions';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(changeSettings, (state, { settingsState }) => ({
    ...state,
    ...settingsState.optional,
  })),
  on(getSettingsSuccess, (state, { settingsState }) => ({
    ...state,
    ...settingsState.optional,
  })),
);
