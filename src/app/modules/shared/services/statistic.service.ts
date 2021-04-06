import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  IOptional,
  IStatistic,
  IStatisticGame,
} from '../models/statistics.models';
import { BACKEND_URL } from '../constants/api.constants';
import {
  selectUserId,
  selectUserToken,
} from '../../../redux/selectors/user.selectors';
import { getDayFromDate } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  userId: string;

  token: string;

  constructor(private http: HttpClient, private store: Store) {
    store.select(selectUserId).subscribe((id) => {
      this.userId = id;
    });
    store.select(selectUserToken).subscribe((token) => {
      this.token = token;
    });
  }

  static createObject(value: IOptional): { optional: IOptional } {
    return {
      optional: value,
    };
  }

  static createGameStat(
    correct: number,
    incorrect: number,
    bestAnswersSeries: number,
  ): IStatisticGame {
    return {
      date: getDayFromDate(Date.now()),
      correct,
      incorrect,
      bestAnswersSeries,
    };
  }

  getStatistic(): Observable<IStatistic> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http
      .get<IStatistic>(
        `${BACKEND_URL}/users/${this.userId}/statistics`,
        httpOptions,
      )
      .pipe(
        map((res) => {
          const resCopy = { ...res };
          const { optional } = resCopy;

          Object.keys(optional).forEach((game) => {
            resCopy.optional[game] = JSON.parse(optional[game]);
          });

          return resCopy;
        }),
      );
  }

  putStatistics(statistic: IStatistic): Observable<IStatistic> {
    const statisticCopy = { ...statistic, optional: { ...statistic.optional } };
    delete statisticCopy.id;

    const { optional } = statisticCopy;

    Object.keys(optional).forEach((game) => {
      optional[game] = JSON.stringify(optional[game]);
    });

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.put<IStatistic>(
      `${BACKEND_URL}/users/${this.userId}/statistics`,
      statisticCopy,
      httpOptions,
    );
  }
}
