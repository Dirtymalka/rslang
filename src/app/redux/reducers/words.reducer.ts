import { createReducer, on } from '@ngrx/store';
import {
  fetchDifficultWordsSuccess,
  fetchAggUserWordsSuccess,
  fetchAllUserWords,
  fetchAllUserWordsFailure,
  fetchAllUserWordsSuccess,
  fetchAllWordsSuccess,
  putUserWordSuccess,
  selectWord,
  updateSelectedWords,
  fetchWordsForGame,
} from '../actions/words.actions';

import { initialWordsState } from '../state/words.state';
import { userLogout } from '../actions/user.actions';

export const wordsReducer = createReducer(
  initialWordsState,
  on(fetchAllWordsSuccess, (state, { words }) => ({
    ...state,
    allWords: words,
  })),
  on(fetchWordsForGame, (state, { words }) => ({
    ...state,
    wordsForGame: words,
  })),
  on(fetchAllUserWords, (state) => ({
    ...state,
    fetchState: {
      ...state.fetchState,
      userWordsIsFetching: true,
      userWordsIsError: false,
    },
  })),
  on(fetchAllUserWordsSuccess, (state, { userWords }) => ({
    ...state,
    userWords,
    fetchState: {
      ...state.fetchState,
      userWordsIsError: false,
      userWordsIsFetching: false,
    },
  })),
  on(fetchAllUserWordsFailure, (state) => ({
    ...state,
    fetchState: {
      ...state.fetchState,
      userWordsIsFetching: false,
      userWordsIsError: false,
    },
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
  on(fetchDifficultWordsSuccess, (state, { difficultWordsData }) => ({
    ...state,
    difficultWordsData,
  })),
  on(userLogout, () => initialWordsState),
);
