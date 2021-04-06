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

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(fetchStatistic());
    this.store.dispatch(fetchAllUserWords());
    this.router.navigate(['statistics', 'long-term-progress']);
  }

  // toggleTab(link: { path: string; title: string }) {
  //   this.activeLink = link;
  //   this.router.navigate(['statistics', link.path])
  // }
}
