import { initialUserState, IUserState } from './user.state';
import { initialSettingsState, ISettingsState } from './settings.state';
import { initialWordsState, IWordsState } from './words.state';
import { IGamesState, initialGamesState } from './games.state';
import { IError, initialErrorState } from './error.state';

export interface IAppState {
  user: IUserState;
  settings: ISettingsState;
  words: IWordsState;
  games: IGamesState;
  error: IError;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  settings: initialSettingsState,
  words: initialWordsState,
  games: initialGamesState,
  error: initialErrorState,
};

export const getInitialState = (): IAppState => initialAppState;
