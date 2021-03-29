import { createAction, props } from '@ngrx/store';
import { ISettings } from '../../modules/shared/models/settingsModels';

export const changeShowWordTranslation = createAction(
  '[Settings Setting] Change settings isShowWordTranslation',
);

export const changeCompactView = createAction(
  '[Settings Setting] Change settings isCompactView',
);

export const changeDifficultWordButtonMode = createAction(
  '[Settings Setting] Change settings isShowDifficultWordButton',
);

export const changeDeleteWordButtonMode = createAction(
  '[Settings Setting] Change settings isShowDeleteWordButton',
);

export const changeSettings = createAction(
  '[Settings Setting] Change settings',
  props<{ settingsState: ISettings }>(),
);

export const changeSettingsSuccess = createAction(
  '[Settings Setting] Change settings Success',
  props<{ settingsState: ISettings }>(),
);

export const changeSettingsFailure = createAction(
  '[Settings Setting] Change settings Failure',
);

export const getSettings = createAction('[Settings Setting] Get settings');

export const getSettingsSuccess = createAction(
  '[Settings Setting] Get settings Success',
  props<{ settingsState: ISettings }>(),
);

export const getSettingsFailure = createAction(
  '[Settings Setting] Get settings Failure',
);
