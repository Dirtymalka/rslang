import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthControlModule } from '../ui/auth-control/auth-control.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, OverlayModule, RouterModule, AuthControlModule],
})
export class HeaderModule {}
