import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ISettingsState} from "../state/settings.state";
import {AppState} from "../state/app.state";

export const selectSettings = createFeatureSelector<AppState, ISettingsState>('settings');

export const selectIsShowWordSentence = createSelector(
  selectSettings,
  (settings) => settings.isShowWordSentence
)

export const selectIsShowWordTranslation = createSelector(
  selectSettings,
  (settings) => settings.isShowWordTranslation
)

export const selectIsShowWordMeaning = createSelector(
  selectSettings,
  (settings) => settings.isShowWordMeaning
)

export const selectIsShowOptionalButtons = createSelector(
  selectSettings,
  (settings) => settings.isShowOptionalButtons
)
