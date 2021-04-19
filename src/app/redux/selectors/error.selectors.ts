import { createFeatureSelector } from '@ngrx/store';
import { IError } from '../state/error.state';
import { IAppState } from '../state/app.state';

export const selectErrorState = createFeatureSelector<IAppState, IError>(
  'error',
);
