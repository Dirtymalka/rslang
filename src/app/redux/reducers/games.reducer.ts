import { createReducer, on } from '@ngrx/store';
import { hangmanReducer } from './games.hangman.reducer';
import { fetchWordsWithLevelsSuccess } from '../actions/hangman.actions';

export const gamesReducer = createReducer(
  {
    hangman: {},
    savanna: {},
    audioCall: {},
    sprint: {},
  },
  on(fetchWordsWithLevelsSuccess, (state, { words }) => {
    return {
      ...state,
      hangman: hangmanReducer(null, fetchWordsWithLevelsSuccess({ words })),
    };
  }),
);
