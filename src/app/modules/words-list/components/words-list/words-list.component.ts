import { Component } from '@angular/core';
import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent {
  constructor(private wordsService: WordsServiceService) {}
}
