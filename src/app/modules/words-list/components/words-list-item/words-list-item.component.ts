import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  selectUserWord,
  updateSelectedWords,
} from '../../../../redux/actions/words.actions';
import {
  selectIsShowWordTranslation,
  selectIsShowDifficultWordButton,
  selectIsShowDeleteWordButton,
} from '../../../../redux/selectors/settings.selectors';
import { selectSelectedWords } from '../../../../redux/selectors/words.selectors';
import { IAppState } from '../../../../redux/state/app.state';
import { IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list-item',
  templateUrl: './words-list-item.component.html',
  styleUrls: ['./words-list-item.component.scss'],
})
export class WordsListItemComponent {
  @Input()
  word: IWord;

  itemSelected = false;

  wordsInSelected: IWord[];

  selectedItems$: Subscription = this.store$
    .select(selectSelectedWords)
    .subscribe((selectedWords: IWord[]) => {
      this.wordsInSelected = selectedWords;
    });

  isShowWordTranslation$: Observable<boolean> = this.store$.select(
    selectIsShowWordTranslation,
  );

  isShowDifficultWordButton$: Observable<boolean> = this.store$.select(
    selectIsShowDifficultWordButton,
  );

  isShowDeleteWordButton$: Observable<boolean> = this.store$.select(
    selectIsShowDeleteWordButton,
  );

  constructor(
    private store$: Store<IAppState>,
    private wordsService: WordsServiceService,
  ) {}

  onDiffucultButtonClick(): void {
    console.log('difficult');
    console.log(this.word);
  }

  onDeleteButtonClick(): void {
    console.log('delete');
    console.log(this.word);
  }

  onIconSoundClick(): void {
    console.log('sound on');
    console.log(this.word);
  }

  onItemChecked(itemSelected: boolean): void {
    this.itemSelected = itemSelected;

    if (this.itemSelected) {
      this.store$.dispatch(selectUserWord({ words: [this.word] }));
    } else {
      const removedDuplicateWords = this.wordsInSelected.filter(
        (word) => word.id !== this.word.id,
      );
      this.store$.dispatch(
        updateSelectedWords({ words: removedDuplicateWords }),
      );
    }
  }

  isAllChecked(): boolean {
    return this.wordsInSelected.length === 20;
  }
}
