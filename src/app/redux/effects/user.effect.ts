import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  userLogin,
  userLoginFailure,
  userLoginSuccess,
  userRegistration,
  userRegistrationFailure,
  userRegistrationSuccess,
  userTokenUpdate,
  userTokenUpdateFailure,
  userTokenUpdateSuccess,
} from '../actions/user.actions';
import { UserService } from '../../modules/shared/services/user.service';

@Injectable()
export class UserEffect {
  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRegistration),
      switchMap(({ name, email, password }) =>
        this.userService.registration(email, password).pipe(
          map(() => userRegistrationSuccess({ name, email, password })),
          catchError((err) => {
            console.log(err);
            return of(userRegistrationFailure());
          }),
        ),
      ),
    ),
  );

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      switchMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((userInfo: { token; refreshToken; userId; name }) =>
            userLoginSuccess(userInfo),
          ),
          catchError((err) => {
            console.log(err);
            return of(userLoginFailure());
          }),
        ),
      ),
    ),
  );

  userToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userTokenUpdate),
      switchMap(() =>
        this.userService.getNewToken().pipe(
          map((userInfo: { token; refreshToken; userId; name }) =>
            userTokenUpdateSuccess(userInfo),
          ),
          catchError((err) => {
            console.log(err);
            return of(userTokenUpdateFailure());
          }),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
