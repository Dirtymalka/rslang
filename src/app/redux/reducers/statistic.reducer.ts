import { createReducer, on } from '@ngrx/store';
import { initialStatisticsState } from '../state/statistics.state';
import {
  fetchStatistic,
  fetchStatisticFailure,
  fetchStatisticSuccess,
  putStatisticSuccess,
} from '../actions/statistics.actions';
import { userLogout } from '../actions/user.actions';

export const statisticReducer = createReducer(
  initialStatisticsState,
  on(fetchStatistic, (state) => ({
    ...state,
    fetch: {
      ...state.fetch,
      isFetching: true,
      isError: false,
    },
  })),
  on(fetchStatisticSuccess, (state, { statistic }) => ({
    ...state,
    statisticState: {
      ...state.statisticState,
      ...statistic,
    },
    fetch: {
      ...state.fetch,
      isError: false,
      isFetching: false,
    },
  })),
  on(fetchStatisticFailure, (state) => ({
    ...state,
    fetch: {
      ...state.fetch,
      isFetching: false,
      isError: true,
    },
  })),
  on(putStatisticSuccess, (state, { statistic }) => ({
    ...state,
    statisticState: {
      ...state.statisticState,
      ...statistic,
    },
  })),
  on(userLogout, () => initialStatisticsState),
);
