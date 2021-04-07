import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { WORDS_LIST_LENGTH } from '../../../../constants/global.constants';
import {
  selectWord,
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
import { VoiceService } from '../../../shared/services/voice.service';
import { WordsServiceService } from '../../../shared/services/words-service.service';
// import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list-item',
  templateUrl: './words-list-item.component.html',
  styleUrls: ['./words-list-item.component.scss'],
})
export class WordsListItemComponent implements OnInit {
  @Input()
  word: IWord;

  @Output()
  markedAsDifficult = new EventEmitter<IWord>();

  @Output()
  markedAsDeleted = new EventEmitter<IWord>();

  itemSelected = false;

  wordsInSelected: IWord[];

  selectedItems$: Subscription;

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
    private wordsServiceService: WordsServiceService,
  ) {}

  ngOnInit(): void {
    this.selectedItems$ = this.store$
      .select(selectSelectedWords)
      .subscribe((selectedWords: IWord[]) => {
        this.wordsInSelected = selectedWords;
      });
  }

  onDiffucultButtonClick(): void {
    console.log('click mark as difficult', this.word);
    this.markedAsDifficult.emit(this.word);
  }

  onDeleteButtonClick(): void {
    // console.log(this.word);
    // this.markedAsDeleted.emit(this.word);
  }

  onIconSoundClick(): void {
    const text = `
      ${this.word.word}.
      ${this.word.textMeaning.replace('<i>', ' ').replace('</i>', ' ')}.
      ${this.word.textExample.replace('<b>', ' ').replace('</b>', ' ')}`;

    this.voiceService.synthesizeSpeechFromText(text);
  }

  onItemChecked(itemSelected: boolean): void {
    this.itemSelected = itemSelected;

    if (this.itemSelected) {
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

  isAllChecked(): boolean {
    return this.wordsInSelected.length === WORDS_LIST_LENGTH;
  }
}
