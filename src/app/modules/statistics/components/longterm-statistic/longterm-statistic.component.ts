import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStatistic } from '../../../shared/models/statistics.models';
import { selectStatistic } from '../../../../redux/selectors/statistic.selectors';
import { selectUserWords } from '../../../../redux/selectors/words.selectors';
import { IUserWord } from '../../../shared/models/word.models';

@Component({
  selector: 'app-longterm-statistic',
  templateUrl: './longterm-statistic.component.html',
  styleUrls: ['./longterm-statistic.component.scss'],
})
export class LongtermStatisticComponent implements OnInit {
  statistic: IStatistic;

  userWords$: Observable<IUserWord[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectStatistic).subscribe((stat) => {
      this.statistic = stat;
    });
    this.userWords$ = this.store.select(selectUserWords);
  }
}
