import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  games = [
    { name: 'Саванна', style: 'savanna', path: 'savanna' },
    { name: 'Аудиовызов', style: 'audio-call', path: 'audio-call' },
    { name: 'Спринт', style: 'sprint', path: 'sprint' },
    { name: 'Виселица', style: 'hangman', path: 'hangman' },
  ];

  constructor(private router: Router) {}

  goTo(path: string): void {
    const route = ['/games', path];
    this.router.navigate(route);
  }
}
