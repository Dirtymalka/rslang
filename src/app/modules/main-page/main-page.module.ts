import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamComponent } from './components/team/team.component';
import { TeammateComponent } from './components/teammate/teammate.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [MainPageComponent, TeamComponent, TeammateComponent],
  imports: [SharedModule, MainPageRoutingModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
