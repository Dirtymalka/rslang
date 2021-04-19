import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IGamesState } from '../state/games.state';

export const selectAudioCall = createFeatureSelector<IAppState, IGamesState>(
  'games',
);

export const selectAudioCallWords = createSelector(
  selectAudioCall,
  (games) => games.audioCall.words,
);
