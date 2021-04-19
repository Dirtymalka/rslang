import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WordsServiceService } from '../../modules/shared/services/words-service.service';
import {
  fetchACallWordsWithLevels,
  fetchACallWordsWithLevelsFailure,
  fetchACallWordsWithLevelsSuccess,
} from '../actions/audioCall.actions';

@Injectable()
export class AudioCallEffect {
  fetchWordsACWithLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchACallWordsWithLevels),
      switchMap(({ level, group }) =>
        this.wordService.getWords(+level, +group).pipe(
          map((words) => {
            return fetchACallWordsWithLevelsSuccess({ words });
          }),
          catchError((err) => {
            console.log(err);
            return of(fetchACallWordsWithLevelsFailure());
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
