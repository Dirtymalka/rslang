import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStatisticState } from '../../../../redux/selectors/statistic.selectors';
import {
  selectFetchState,
  selectUserWords,
} from '../../../../redux/selectors/words.selectors';
import { IUserWord } from '../../../shared/models/word.models';
import { IStatisticState } from '../../../../redux/state/statistics.state';

@Component({
  selector: 'app-shortterm-statistic',
  templateUrl: './shortterm-statistic.component.html',
  styleUrls: ['./shortterm-statistic.component.scss'],
})
export class ShorttermStatisticComponent implements OnInit, OnDestroy {
  statistic: IStatisticState;

  wordsFetchState$: Observable<{
    userWordsIsFetching: boolean;
    userWordsIsError: boolean;
  }>;

  userWords: Observable<IUserWord[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectStatisticState)
      .subscribe((stat: IStatisticState) => {
        this.statistic = stat;
      });
    this.userWords = this.store.select(selectUserWords);
    this.wordsFetchState$ = this.store.select(selectFetchState);
  }

  ngOnDestroy(): void {
    this.userWords = null;
  }
}
