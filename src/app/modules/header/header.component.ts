import { Component, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
  ) {}

  openSideBar() {
    const config = new OverlayConfig();

    config.positionStrategy = this.overlay
      .position()
      .global()
      .left(`${0}px`)
      .top(`${0}px`);
    config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    overlayRef.attach(new ComponentPortal(SidebarComponent, this.viewContainerRef));
  }
}
