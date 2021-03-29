import { NgModule } from '@angular/core';

import { ControlBarComponent } from './control-bar/control-bar.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [ControlBarComponent],
  imports: [SharedModule, SettingsModule],
  exports: [ControlBarComponent],
})
export class ControlBarModule {}
