import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { selectUserInfo } from '../../redux/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((info) => {
      this.isAuthorized = info.isAuthorized;
    });
  }

  openSideBar(): void {
    const config = new OverlayConfig();

    config.positionStrategy = this.overlay
      .position()
      .global()
      .left(`0px`)
      .top(`0px`);
    config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);
    overlayRef
      .backdropClick()
      .pipe()
      .subscribe(() => overlayRef.dispose());
    const sidebar = overlayRef.attach(
      new ComponentPortal(SidebarComponent, this.viewContainerRef),
    );
    sidebar.instance.closeBar.subscribe(() => overlayRef.dispose());
  }
}
