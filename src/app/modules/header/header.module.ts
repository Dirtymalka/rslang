import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthControlModule } from '../ui/auth-control/auth-control.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    SharedModule,
    OverlayModule,
    RouterModule,
    AuthControlModule,
    SidebarModule,
  ],
})
export class HeaderModule {}
