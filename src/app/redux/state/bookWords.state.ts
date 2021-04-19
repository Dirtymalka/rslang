import { IWord } from '../../modules/shared/models/word.models';

export interface IBookWordsState {
  group0: IWord[];
  group1: IWord[];
  group2: IWord[];
  group3: IWord[];
  group4: IWord[];
  group5: IWord[];
}

export const initialBookWords: IBookWordsState = {
  group0: [],
  group1: [],
  group2: [],
  group3: [],
  group4: [],
  group5: [],
};
