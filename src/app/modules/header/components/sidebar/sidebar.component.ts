import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('onOpen', [
      transition('void => *', [style({ opacity: 0 }), animate('0.3s')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  isAuthorized: boolean;

  @Output() closeBar: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((info) => {
      this.isAuthorized = info.isAuthorized;
    });
  }

  onClose(): void {
    this.closeBar.emit();
  }
}
