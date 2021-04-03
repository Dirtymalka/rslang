import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
  },
  // {
  //   path: 'savanna',
  //   component: savanna-game
  // },
  // {
  //   path: 'audio-call',
  //   component: audio-game
  // },
  // {
  //   path: 'sprint',
  //   component: sprint-game
  // },
  {
    path: 'hangman',
    loadChildren: () =>
      import('./hangman/hangman.module').then((m) => m.HangmanModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
