import { createReducer, on } from '@ngrx/store';
import {
  fetchAggUserWordsSuccess,
  fetchAllUserWordsSuccess,
  fetchAllWordsSuccess,
  putUserWordSuccess,
  selectWord,
  updateSelectedWords,
} from '../actions/words.actions';
import { initialWordsState } from '../state/words.state';

export const wordsReducer = createReducer(
  initialWordsState,
  on(fetchAllWordsSuccess, (state, { words }) => ({
    ...state,
    allWords: words,
  })),
  on(fetchAllUserWordsSuccess, (state, { userWords }) => ({
    ...state,
    userWords,
  })),
  on(fetchAggUserWordsSuccess, (state, { aggWords }) => ({
    ...state,
    aggWords,
  })),
  on(putUserWordSuccess, (state) => ({ ...state })),
  on(selectWord, (state, { words }) => ({
    ...state,
    selectedWords: state.selectedWords.concat(words),
  })),
  on(updateSelectedWords, (state, { words }) => ({
    ...state,
    selectedWords: words,
  })),
);
