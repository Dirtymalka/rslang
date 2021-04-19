import { initialUserState, IUserState } from './user.state';
import { initialSettingsState, ISettingsState } from './settings.state';
import { initialWordsState, IWordsState } from './words.state';
import { initialBookWords, IBookWordsState } from './bookWords.state';
import { IGamesState, initialGamesState } from './games.state';
import { initialStatisticsState, IStatisticState } from './statistics.state';
import { IError, initialErrorState } from './error.state';

export interface IAppState {
  user: IUserState;
  settings: ISettingsState;
  words: IWordsState;
  bookWords: IBookWordsState;
  games: IGamesState;
  statistic: IStatisticState;
  error: IError;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  settings: initialSettingsState,
  words: initialWordsState,
  bookWords: initialBookWords,
  games: initialGamesState,
  statistic: initialStatisticsState,
  error: initialErrorState,
};

export const getInitialState = (): IAppState => initialAppState;
