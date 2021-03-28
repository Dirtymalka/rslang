import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userLogin } from '../../../redux/actions/user.actions';
import {selectIsFetching, selectUserId} from '../../../redux/selectors/user.selectors';
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isFetching: Observable<boolean>;
  error: any;
  userId: any;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.select(selectUserId).subscribe((id) => {
      this.userId = id;
    });
   this.isFetching = this.store.select(selectIsFetching);
  }

  submit() {
    this.store.dispatch(
      userLogin({
        email: this.form.get('email').value,
        password: this.form.get('password').value,
      }),
    );
  }

  toRegistration() {
    this.router.navigate(['authentication', 'register']);
  }
}
