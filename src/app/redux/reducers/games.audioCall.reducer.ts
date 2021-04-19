import { createReducer, on } from '@ngrx/store';
import { fetchACallWordsWithLevelsSuccess } from '../actions/audioCall.actions';

export const audioCallReducer = createReducer(
  {
    words: [],
  },
  on(fetchACallWordsWithLevelsSuccess, (state, { words }) => {
    return { ...state, words };
  }),
);
