export interface IStatistic {
  id?: string;
  learnedWords?: number;
  optional: IOptional;
}

export interface IOptional {
  audioCall: IStatisticGame[];
  savanna: IStatisticGame[];
  hangman: IStatisticGame[];
  sprint: IStatisticGame[];
}

export interface IStatisticGame {
  date: number;
  group?: number;
  page?: number;
  correct: number;
  incorrect: number;
  score?: number;
  bestAnswersSeries: number;
}
