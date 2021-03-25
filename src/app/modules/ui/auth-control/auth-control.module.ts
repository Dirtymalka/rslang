import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthControlComponent } from './auth-control.component';

@NgModule({
  declarations: [AuthControlComponent],
  exports: [AuthControlComponent],
  imports: [CommonModule],
})
export class AuthControlModule {}
