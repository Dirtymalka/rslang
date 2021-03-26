import { Component } from '@angular/core';

interface ISelectParam {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
})
export class ControlBarComponent {
  selectedValue: string;

  selectedCar: string;

  wordParams: ISelectParam[] = [
    { value: 'param-0', viewValue: 'Слова' },
    { value: 'param-1', viewValue: 'Предложения' },
  ];
}
