import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AudioCallComponent } from './audio-call.component';
import { GameStatisticsComponent } from '../../shared/components/game-statistics/game-statistics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start-page',
    pathMatch: 'full',
  },
  {
    path: 'start-page',
    component: StartPageComponent,
  },
  {
    path: 'game',
    component: AudioCallComponent,
  },
  {
    path: 'stats',
    component: GameStatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioCallRoutingModule {}
