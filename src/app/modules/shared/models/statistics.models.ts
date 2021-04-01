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
  Date?: number;
  Group?: number;
  Page?: number;
  Correct: number;
  Incorrect: number;
  Score?: number;
}
