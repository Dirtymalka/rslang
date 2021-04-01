import { createReducer, on } from '@ngrx/store';
import { initialStatisticsState } from '../state/statistics.state';
import { fetchStatisticSuccess } from '../actions/statistics.actions';

export const statisticReducer = createReducer(
  initialStatisticsState,
  on(fetchStatisticSuccess, (state, { statistic }) => ({
    ...state,
    ...statistic,
  })),
);
