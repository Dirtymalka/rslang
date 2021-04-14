import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/authentication/auth.guard';
import { NotFoundPageComponent } from './modules/shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(
        (m) => m.MainPageModule,
      ),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./modules/games/games.module').then((m) => m.GamesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./modules/statistics/statistics.module').then(
        (m) => m.StatisticsModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dictionary',
    loadChildren: () =>
      import('./modules/dictionary/dictionary.module').then(
        (m) => m.DictionaryModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'textbook',
    loadChildren: () =>
      import('./modules/textbook/textbook.module').then(
        (m) => m.TextbookModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
