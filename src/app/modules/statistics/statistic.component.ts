import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { fetchStatistic } from '../../redux/actions/statistics.actions';
import { fetchAllUserWords } from '../../redux/actions/words.actions';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  links = [
    { title: 'Статистика', path: 'long-term-progress' },
    { title: 'Детали', path: 'short-term-progress' },
  ];

  activeLink = this.links[0];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchStatistic());
    this.store.dispatch(fetchAllUserWords());
  }
}
