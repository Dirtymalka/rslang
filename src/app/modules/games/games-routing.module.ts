import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
  },
  // {
  //   path: 'games/savanna',
  //   component: savanna-game
  // },
  // {
  //   path: 'games/audio-call',
  //   component: audio-game
  // },
  // {
  //   path: 'games/sprint',
  //   component: sprint-game
  // },
  {
    path: 'games/hangman',
    loadChildren: () =>
      import('./hangman/hangman.module').then((m) => m.HangmanModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
