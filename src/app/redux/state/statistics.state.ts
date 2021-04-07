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
      audioCall: [],
      savanna: [],
      hangman: [],
      sprint: [],
    },
  },
  fetch: {
    isFetching: false,
    isError: false,
  },
};
