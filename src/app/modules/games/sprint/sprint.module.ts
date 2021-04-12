import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StartPageComponent } from './components/start-page/start-page.component';
import { SprintComponent } from './sprint.component';
import { SprintRoutingModule } from './sprint-routing.module';
import { GamePageComponent } from './components/game-page/game-page.component';

@NgModule({
  declarations: [StartPageComponent, SprintComponent, GamePageComponent],
  imports: [SharedModule, SprintRoutingModule],
})
export class SprintModule {}
