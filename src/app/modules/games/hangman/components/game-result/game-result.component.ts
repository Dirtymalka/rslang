import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent {
  @Input() gameOver: boolean;

  @Input() isSuccessResult: boolean;

  @Input() word: string;

  @Output() next = new EventEmitter();

  continue(): void {
    this.next.emit();
  }
}
