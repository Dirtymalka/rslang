import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WordsServiceService } from '../../modules/shared/services/words-service.service';
import {
  fetchWordsWithLevels,
  fetchWordsWithLevelsFailure,
  fetchWordsWithLevelsSuccess,
} from '../actions/hangman.actions';

@Injectable()
export class HangmanEffect {
  fetchWordsWithLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWordsWithLevels),
      switchMap(({ level, group }) =>
        this.wordService.getWords(+level, +group).pipe(
          map((words) => {
            return fetchWordsWithLevelsSuccess({ words });
          }),
          catchError((err) => {
            console.log(err);
            return of(fetchWordsWithLevelsFailure());
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private wordService: WordsServiceService,
  ) {}
}
