import {IUserWord, IWord} from "../../modules/shared/models/wordModels";

export interface IWordsState {
  allWords: IWord[];
  userWords: IUserWord[];
}

export const initialWordsState: IWordsState = {
  allWords: [],
  userWords: []
}
