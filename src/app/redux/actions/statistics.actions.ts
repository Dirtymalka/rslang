import { createAction, props } from '@ngrx/store';
import { IStatistic } from '../../modules/shared/models/statistics.models';

export const fetchStatistic = createAction(
  '[Statistic Statistic] Fetch Statistic',
);

export const fetchStatisticSuccess = createAction(
  '[Statistic Statistic] Fetch Statistic Success',
  props<{ statistic: IStatistic }>(),
);

export const fetchStatisticFailure = createAction(
  '[Statistic Statistic] Fetch Statistic Failure',
);

export const putStatistic = createAction(
  '[Statistic Statistic] Put Statistic',
  props<{ statistic: IStatistic }>(),
);

export const putStatisticSuccess = createAction(
  '[Statistic Statistic] Put Statistic Success',
  props<{ statistic: IStatistic }>(),
);

export const putStatisticFailure = createAction(
  '[Statistic Statistic] Put Statistic Failure',
);
