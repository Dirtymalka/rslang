import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { userLogout } from '../../../redux/actions/user.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectUserInfo } from '../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-auth-control',
  templateUrl: './auth-control.component.html',
  styleUrls: ['./auth-control.component.scss'],
})
export class AuthControlComponent implements OnInit {
  isAuthorized: boolean;

  user = {
    name: 'Вы авторизованы',
  };

  @Output() setAuthorized = new EventEmitter<boolean>();

  constructor(public store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((info) => {
      this.isAuthorized = info.isAuthorized;
    });
  }

  onLogout(): void {
    this.store.dispatch(userLogout());
    this.router.navigate(['authentication', 'login']);
  }
}
