import { createReducer, on } from '@ngrx/store';
import { hangmanReducer } from './games.hangman.reducer';
import { fetchWordsWithLevelsSuccess } from '../actions/hangman.actions';
import { userLogout } from '../actions/user.actions';

const initialGamesState = {
  hangman: {},
  savanna: {},
  audioCall: {},
  sprint: {},
};

export const gamesReducer = createReducer(
  initialGamesState,
  on(fetchWordsWithLevelsSuccess, (state, { words }) => {
    return {
      ...state,
      hangman: hangmanReducer(null, fetchWordsWithLevelsSuccess({ words })),
    };
  }),
  on(userLogout, () => initialGamesState),
);
