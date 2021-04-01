import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, GameStatisticsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    SpinnerComponent,
    GameStatisticsComponent,
  ],
})
export class SharedModule {}
