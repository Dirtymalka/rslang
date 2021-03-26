import { settingsReducer } from './settings.reducer';
import { userReducer } from './user.reducer';
import { wordsReducer } from './words.reducer';
import { gamesReducer } from './games.reducer';

export default {
  settings: settingsReducer,
  words: wordsReducer,
  user: userReducer,
  games: gamesReducer,
};