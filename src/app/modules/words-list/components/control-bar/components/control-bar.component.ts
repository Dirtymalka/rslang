import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
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
export class ControlBarComponent implements OnInit {
  isCheckedAll = false;

  wordsInSelectedState: IWord[];

  userWords: IUserWord[];

  allWords: IWord[];

  paginationOptions;

  @Output()
  markedAllAsDifficult = new EventEmitter<IWord[]>();

  constructor(
    private store$: Store<IAppState>,
    public dialog: MatDialog,
    private wordsService: WordsServiceService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
      });

    this.store$.select(selectAllWords).subscribe((words: IWord[]) => {
      this.allWords = words;
    });

    this.store$
      .select(selectSelectedWords)
      .subscribe((selectedWords: IWord[]) => {
        this.wordsInSelectedState = selectedWords;
      });

    this.store$.select(selectUserWords).subscribe((userWords: IUserWord[]) => {
      this.userWords = userWords;
    });
  }

  getUserWords(): void {
    this.wordsService.getUserWords().subscribe(
      (data) => {
        this.userWords = data;
        console.log('user words!', data);
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
    // console.log(this.paginationOptions.group, this.paginationOptions.page);
    // this.router.navigate(['games/hangman/game'],
    // {queryParams: {level: this.level, group: this.group}})
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

  onCheckboxChange(isCheckedAll: boolean): void {
    this.isCheckedAll = isCheckedAll;

    if (this.isCheckedAll && this.wordsInSelectedState.length === 0) {
      this.store$.dispatch(selectWord({ words: this.allWords }));
    } else if (this.isCheckedAll) {
      this.store$.dispatch(updateSelectedWords({ words: this.allWords }));
    } else {
      this.store$.dispatch(updateSelectedWords({ words: [] }));
    }
  }

  markAsDifficultHandler(): void {
    console.log('bar click', this.allWords);
    this.markedAllAsDifficult.emit(this.allWords);
    this.isCheckedAll = false;
    this.store$.dispatch(updateSelectedWords({ words: [] }));
    // this.allWords.forEach((word) => this.markAsDifficult(word));
  }

  deleteAllSelectedHandler(): void {
    console.log('delete all');
  }

  isInUserWords(word: IWord): IUserWord {
    return this.userWords.find((userWord) => userWord.wordId === word.id);
  }

  updateAllWords(): void {
    this.store$.dispatch(fetchAllWordsSuccess({ words: this.allWords }));
  }
}
