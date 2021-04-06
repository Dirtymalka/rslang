import { NgModule } from '@angular/core';
import { SavannaRoutingModule } from './savanna-routing.module';
import { SavannaComponent } from './savanna.component';
import { SharedModule } from '../../shared/shared.module';
import { GameResultComponent } from './components/game-result/game-result.component';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [SavannaComponent, GameResultComponent, StartPageComponent],
  imports: [SharedModule, SavannaRoutingModule],
})
export class SavannaModule {}
