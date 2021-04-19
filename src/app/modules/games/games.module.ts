import { NgModule } from '@angular/core';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [SharedModule, GamesRoutingModule],
  exports: [GamesComponent],
})
export class GamesModule {}
