import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectUserInfo } from '../../redux/selectors/user.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectUserInfo).pipe(
      map((info) => {
        if (info.isAuthorized) {
          return true;
        }
        this.router.navigate(['/'], {
          queryParams: { auth: false },
        });
        return false;
      }),
    );
  }
}
