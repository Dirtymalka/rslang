import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IBookWordsState } from '../state/bookWords.state';

export const selectWords = createFeatureSelector<IAppState, IBookWordsState>(
  'bookWords',
);

export const selectGroup0 = createSelector(
  selectWords,
  (bookWords) => bookWords.group0,
);

export const selectGroup1 = createSelector(
  selectWords,
  (bookWords) => bookWords.group1,
);

export const selectGroup2 = createSelector(
  selectWords,
  (bookWords) => bookWords.group2,
);

export const selectGroup3 = createSelector(
  selectWords,
  (bookWords) => bookWords.group3,
);

export const selectGroup4 = createSelector(
  selectWords,
  (bookWords) => bookWords.group4,
);

export const selectGroup5 = createSelector(
  selectWords,
  (bookWords) => bookWords.group5,
);
