import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  level = '1';

  group = '1';

  groups = new Array(30).fill(null).map((item, idx) => idx + 1);

  fromBook: boolean;

  fromDictionary: boolean;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromBook = !!params.fromBook;
      this.level = params.group || '1';
      this.group = params.page || '1';
      this.fromDictionary = !!params.fromDictionary;
    });
  }

  startGame(): void {
    const queryParamsFromBook = {
      fromBook: true,
    };

    const queryParamsFromDictionary = {
      fromDictionary: true,
    };

    const queryParamsFromSelect = {
      level: this.level,
      group: this.group,
    };

    let queryParams;

    if (this.fromBook) {
      queryParams = queryParamsFromBook;
    } else if (this.fromDictionary) {
      queryParams = queryParamsFromDictionary;
    } else {
      queryParams = queryParamsFromSelect;
    }

    this.router.navigate(['games/hangman/game'], {
      queryParams,
    });
  }
}
