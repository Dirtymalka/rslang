import { createReducer, on } from '@ngrx/store';
import { fetchWordsWithLevelsSuccess } from '../actions/hangman.actions';

export const hangmanReducer = createReducer(
  {
    words: [],
  },
  on(fetchWordsWithLevelsSuccess, (state, { words }) => {
    return { ...state, words };
  }),
);
