import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectUserInfo } from '../../../redux/selectors/user.selectors';
import { UserService } from '../../shared/services/user.service';
import { userUpdateSuccess } from '../../../redux/actions/user.actions';
import { setError } from '../../../redux/actions/error.actions';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { USER } from '../../../constants/global.constants';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  name = '';

  form: FormGroup;

  userId: string;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectUserInfo).subscribe((userInfo) => {
        this.name = userInfo.name;
        this.userId = userInfo.userId;

        this.form = new FormGroup({
          name: new FormControl(this.name, [Validators.required]),
        });
      }),
    );
  }

  submit(): void {
    this.userService.updateUser(this.form.get('name').value).subscribe(
      (res: { name }) => {
        const user = LocalStorageService.getItemFromLocalStorage(USER) || {};
        LocalStorageService.setItemToLocalStorage(USER, {
          ...user,
          name: res.name,
        });

        this.store.dispatch(userUpdateSuccess({ name: res.name }));
      },
      (error) => this.store.dispatch(setError(error)),
    );
    this.router.navigate(['profile']);
  }
}
