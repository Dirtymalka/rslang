import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
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
import {
  selectUserWords,
  selectSelectedWords,
} from '../../../../redux/selectors/words.selectors';
import { IAppState } from '../../../../redux/state/app.state';

import { IWord, IUserWord } from '../../../shared/models/word.models';
import { VoiceService } from '../../../shared/services/voice.service';
import { WordsServiceService } from '../../../shared/services/words-service.service';
// import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list-item',
  templateUrl: './words-list-item.component.html',
  styleUrls: ['./words-list-item.component.scss'],
})
export class WordsListItemComponent implements OnInit, AfterViewInit {
  @Input()
  word: IWord;

  @Output()
  markedAsDifficult = new EventEmitter<IWord>();

  @Output()
  markedAsDeleted = new EventEmitter<IWord>();

  itemSelected = false;

  wordsInSelected: IWord[];

  userWords: IUserWord[];

  isDifficult;

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
    private wordsService: WordsServiceService,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectSelectedWords)
      .subscribe((selectedWords: IWord[]) => {
        this.wordsInSelected = selectedWords;
      });

    this.store$.select(selectUserWords).subscribe((userWords: IUserWord[]) => {
      this.userWords = userWords;
    });
  }

  ngAfterViewInit(): void {
    this.isWordDifficult();
  }

  isWordDifficult(): void {
    console.log(this.word.id);
    console.log(this.userWords[0].wordId);
    const isDifficult = this.userWords.find(
      (userWord) => userWord.wordId === this.word.id,
    );

    console.log(isDifficult);
  }

  removeTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
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
