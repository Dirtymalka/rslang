import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setError } from '../../../redux/actions/error.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: ErrorEvent) => {
        this.store.dispatch(
          setError({ error: { errorMessage: error.message } }),
        );
        return throwError(error);
      }),
    );
  }
}
