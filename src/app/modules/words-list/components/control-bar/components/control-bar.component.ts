import {
  Component,
  EventEmitter,
  OnInit,
  AfterContentChecked,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { selectPaginationOptions } from '../../../../../redux/selectors/settings.selectors';
import {
  selectSelectedWords,
  selectAllWords,
  selectUserWords,
} from '../../../../../redux/selectors/words.selectors';
import {
  fetchAllWordsSuccess,
  fetchAllUserWordsSuccess,
  selectWord,
  updateSelectedWords,
} from '../../../../../redux/actions/words.actions';

import { IAppState } from '../../../../../redux/state/app.state';
import { IUserWord, IWord } from '../../../../shared/models/word.models';
import { SettingsComponent } from '../../settings/components/settings.component';
import { WordsServiceService } from '../../../../shared/services/words-service.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
})
export class ControlBarComponent implements OnInit, AfterContentChecked {
  isAllChecked = false;

  wordsInSelectedState: IWord[];

  userWords: IUserWord[];

  allWords: IWord[];

  paginationOptions;

  @Output()
  markedAllAsDifficult = new EventEmitter<IWord[]>();

  @Output()
  markedAllAsDeleted = new EventEmitter<IWord[]>();

  constructor(
    private store$: Store<IAppState>,
    public dialog: MatDialog,
    private wordsService: WordsServiceService,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
      });

    this.store$
      .select(selectSelectedWords)
      .subscribe((selectedWords: IWord[]) => {
        this.wordsInSelectedState = selectedWords;
      });

    this.store$.select(selectUserWords).subscribe((userWords: IUserWord[]) => {
      this.userWords = userWords;
    });

    this.store$.select(selectAllWords).subscribe((words: IWord[]) => {
      this.allWords = words;
    });
  }

  ngAfterContentChecked(): void {
    if (
      this.allWords.length &&
      this.wordsInSelectedState.length === this.allWords.length
    ) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
  }

  getUserWords(): void {
    this.wordsService.getUserWords().subscribe(
      (data) => {
        this.userWords = data;
        this.store$.dispatch(
          fetchAllUserWordsSuccess({ userWords: this.userWords }),
        );
      },
      (error) => {
        console.log(error.message, 'user words not found');
      },
    );
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent);
    dialogRef.afterClosed();
  }

  openSprintGame(): void {
    console.log('sprint');
  }

  openSavannaGame(): void {
    console.log('savanna');
  }

  openAudioCallGame(): void {
    console.log('audiocall');
  }

  openHangmanGame(): void {
    console.log('Hangman');
  }

  onCheckboxChange(isAllChecked: boolean): void {
    this.isAllChecked = isAllChecked;

    if (this.isAllChecked && this.wordsInSelectedState.length === 0) {
      this.store$.dispatch(selectWord({ words: this.allWords }));
    } else if (this.isAllChecked) {
      this.store$.dispatch(updateSelectedWords({ words: this.allWords }));
    } else {
      this.store$.dispatch(updateSelectedWords({ words: [] }));
    }
  }

  markAsDifficultHandler(): void {
    this.markedAllAsDifficult.emit(this.wordsInSelectedState);
    this.isAllChecked = false;
    this.store$.dispatch(updateSelectedWords({ words: [] }));
  }

  markAsDeletedHandler(): void {
    this.markedAllAsDeleted.emit(this.wordsInSelectedState);
    this.isAllChecked = false;
    this.store$.dispatch(updateSelectedWords({ words: [] }));
  }

  isInUserWords(word: IWord): IUserWord {
    return this.userWords.find((userWord) => userWord.wordId === word.id);
  }

  updateAllWords(): void {
    this.store$.dispatch(fetchAllWordsSuccess({ words: this.allWords }));
  }

  isCheckedMoreThenOne(): boolean {
    return this.wordsInSelectedState.length > 1;
  }
}
