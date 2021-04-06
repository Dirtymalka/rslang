import {
  IAggWord,
  IUserWord,
  IWord,
} from '../../modules/shared/models/word.models';

export interface IWordsState {
  allWords: IWord[];
  selectedWords: IWord[];
  userWords: IUserWord[];
  aggWords: IAggWord[];
  fetchState: {
    userWordsIsFetching: boolean;
    userWordsIsError: boolean;
  };
}

export const initialWordsState: IWordsState = {
  allWords: [],
  selectedWords: [],
  userWords: [],
  aggWords: [],
  fetchState: {
    userWordsIsFetching: false,
    userWordsIsError: false,
  },
};
