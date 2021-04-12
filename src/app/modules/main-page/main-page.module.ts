import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TeamComponent } from './components/team/team.component';
import { TeammateComponent } from './components/teammate/teammate.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GamesComponent } from './components/games/games.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';
import { CarouselItemElementDirective } from './components/carousel/carousel-item-element.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    TeamComponent,
    TeammateComponent,
    GamesComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElementDirective,
  ],
  imports: [SharedModule, MainPageRoutingModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
