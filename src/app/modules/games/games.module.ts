import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components';

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, MatCardModule, GamesRoutingModule],
  exports: [GamesComponent],
})
export class GamesModule {}
