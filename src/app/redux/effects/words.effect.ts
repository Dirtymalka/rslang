import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WordsServiceService } from '../../modules/shared/services/words-service.service';
import {
  deleteUserWord,
  deleteUserWordFailure,
  deleteUserWordSuccess,
  fetchAggUserWords,
  fetchAggUserWordsFailure,
  fetchAggUserWordsSuccess,
  fetchAllUserWords,
  fetchAllUserWordsFailure,
  fetchAllUserWordsSuccess,
  fetchAllWords,
  fetchAllWordsFailure,
  fetchAllWordsSuccess,
  postUserWord,
  postUserWordFailure,
  postUserWordSuccess,
  putUserWord,
  putUserWordFailure,
  putUserWordSuccess,
} from '../actions/words.actions';
import { IWordPost } from '../../modules/shared/models/word.models';

@Injectable()
export class WordsEffect {
  fetchWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllWords),
      mergeMap(() =>
        this.wordService.getWords().pipe(
          map((words) => fetchAllWordsSuccess({ words })),
          catchError((err) => {
            console.log(err);
            return of(fetchAllWordsFailure());
          }),
        ),
      ),
    ),
  );

  fetchUserWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllUserWords),
      switchMap(() =>
        this.wordService.getUserWords().pipe(
          map((userWords) => fetchAllUserWordsSuccess({ userWords })),
          catchError((err) => {
            console.log(err);
            return of(fetchAllUserWordsFailure());
          }),
        ),
      ),
    ),
  );

  postUserWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postUserWord),
      switchMap(({ wordId, word }) =>
        this.wordService.postWord(wordId, word).pipe(
          map((wordsInfo: IWordPost) => postUserWordSuccess({ wordsInfo })),
          catchError((err) => {
            console.log(err);
            return of(postUserWordFailure());
          }),
        ),
      ),
    ),
  );

  putUserWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putUserWord),
      switchMap(({ wordId, word }) =>
        this.wordService.putWord(wordId, word).pipe(
          map((wordsInfo: { wordId; word }) => putUserWordSuccess(wordsInfo)),
          catchError((err) => {
            console.log(err);
            return of(putUserWordFailure());
          }),
        ),
      ),
    ),
  );

  deleteUserWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserWord),
      switchMap(({ wordId }) =>
        this.wordService.deleteWord(wordId).pipe(
          map(() => deleteUserWordSuccess()),
          catchError((err) => {
            console.log(err);
            return of(deleteUserWordFailure());
          }),
        ),
      ),
    ),
  );

  fetchUserAggWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAggUserWords),
      switchMap(({ group, filter, wordsPerPage }) =>
        this.wordService.getUserAggWords(group, filter, wordsPerPage).pipe(
          map((aggWords) => fetchAggUserWordsSuccess({ aggWords })),
          catchError((err) => {
            console.log(err);
            return of(fetchAggUserWordsFailure());
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
