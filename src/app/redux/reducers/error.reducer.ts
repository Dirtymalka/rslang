import { createReducer, on } from '@ngrx/store';
import { initialErrorState } from '../state/error.state';
import { resetError, setError } from '../actions/error.actions';

export const errorReducer = createReducer(
  initialErrorState,
  on(setError, (state, { error }) => ({ ...state, ...error })),
  on(resetError, () => ({ ...initialErrorState })),
);
