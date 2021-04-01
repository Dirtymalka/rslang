import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLoginSuccess } from './redux/actions/user.actions';
import { LocalStorageService } from './modules/shared/services/local-storage.service';
import { IUser } from './modules/shared/models/user.models';
import { USER } from './constants/global.constants';
import { selectUserId } from './redux/selectors/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rslang';

  userId: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe((id) => {
      this.userId = id;
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
}
