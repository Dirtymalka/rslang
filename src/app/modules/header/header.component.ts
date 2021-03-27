import { Component, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { selectUserInfo } from '../../redux/selectors/user.selectors';
import { userLogout } from '../../redux/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthorized: boolean;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public store: Store,
    private router: Router,
  ) {
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

  logout(): void {
    this.store.dispatch(userLogout());
    this.router.navigate(['authentication', 'login']);
  }
}
