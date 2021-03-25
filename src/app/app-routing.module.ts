import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextbookComponent } from './modules/textbook/components/textbook/textbook.component';

const routes: Routes = [
  // {
  //   path: '',
  //   // TODO loadChildren: () => import('./modules/main/main.module').then((m) => m.main),
  // },
  {
    path: 'games',
    loadChildren: () =>
      import('./modules/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./modules/statistics/statistics.module').then(
        (m) => m.StatisticsModule,
      ),
  },
  {
    path: 'dictionary',
    loadChildren: () =>
      import('./modules/dictionary/dictionary.module').then(
        (m) => m.DictionaryModule,
      ),
  },
  {
    path: 'textbook',
    loadChildren: () =>
      import('./modules/textbook/textbook.module').then(
        (m) => m.TextbookModule,
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
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
