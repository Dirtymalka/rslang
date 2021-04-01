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
