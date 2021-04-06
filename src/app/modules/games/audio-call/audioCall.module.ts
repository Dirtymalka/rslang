import { NgModule } from '@angular/core';
import { AudioCallRoutingModule } from './audioCall-routing.module';
import { AudioCallComponent } from './audio-call.component';
import { SharedModule } from '../../shared/shared.module';
import { GameResultComponent } from './components/game-result/game-result.component';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [AudioCallComponent, GameResultComponent, StartPageComponent],
  imports: [SharedModule, AudioCallRoutingModule],
})
export class AudioCallModule {}
