import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  selectUserId,
  selectUserToken,
} from '../../../redux/selectors/user.selectors';
import { IAggWords, IUserWord, IWord, IWordPost } from '../models/wordModels';
import { BACKEND_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class WordsServiceService {
  token: string;

  userId: string;

  constructor(private http: HttpClient, private store: Store) {
    store.select(selectUserId).subscribe((v) => {
      this.userId = v;
    });
    store.select(selectUserToken).subscribe((v) => {
      this.token = v;
    });
  }

  getWords(group: number = 0, page: number = 0): Observable<IWord[]> {
    return this.http.get<IWord[]>(
      `${BACKEND_URL}/words?group=${group}&page=${page}`,
    );
  }

  getWord(id: string): Observable<IWord> {
    return this.http.get<IWord>(`${BACKEND_URL}/words/${id}`);
  }

  getUserWords(): Observable<IUserWord[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };
    return this.http.get<IUserWord[]>(
      `${BACKEND_URL}/users/${this.userId}/words`,
      httpOptions,
    );
  }

  getUserWord(id: string): Observable<IUserWord> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.get<IUserWord>(
      `${BACKEND_URL}/users/${this.userId}/words/${id}`,
      httpOptions,
    );
  }

  postWord(wordId: string, word: IWordPost): Observable<IWordPost> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.post<IWordPost>(
      `${BACKEND_URL}/users/${this.userId}/words/${wordId}`,
      word,
      httpOptions,
    );
  }

  putWord(wordId: string, word: IWordPost): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.put(
      `${BACKEND_URL}/users/${this.userId}/words/${wordId}`,
      word,
      httpOptions,
    );
  }

  deleteWord(wordId: string): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };

    return this.http.delete(
      `${BACKEND_URL}/users/${this.userId}/words/${wordId}`,
      httpOptions,
    );
  }

  getUserAggWords(
    group = null,
    filter = '',
    wordsPerPage = 3600,
  ): Observable<IAggWords> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      }),
    };
    const url =
      `${BACKEND_URL}/users/${this.userId}/aggregatedWords` +
      `?group=${group}&filter=${JSON.stringify(
        filter,
      )}&wordsPerPage=${wordsPerPage}`;

    return this.http.get<IAggWords>(url, httpOptions).pipe(
      map((content) =>
        content[0].paginatedResults.map((w) => {
          const word = w;
          // eslint-disable-next-line no-underscore-dangle
          word.id = w._id;
          // eslint-disable-next-line no-underscore-dangle
          delete word._id;
          return word;
        }),
      ),
    );
  }
}
