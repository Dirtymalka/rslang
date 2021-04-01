import { IStatistic } from '../../modules/shared/models/statistics.models';

export const initialStatisticsState: IStatistic = {
  id: null,
  optional: {
    audioCall: [],
    savanna: [],
    hangman: [],
    sprint: [],
  },
};
