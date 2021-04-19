import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userLoginSuccess } from './redux/actions/user.actions';
import { LocalStorageService } from './modules/shared/services/local-storage.service';
import { IUser } from './modules/shared/models/user.models';
import { USER } from './constants/global.constants';
import { selectUserId } from './redux/selectors/user.selectors';
import { selectErrorState } from './redux/selectors/error.selectors';
import { IError } from './redux/state/error.state';
import { resetError } from './redux/actions/error.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'rslang';

  userId: string;

  error: IError;

  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe((id) => {
      this.userId = id;
    });

    this.store.select(selectErrorState).subscribe((error: IError) => {
      this.error = error;
    });

    const user: IUser = LocalStorageService.getItemFromLocalStorage(USER);
    if (user) {
      this.store.dispatch(
        userLoginSuccess({
          token: user.tokenOptions.token,
          refreshToken: user.tokenOptions.refreshToken,
          userId: user.userId,
          clientTokenTime: user.tokenOptions.clientTokenTime,
          name: user.name,
        }),
      );
    }
  }

  ngDoCheck(): void {
    if (this.error?.errorMessage) {
      this.snackBar
        .open(this.error.errorMessage, 'close', {
          duration: 3000,
        })
        .afterDismissed()
        .subscribe(() => {
          this.store.dispatch(resetError());
        });
    }
  }
}
