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
  {
    path: 'savanna',
    loadChildren: () =>
      import('./savanna/savanna.module').then((m) => m.SavannaModule),
  },
  {
    path: 'sprint',
    loadChildren: () =>
      import('./sprint/sprint.module').then((m) => m.SprintModule),
  },
  {
    path: 'audio-call',
    loadChildren: () =>
      import('./audio-call/audioCall.module').then((m) => m.AudioCallModule),
  },
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
