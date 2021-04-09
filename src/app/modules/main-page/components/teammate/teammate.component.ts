import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.scss'],
})
export class TeammateComponent {
  @Input()
  teammate;
}
