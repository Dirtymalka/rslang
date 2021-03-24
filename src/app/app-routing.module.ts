import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './modules/games';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
