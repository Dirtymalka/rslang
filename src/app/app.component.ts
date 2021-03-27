import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLogin, userLoginSuccess } from './redux/actions/user.actions';
import {
  HARD_SKINNED_EMAIL,
  HARD_SKINNED_PASSWORD,
} from './modules/shared/constants/api.constants';
import { LocalStorageService } from './modules/shared/services/local-storage.service';
import { IUser } from './modules/shared/models/user.models';
import { USER } from './constants/global.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rslang';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      userLogin({ email: HARD_SKINNED_EMAIL, password: HARD_SKINNED_PASSWORD }),
    );

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
}
