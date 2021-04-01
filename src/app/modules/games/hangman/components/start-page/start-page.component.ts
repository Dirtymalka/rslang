import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
  level = '1';

  group = '1';

  groups = new Array(60).fill(null).map((item, idx) => idx + 1);

  constructor(private router: Router) {}

  startGame(): void {
    this.router.navigate(['games/hangman/game'], {
      queryParams: { level: this.level, group: this.group },
    });
  }
}
