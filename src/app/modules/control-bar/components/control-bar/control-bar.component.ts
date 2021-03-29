import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  changeShowWordTranslation,
  changeCompactView,
  changeDifficultWordButtonMode,
  changeDeleteWordButtonMode,
} from '../../../../redux/actions/settings.actions';
import {
  selectIsShowWordTranslation,
  selectIsWordsView,
  selectIsCompactView,
  selectIsShowDifficultWordButton,
  selectIsShowDeleteWordButton,
} from '../../../../redux/selectors/selectors';
import { IAppState } from '../../../../redux/state/app.state';

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

  isShowWordTranslation$: Observable<boolean> = this.store$.pipe(
    select(selectIsShowWordTranslation),
  );

  isWordsView$: Observable<string> = this.store$.pipe(
    select(selectIsWordsView),
  );

  isCompactView$: Observable<boolean> = this.store$.pipe(
    select(selectIsCompactView),
  );

  isShowDifficultWordButton$: Observable<boolean> = this.store$.pipe(
    select(selectIsShowDifficultWordButton),
  );

  isShowDeleteWordButton$: Observable<boolean> = this.store$.pipe(
    select(selectIsShowDeleteWordButton),
  );

  constructor(private store$: Store<IAppState>) {}

  switchTranslateMode(): void {
    this.store$.dispatch(changeShowWordTranslation());
  }

  switchCompactMode(): void {
    this.store$.dispatch(changeCompactView());
  }

  switchShowDifficultWordButton(): void {
    console.log('dif');
    this.store$.dispatch(changeDifficultWordButtonMode());
  }

  switchShowDeleteWordButton(): void {
    console.log('delete');
    this.store$.dispatch(changeDeleteWordButtonMode());
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

  onChangeWordsView(value: string): void {
    const wordsViewMode = this.wordParams.find((param) => param.value === value)
      .viewValue;
    console.log(wordsViewMode);
  }
}
