import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { selectUserInfo } from '../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  name: string;

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectUserInfo).subscribe((userInfo) => {
        this.name = userInfo.name;
      }),
    );
  }

  editProfile(): void {
    this.router.navigate(['profile', 'edit']);
  }
}
