import { Component } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent {
  links = ['Изучаемые слова', 'Сложные слова', 'Удалённые слова'];

  activeLink = this.links[0];
}
