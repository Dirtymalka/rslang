import { createReducer, on } from '@ngrx/store';
import { fetchACallWordsWithLevelsSuccess } from '../actions/audioCall.actions';
import { hangmanReducer } from './games.hangman.reducer';
import { fetchWordsWithLevelsSuccess } from '../actions/hangman.actions';
<<<<<<< HEAD
import { userLogout } from '../actions/user.actions';
=======
>>>>>>> 59ea3c2 (implement-audio-challenge)
import { audioCallReducer } from './games.audioCall.reducer';

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
  on(fetchACallWordsWithLevelsSuccess, (state, { words }) => {
    return {
      ...state,
      audioCall: audioCallReducer(
        null,
        fetchACallWordsWithLevelsSuccess({ words }),
      ),
    };
  }),
);
