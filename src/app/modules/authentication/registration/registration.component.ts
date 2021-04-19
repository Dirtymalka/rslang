import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { RegistrationValidators } from '../registration.validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      RegistrationValidators.validEmail,
      Validators.required,
    ]),
    password: new FormControl('', [
      RegistrationValidators.validPassword,
      Validators.required,
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  loading = false;

  error: string;

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router,
  ) {}

  submit(): void {
    this.loading = true;
    this.userService
      .registration(
        this.form.get('email').value,
        this.form.get('password').value,
        this.form.get('name').value,
      )
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['authentication', 'login']);
        },
        (err) => {
          if (err.status === 417) {
            this.error = 'Данный E-mail существует';
          }
          this.loading = false;
        },
      );
  }

  focus(): void {
    this.error = null;
  }

  toLogin(): void {
    this.router.navigate(['authentication', 'login']);
  }
}
