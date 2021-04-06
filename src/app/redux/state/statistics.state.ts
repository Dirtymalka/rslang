import { IOptional } from '../../modules/shared/models/statistics.models';

export interface IStatisticState {
  statisticState: {
    optional: IOptional;
  };
  fetch: {
    isFetching: boolean;
    isError: boolean;
  };
}

export const initialStatisticsState: IStatisticState = {
  statisticState: {
    optional: {
      audioCall: { bestAnswersSeries: 0, result: [] },
      savanna: { bestAnswersSeries: 0, result: [] },
      hangman: { bestAnswersSeries: 0, result: [] },
      sprint: { bestAnswersSeries: 0, result: [] },
    },
  },
  fetch: {
    isFetching: false,
    isError: false,
  },
};
