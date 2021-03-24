import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
  // {
  //   path: 'games/hangman',
  //   component: hangman-game
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
