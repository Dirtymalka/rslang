import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  selectClientTokenTime,
  selectUserId,
} from '../../../redux/selectors/user.selectors';
import { userTokenUpdate } from '../../../redux/actions/user.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  clientTokenTime: number;

  userId: string;

  constructor(private store: Store) {
    this.store.select(selectClientTokenTime).subscribe((clientTokenTime) => {
      this.clientTokenTime = clientTokenTime;
    });
    this.store.select(selectUserId).subscribe((userID) => {
      this.userId = userID;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (
      this.clientTokenTime &&
      Date.now() >= this.clientTokenTime &&
      !req.url.includes('tokens')
    ) {
      this.store.dispatch(userTokenUpdate());
    }
    return next.handle(req);
  }
}
