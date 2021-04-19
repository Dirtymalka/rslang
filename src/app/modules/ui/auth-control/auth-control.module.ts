import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthControlComponent } from './auth-control.component';

@NgModule({
  declarations: [AuthControlComponent],
  exports: [AuthControlComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class AuthControlModule {}
