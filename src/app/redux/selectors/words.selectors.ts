import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IWordsState } from '../state/words.state';

export const selectWords = createFeatureSelector<IAppState, IWordsState>(
  'words',
);

export const selectAllWords = createSelector(
  selectWords,
  (words) => words.allWords,
);

export const selectUserWords = createSelector(
  selectWords,
  (words) => words.userWords,
);

export const selectSelectedWords = createSelector(
  selectWords,
  (words) => words.selectedWords,
);

export const selectAggWords = createSelector(
  selectWords,
  (words) => words.aggWords,
);

export const selectStudyWords = createSelector(selectWords, (words) =>
  words.aggWords.filter(
    (word) =>
      word.userWord.optional.isStudy === true &&
      word.userWord.optional.isDeleted === false,
  ),
);

export const selectDifficultWords = createSelector(selectWords, (words) =>
  words.aggWords.filter(
    (word) =>
      word.userWord.optional.isDifficult === true &&
      word.userWord.optional.isDeleted === false,
  ),
);

export const selectDeletedWords = createSelector(selectWords, (words) =>
  words.aggWords.filter((word) => word.userWord.optional.isDeleted === true),
);
