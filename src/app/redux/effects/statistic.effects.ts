import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchStatistic,
  fetchStatisticFailure,
  fetchStatisticSuccess,
  putStatistic,
  putStatisticFailure,
  putStatisticSuccess,
} from '../actions/statistics.actions';
import { StatisticService } from '../../modules/shared/services/statistic.service';

@Injectable()
export class StatisticEffects {
  fetchStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStatistic),
      mergeMap(() =>
        this.statisticService.getStatistic().pipe(
          map((statistic) => fetchStatisticSuccess({ statistic })),
          catchError((err) => {
            console.log(err);
            return of(fetchStatisticFailure());
          }),
        ),
      ),
    ),
  );

  putStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putStatistic),
      mergeMap(({ statistic }) =>
        this.statisticService.putStatistics(statistic).pipe(
          map((statistic) => putStatisticSuccess({ statistic })),
          catchError((err) => {
            console.log(err);
            return of(putStatisticFailure());
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private statisticService: StatisticService,
  ) {}
}
