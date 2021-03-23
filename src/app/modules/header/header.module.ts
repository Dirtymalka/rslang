import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, MatIconModule, OverlayModule ],
})
export class HeaderModule {}
