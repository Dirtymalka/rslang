export interface IWord {
  id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  group: number;
  page: number;
  wordsPerExampleSentence: number;
}

export interface IUserWord {
  difficulty: string;
  id: string;
  optional: IOptional;
  wordId: string;
}

export interface IOptional {
  isDifficult: boolean;
  isDeleted: boolean;
  isStudy: boolean;
}

export interface IAggWords {
  paginatedResults: IWord[];
  totalCount: [{ count: number }];
}

export interface IAggWord {
  id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  group: number;
  page: number;
  wordsPerExampleSentence: number;
  userWord: IUserWord;
}

export interface IWordPost {
  difficulty?: string;
  optional: IOptional;
}
