import { createAction, props } from '@ngrx/store';
import { IWord } from '../../modules/shared/models/wordModels';

export const fetchWordsWithLevels = createAction(
  '[Hangman Words] Fetch Hangman Words',
  props<{ level: string; group: string }>(),
);

export const fetchWordsWithLevelsSuccess = createAction(
  '[Hangman Words] Fetch Hangman Words Success',
  props<{ words: IWord[] }>(),
);

export const fetchWordsWithLevelsFailure = createAction(
  '[Hangman Words] Fetch Hangman Words Failure',
);
