import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISettingsState } from '../state/settings.state';
import { IAppState } from '../state/app.state';

export const selectSettings = createFeatureSelector<IAppState, ISettingsState>(
  'settings',
);

export const selectIsShowWordTranslation = createSelector(
  selectSettings,
  (settings: ISettingsState) => settings.isShowWordTranslation,
);

export const selectIsWordsView = createSelector(
  selectSettings,
  (settings) => settings.isWordsView,
);

export const selectIsCompactView = createSelector(
  selectSettings,
  (settings) => settings.isCompactView,
);

export const selectIsShowDifficultWordButton = createSelector(
  selectSettings,
  (settings) => settings.isShowDifficultWordButton,
);

export const selectIsShowDeleteWordButton = createSelector(
  selectSettings,
  (settings) => settings.isShowDeleteWordButton,
);
