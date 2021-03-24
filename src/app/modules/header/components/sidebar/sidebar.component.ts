import { Component, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class SidebarComponent {
  @Output() closeBar = new EventEmitter<void>();

  onClose(): void {
    this.closeBar.emit();
  }
}
