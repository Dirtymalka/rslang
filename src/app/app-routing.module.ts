import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   // TODO loadChildren: () => import('./modules/main/main.module').then((m) => m.main),
  // },
  {
    path: 'games',
    loadChildren: () => import('./modules/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: 'vocabulary',
    loadChildren: () => import('./modules/vocabulary/vocabulary.module').then((m) => m.VocabularyModule),
  },
  {
    path: 'textbook',
    loadChildren: () => import('./modules/textbook/textbook.module').then((m) => m.TextbookModule),
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
