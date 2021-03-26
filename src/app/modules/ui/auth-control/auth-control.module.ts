import { NgModule } from '@angular/core';
import { AuthControlComponent } from './auth-control.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AuthControlComponent],
  exports: [AuthControlComponent],
  imports: [SharedModule],
})
export class AuthControlModule {}
