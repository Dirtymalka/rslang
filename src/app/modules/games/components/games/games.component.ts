import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  constructor(private router: Router) {}

  goTo(game: string): void {
    const route = ['/games', `${game.toLocaleLowerCase()}`];
    this.router.navigate(route);
  }
}
