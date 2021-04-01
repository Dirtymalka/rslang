import { createAction, props } from '@ngrx/store';
import { IError } from '../state/error.state';

export const setError = createAction(
  '[Error Error] Set Error',
  props<{ error: IError }>(),
);

export const resetError = createAction('[Error Error] Reset Error');
