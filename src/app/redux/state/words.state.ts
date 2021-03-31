import { IUserWord, IWord } from '../models/word.models';

export interface IWordsState {
  allWords: IWord[];
  userWords: IUserWord[];
}

export const initialWordsState: IWordsState = {
  allWords: [],
  userWords: [],
};
