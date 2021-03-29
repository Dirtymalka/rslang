import { createReducer, on } from '@ngrx/store';
import { initialSettingsState } from '../state/settings.state';
import {
  changeSettings,
  getSettingsSuccess,
  changeShowWordTranslation,
  changeCompactView,
  changeDifficultWordButtonMode,
  changeDeleteWordButtonMode,
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
  on(changeShowWordTranslation, (state) => ({
    ...state,
    isShowWordTranslation: !state.isShowWordTranslation,
  })),
  on(changeCompactView, (state) => ({
    ...state,
    isCompactView: !state.isCompactView,
  })),
  on(changeDifficultWordButtonMode, (state) => ({
    ...state,
    isShowDifficultWordButton: !state.isShowDifficultWordButton,
  })),
  on(changeDeleteWordButtonMode, (state) => ({
    ...state,
    isShowDeleteWordButton: !state.isShowDeleteWordButton,
  })),
);
