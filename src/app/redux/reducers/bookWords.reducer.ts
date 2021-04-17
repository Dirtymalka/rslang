import { createReducer, on } from '@ngrx/store';
import {
  fetchGroup0,
  fetchGroup1,
  fetchGroup2,
  fetchGroup3,
  fetchGroup4,
  fetchGroup5,
} from '../actions/bookWords.actions';

import { initialBookWords } from '../state/bookWords.state';

export const bookWordsReducer = createReducer(
  initialBookWords,
  on(fetchGroup0, (state, { words }) => ({
    ...state,
    group0: words,
  })),
  on(fetchGroup1, (state, { words }) => ({
    ...state,
    group1: words,
  })),
  on(fetchGroup2, (state, { words }) => ({
    ...state,
    group2: words,
  })),
  on(fetchGroup3, (state, { words }) => ({
    ...state,
    group3: words,
  })),
  on(fetchGroup4, (state, { words }) => ({
    ...state,
    group4: words,
  })),
  on(fetchGroup5, (state, { words }) => ({
    ...state,
    group5: words,
  })),
);
