import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterContentChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import {
  selectWord,
  updateSelectedWords,
} from '../../../../redux/actions/words.actions';
import {
  selectIsShowWordTranslation,
  selectIsShowDifficultWordButton,
  selectIsShowDeleteWordButton,
} from '../../../../redux/selectors/settings.selectors';
import {
  selectUserWords,
  selectSelectedWords,
} from '../../../../redux/selectors/words.selectors';
import { IAppState } from '../../../../redux/state/app.state';

import { IWord, IUserWord } from '../../../shared/models/word.models';
import { VoiceService } from '../../../shared/services/voice.service';

@Component({
  selector: 'app-words-list-item',
  templateUrl: './words-list-item.component.html',
  styleUrls: ['./words-list-item.component.scss'],
})
export class WordsListItemComponent implements OnInit, AfterContentChecked {
  @Input()
  word: IWord;

  @Output()
  markedAsDifficult = new EventEmitter<IWord>();

  @Output()
  markedAsDeleted = new EventEmitter<IWord>();

  @ViewChild('itemIconRef') itemIcon: ElementRef;

  wordsInSelected: IWord[];

  userWords: IUserWord[];

  isDifficult: boolean | IUserWord;

  correctCount: number | IUserWord;

  incorrectCount: number | IUserWord;

  isSelected;

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
    private voiceService: VoiceService,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectSelectedWords)
      .subscribe((selectedWords: IWord[]) => {
        this.wordsInSelected = selectedWords;
      });

    this.store$.select(selectUserWords).subscribe((userWords: IUserWord[]) => {
      this.userWords = userWords;

      this.isDifficult = userWords.find(
        (userWord) =>
          userWord.wordId === this.word.id && userWord.optional.isDifficult,
      );

      this.correctCount =
        userWords.find(
          (userWord) =>
            userWord.wordId === this.word.id && userWord.optional.correctCount,
        ) || 0;

      this.incorrectCount =
        userWords.find(
          (userWord) =>
            userWord.wordId === this.word.id && userWord.optional.correctCount,
        ) || 0;
    });
  }

  ngAfterContentChecked(): void {
    this.isSelected = !!this.wordsInSelected.find(
      (word) => word.id === this.word.id,
    );
  }

  removeTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onDifficultButtonClick(): void {
    this.isDifficult = true;
    this.markedAsDifficult.emit(this.word);
  }

  onDeleteButtonClick(): void {
    console.log(this.word);
    this.markedAsDeleted.emit(this.word);
  }

  onIconSoundClick(): void {
    const text = `
      ${this.word.word}.
      ${this.word.textMeaning.replace('<i>', ' ').replace('</i>', ' ')}.
      ${this.word.textExample.replace('<b>', ' ').replace('</b>', ' ')}`;

    this.voiceService.synthesizeSpeechFromText(text);
  }

  onItemChecked(itemSelected: boolean): void {
    this.isSelected = itemSelected;

    if (this.isSelected) {
      this.store$.dispatch(selectWord({ words: [this.word] }));
    } else {
      const removedDuplicateWords = this.wordsInSelected.filter(
        (word) => word.id !== this.word.id,
      );
      this.store$.dispatch(
        updateSelectedWords({ words: removedDuplicateWords }),
      );
    }
  }
}
