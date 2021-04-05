import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ALPHABET } from '../../../../shared/constants/global.constants';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss'],
})
export class KeypadComponent implements OnInit {
  @Input() gameOver: boolean;

  @Input() correctLetters: string[];

  @Input() incorrectLetters: string[];

  @Output() clickLetter = new EventEmitter<string>();

  alphabet: string[];

  ngOnInit(): void {
    this.alphabet = ALPHABET;
  }

  handleClickLetter(letter: string): void {
    this.clickLetter.emit(letter);
  }
}
