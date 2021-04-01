import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from '../../../../redux/state/app.state';
import { selectGroup } from '../../../../redux/selectors/settings.selectors';
import { IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import { fetchAllWordsSuccess } from '../../../../redux/actions/words.actions';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent {
  listWords: IWord[] = [];

  group;

  group$: Subscription = this.store$
    .select(selectGroup)
    .subscribe((group: number) => {
      this.group = group;

      this.getWordsList();
    });

  constructor(
    private wordsService: WordsServiceService,
    private store$: Store<IAppState>,
  ) {}

  getWordsList(): void {
    this.wordsService.getWords(this.group, 0).subscribe(
      (listWords: IWord[]) => {
        console.log(listWords);
        this.listWords = listWords;
        console.log('list', this.listWords);

        this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
      },
      (error) => {
        console.log(error.message);
      },
    );
  }

  markAsDifficult(word: IWord): void {
    console.log('list', word);
  }

  markAsDelete(word: IWord): void {
    console.log('list', word);
  }
}
