import { createReducer, on } from '@ngrx/store';
import { initialStatisticsState } from '../state/statistics.state';
import {fetchStatisticSuccess, putStatisticSuccess} from '../actions/statistics.actions';

export const statisticReducer = createReducer(
  initialStatisticsState,
  on(fetchStatisticSuccess, (state, { statistic }) => ({
    ...state,
    ...statistic,
  })),
  on(putStatisticSuccess,(state, { statistic }) => ({
    ...state,
    ...statistic,
  }))
);
