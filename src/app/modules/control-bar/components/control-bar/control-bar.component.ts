import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  selectSelectedWords,
  selectAllWords,
  selectUserWords,
} from '../../../../redux/selectors/words.selectors';
import {
  fetchAllWordsSuccess,
  selectWord,
  updateSelectedWords,
} from '../../../../redux/actions/words.actions';

import { IAppState } from '../../../../redux/state/app.state';
import { IUserWord, IWord } from '../../../shared/models/word.models';
import { SettingsComponent } from '../settings/components/settings.component';
import { WordsServiceService } from '../../../shared/services/words-service.service';

interface ISelectParam {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
})
export class ControlBarComponent implements OnInit {
  wordParams: ISelectParam[] = [
    { value: 'param-0', viewValue: 'Слова' },
    { value: 'param-1', viewValue: 'Предложения' },
  ];

  selectedAll = false;

  wordsInSelectedState: IWord[];

  userWords: IUserWord[];

  allWords: IWord[];

  constructor(
    private store$: Store<IAppState>,
    public dialog: MatDialog,
    private wordsService: WordsServiceService,
  ) {}

  ngOnInit(): void {
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

  onChangeWordsView(value: string): void {
    const wordsViewMode = this.wordParams.find((param) => param.value === value)
      .viewValue;
    console.log(wordsViewMode);
  }

  onCheckboxChange(selectedAll: boolean): void {
    this.selectedAll = selectedAll;

    if (this.selectedAll && this.wordsInSelectedState.length === 0) {
      this.store$.dispatch(selectWord({ words: this.allWords }));
    } else if (this.selectedAll) {
      this.store$.dispatch(updateSelectedWords({ words: this.allWords }));
    } else {
      this.store$.dispatch(updateSelectedWords({ words: [] }));
    }
  }

  markAsDifficultHandler(): void {
    console.log('mark as difficult all');
    console.log(this.allWords);
    this.allWords.forEach((word) => this.markAsDifficult(word));
  }

  deleteAllSelectedHandler(): void {
    console.log('delete all');
  }

  isInUserWords(word: IWord): IUserWord {
    return this.userWords.find((userWord) => userWord.wordId === word.id);
  }

  markAsDifficult(word: IWord): void {
    if (!this.userWords.length || !this.isInUserWords(word)) {
      const optional = {
        isDifficult: true,
        isDeleted: false,
        isStudy: true,
      };
      console.log(word.id);
      this.wordsService.postWord(word.id, { optional });
      // .subscribe(() => this.getWordsList());
    }

    if (this.isInUserWords(word)) {
      const { wordId } = this.isInUserWords(word);
      console.log(wordId);
      this.wordsService.getUserWord(wordId).subscribe((data) =>
        this.wordsService
          .putWord(data.wordId, {
            difficulty: data.difficulty,
            optional: { ...data.optional, isDifficult: true, isStudy: true },
          })
          .subscribe(() => this.updateAllWords()),
      );
    }
  }

  updateAllWords(): void {
    this.store$.dispatch(fetchAllWordsSuccess({ words: this.allWords }));
  }
}
