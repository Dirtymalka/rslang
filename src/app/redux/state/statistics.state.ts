import { IStatistic } from '../../modules/shared/models/statistics.models';

export const initialStatisticsState: IStatistic = {
  optional: {
    audioCall: { bestAnswersSeries: 0, result: [] },
    savanna: { bestAnswersSeries: 0, result: [] },
    hangman: { bestAnswersSeries: 0, result: [] },
    sprint: { bestAnswersSeries: 0, result: [] },
  },
};
