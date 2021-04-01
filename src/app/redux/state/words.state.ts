import {
  IAggWord,
  IUserWord,
  IWord,
} from '../../modules/shared/models/word.models';

export interface IWordsState {
  allWords: IWord[];
  userWords: IUserWord[];
  aggWords: IAggWord[];
}

export const initialWordsState: IWordsState = {
  allWords: [],
  userWords: [],
  aggWords: [],
};
