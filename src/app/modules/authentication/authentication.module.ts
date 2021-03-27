import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [AuthenticationRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
