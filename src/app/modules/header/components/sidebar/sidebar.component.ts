import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open => closed', [animate('10s')]),
      transition('closed => open', [animate('10s')]),
    ]),
  ],
})
export class SidebarComponent {
  isOpen = false;

  ngOnInit() {
    console.log('ok');
    this.isOpen = true;
  }
}
