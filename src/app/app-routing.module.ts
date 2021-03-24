import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './modules/games';
import { TextbookComponent } from './modules/textbook/components/textbook/textbook.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'textbook',
    component: TextbookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
