import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userLogin, userLoginSuccess } from './redux/actions/user.actions';
import {
  HARD_SKINNED_EMAIL,
  HARD_SKINNED_PASSWORD,
} from './modules/shared/constants/api.constants';
import { LocalStorageService } from './modules/shared/services/local-storage.service';
import { IUser } from './modules/shared/models/user.models';
import { USER } from './constants/global.constants';
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

  error: IError;

  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.dispatch(
      userLogin({ email: HARD_SKINNED_EMAIL, password: HARD_SKINNED_PASSWORD }),
    );

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
