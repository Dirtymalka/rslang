import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IOptional, IStatistic } from '../models/statistics.models';
import { BACKEND_URL } from '../constants/api.constants';
import {
  selectUserId,
  selectUserToken,
} from '../../../redux/selectors/user.selectors';

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

  getStatistic(): Observable<IStatistic> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.get<IStatistic>(
      `${BACKEND_URL}/users/${this.userId}/statistics`,
      httpOptions,
    );
  }

  putStatistics(statistic: IStatistic): Observable<IStatistic> {
    const statisticCopy = { ...statistic };
    delete statisticCopy.id;
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
