import { initialUserState, IUserState } from './user.state';
import { initialSettingsState, ISettingsState } from './settings.state';
import { initialWordsState, IWordsState } from './words.state';
import { IGamesState, initialGamesState } from './games.state';

export interface IAppState {
  user: IUserState;
  settings: ISettingsState;
  words: IWordsState;
  games: IGamesState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  settings: initialSettingsState,
  words: initialWordsState,
  games: initialGamesState,
};

export const getInitialState = () => initialAppState;
