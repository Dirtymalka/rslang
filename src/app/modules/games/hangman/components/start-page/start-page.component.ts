import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchStatistic } from '../../../../../redux/actions/statistics.actions';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  level = '1';

  group = '1';

  groups = new Array(30).fill(null).map((item, idx) => idx + 1);

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchStatistic());
  }

  startGame(): void {
    this.router.navigate(['games/hangman/game'], {
      queryParams: { level: this.level, group: this.group },
    });
  }
}
