import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setError } from '../../../redux/actions/error.actions';
import { userLogout } from '../../../redux/actions/user.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(
          setError({ error: { errorMessage: error.statusText } }),
        );
        if (error.status === 401) {
          this.store.dispatch(userLogout());
          this.router.navigate(['/authentication/login']);
        }
        return throwError(error);
      }),
    );
  }
}
