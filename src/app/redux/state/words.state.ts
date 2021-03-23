import {
  IAggWord,
  IUserWord,
  IWord,
} from '../../modules/shared/models/wordModels';

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
