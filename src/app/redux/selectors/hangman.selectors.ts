import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IGamesState } from '../state/games.state';

export const selectGames = createFeatureSelector<IAppState, IGamesState>(
  'games',
);

export const selectHangmanWords = createSelector(
  selectGames,
  (games) => games.hangman.words,
);
