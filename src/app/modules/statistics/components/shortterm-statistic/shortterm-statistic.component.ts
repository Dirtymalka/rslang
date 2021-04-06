import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStatistic } from '../../../../redux/selectors/statistic.selectors';
import { selectUserWords } from '../../../../redux/selectors/words.selectors';
import { IStatistic } from '../../../shared/models/statistics.models';
import { IUserWord } from '../../../shared/models/word.models';

@Component({
  selector: 'app-shortterm-statistic',
  templateUrl: './shortterm-statistic.component.html',
  styleUrls: ['./shortterm-statistic.component.scss'],
})
export class ShorttermStatisticComponent implements OnInit, OnDestroy {
  statistic: IStatistic;

  userWords: Observable<IUserWord[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectStatistic).subscribe((stat) => {
      this.statistic = stat;
    });
    this.userWords = this.store.select(selectUserWords);
  }

  ngOnDestroy(): void {
    this.userWords = null;
  }
}
