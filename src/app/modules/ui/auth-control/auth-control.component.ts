import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-control',
  templateUrl: './auth-control.component.html',
  styleUrls: ['./auth-control.component.scss'],
})
export class AuthControlComponent {

  isAuthorised: boolean;

  user = {           //TODO: test data
    name: 'TestName',
  };

  onLogin(): void {}
  onLogout(): void {}
}
