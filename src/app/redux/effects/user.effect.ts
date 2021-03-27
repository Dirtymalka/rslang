import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  userLogin,
  userLoginFailure,
  userLoginSuccess,
  userLogout,
  userRegistration,
  userRegistrationFailure,
  userRegistrationSuccess,
  userTokenUpdate,
  userTokenUpdateFailure,
  userTokenUpdateSuccess,
} from '../actions/user.actions';
import { UserService } from '../../modules/shared/services/user.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { USER } from '../../constants/global.constants';

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
          map((userInfo: { token; refreshToken; userId; name }) => {
            LocalStorageService.setItemToLocalStorage(USER, {
              userId: userInfo.userId,
              tokenOptions: {
                token: userInfo.token,
                refreshToken: userInfo.refreshToken,
              },
            });
            this.router.navigate(['/']);
            return userLoginSuccess(userInfo);
          }),
          catchError((err) => {
            console.log(err);
            return of(userLoginFailure());
          }),
        ),
      ),
    ),
  );

  userLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogout),
      map(() => LocalStorageService.deleteItemFromLocalStorageByKey('user')),
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

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {}
}
