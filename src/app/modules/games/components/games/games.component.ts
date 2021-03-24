import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games = [
    { name: 'Savanna', style: 'savanna', path: 'savanna' },
    { name: 'Audio-call', style: 'audio-call', path: 'audio-call' },
    { name: 'Sprint', style: 'sprint', path: 'sprint' },
    { name: 'Hangman', style: 'hangman', path: 'hangman' }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo(path: string): void {
    const route = ['/games', path];
    this.router.navigate(route);
  }

}
