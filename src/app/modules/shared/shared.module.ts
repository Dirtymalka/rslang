import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    GameStatisticsComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    SpinnerComponent,
    GameStatisticsComponent,
    NotFoundPageComponent,
  ],
})
export class SharedModule {}
