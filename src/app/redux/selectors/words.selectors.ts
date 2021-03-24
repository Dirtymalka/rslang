import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {IWordsState} from "../state/words.state";

export const selectWords = createFeatureSelector<AppState, IWordsState>('words');

export const selectAllWords = createSelector(
  selectWords,
  (words) => words.allWords
)
