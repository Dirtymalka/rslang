import { createAction, props } from '@ngrx/store';

export const userRegistration = createAction(
  '[User Registration] User Registration',
  props<{ name: string; email: string; password: string }>(),
);

export const userRegistrationSuccess = createAction(
  '[User Registration] User Registration Success',
  props<{ name: string; email: string; password: string }>(),
);

export const userRegistrationFailure = createAction(
  '[User Registration] User Registration Failure',
);

export const userLogin = createAction(
  '[User Login] User Login',
  props<{ email: string; password: string }>(),
);

export const userLoginSuccess = createAction(
  '[User Login] User Login Success',
  props<{
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
  }>(),
);

export const userLoginFailure = createAction('[User Login] User Login Failure');

export const userTokenUpdate = createAction('[User Token] User TokenUpdate');

export const userTokenUpdateSuccess = createAction(
  '[User Token] User TokenUpdate Success',
  props<{ token: string; refreshToken: string }>(),
);

export const userTokenUpdateFailure = createAction(
  '[User Token] User TokenUpdate Failure',
);
