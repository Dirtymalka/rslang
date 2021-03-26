import { NgModule } from '@angular/core';

import { ControlBarComponent } from './control-bar/control-bar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ControlBarComponent],
  imports: [SharedModule],
  exports: [ControlBarComponent],
})
export class ControlBarModule {}
