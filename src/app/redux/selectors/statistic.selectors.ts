import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IStatisticState } from '../state/statistics.state';

export const selectStatisticState = createFeatureSelector<
  IAppState,
  IStatisticState
>('statistic');

export const selectStatistic = createSelector(
  selectStatisticState,
  (state) => state.statisticState,
);
