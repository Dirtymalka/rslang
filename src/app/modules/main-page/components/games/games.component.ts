import { Component } from '@angular/core';
import { GAMES, IGame } from '../../../shared/models/games.models';

@Component({
  selector: 'app-games-section',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  games: IGame[] = GAMES;
}
