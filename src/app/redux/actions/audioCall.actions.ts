import { createAction, props } from '@ngrx/store';
import { IWord } from '../../modules/shared/models/word.models';

export const fetchACallWordsWithLevels = createAction(
  '[AudioCall Words] Fetch AudioCall Words',
  props<{ level: string; group: string }>(),
);

export const fetchACallWordsWithLevelsSuccess = createAction(
  '[AudioCall Words] Fetch AudioCall Words Success',
  props<{ words: IWord[] }>(),
);

export const fetchACallWordsWithLevelsFailure = createAction(
  '[AudioCall Words] Fetch AudioCall Words Failure',
);
