import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectSelectedWords,
  selectAllWords,
} from '../../../../redux/selectors/words.selectors';
import {
  selectUserWord,
  updateSelectedWords,
} from '../../../../redux/actions/words.actions';
import { IAppState } from '../../../../redux/state/app.state';
import { IWord } from '../../../shared/models/word.models';
import { SettingsComponent } from '../settings/components/settings.component';

interface ISelectParam {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
})
export class ControlBarComponent {
  wordParams: ISelectParam[] = [
    { value: 'param-0', viewValue: 'Слова' },
    { value: 'param-1', viewValue: 'Предложения' },
  ];

  selectedAll = false;

  selectAllWords: IWord[];

  wordsInSelectedState: IWord[];

  allWords: IWord[];

  allWords$: Subscription = this.store$
    .select(selectAllWords)
    .subscribe((words: IWord[]) => {
      this.allWords = words;
    });

  selectedItems$: Subscription = this.store$
    .select(selectSelectedWords)
    .subscribe((selectedWords: IWord[]) => {
      this.wordsInSelectedState = selectedWords;
    });

  constructor(private store$: Store<IAppState>, public dialog: MatDialog) {}

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
      this.store$.dispatch(selectUserWord({ words: this.allWords }));
    } else if (this.selectedAll) {
      // TODO removedDuplicateWords
      this.store$.dispatch(updateSelectedWords({ words: this.allWords }));
    } else {
      this.store$.dispatch(updateSelectedWords({ words: [] }));
    }
  }

  deleteAllSelected(): void {
    // TODO
    console.log('delete all');
  }

  markAsDifficult(): void {
    // TODO
    console.log('mark as difficult all');
  }
}
