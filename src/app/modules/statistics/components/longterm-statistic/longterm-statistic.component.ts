import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFetchState,
  selectUserWords,
} from '../../../../redux/selectors/words.selectors';
import { IUserWord } from '../../../shared/models/word.models';

@Component({
  selector: 'app-longterm-statistic',
  templateUrl: './longterm-statistic.component.html',
  styleUrls: ['./longterm-statistic.component.scss'],
})
export class LongtermStatisticComponent implements OnInit {
  wordsFetchState$: Observable<{
    userWordsIsFetching: boolean;
    userWordsIsError: boolean;
  }>;

  userWords$: Observable<IUserWord[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userWords$ = this.store.select(selectUserWords);
    this.wordsFetchState$ = this.store.select(selectFetchState);
  }
}
