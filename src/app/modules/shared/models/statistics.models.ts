export interface IStatistic {
  id?: string;
  learnedWords?: number;
  optional: IOptional;
}

export interface IOptional {
  audioCall: { bestAnswersSeries: number; result: IStatisticGame[] };
  savanna: { bestAnswersSeries: number; result: IStatisticGame[] };
  hangman: { bestAnswersSeries: number; result: IStatisticGame[] };
  sprint: { bestAnswersSeries: number; result: IStatisticGame[] };
}

export interface IStatisticGame {
  date: number;
  group?: number;
  page?: number;
  correct: number;
  incorrect: number;
  score?: number;
}
