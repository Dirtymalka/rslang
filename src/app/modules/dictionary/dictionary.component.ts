import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent {
  constructor(private router: Router) {}

  public startGame(game): void {
    this.router.navigate([`games/${game}/`], {
      queryParams: {
        fromDictionary: true,
      },
    });
  }
}
