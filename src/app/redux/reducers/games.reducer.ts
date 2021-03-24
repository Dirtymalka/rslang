import {createReducer} from "@ngrx/store";
import {hangmanReducer} from "./games.hangman.reducer";
import {savannaReducer} from "./games.savanna.reducer";
import {audioCallReducer} from "./games.audioCall.reducer";
import {sprintReducer} from "./games.sprint.reducer";

export const gamesReducer = createReducer(
  {
    hangman: hangmanReducer,
    savanna: savannaReducer,
    audioCall: audioCallReducer,
    sprint: sprintReducer
  }
)
