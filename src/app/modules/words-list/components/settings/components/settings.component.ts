import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectIsShowWordTranslation,
  selectIsShowDifficultWordButton,
  selectIsShowDeleteWordButton,
} from '../../../../../redux/selectors/settings.selectors';
import { changeSettingsModes } from '../../../../../redux/actions/settings.actions';
import { IAppState } from '../../../../../redux/state/app.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isShowWordTranslation;

  isShowDifficultWordButton;

  isShowDeleteWordButton;

  isShowWordTranslation$: Subscription = this.store$
    .select(selectIsShowWordTranslation)
    .subscribe((param: boolean) => {
      this.isShowWordTranslation = param;
    });

  isShowDifficultWordButton$: Subscription = this.store$
    .select(selectIsShowDifficultWordButton)
    .subscribe((param: boolean) => {
      this.isShowDifficultWordButton = param;
    });

  isShowDeleteWordButton$: Subscription = this.store$
    .select(selectIsShowDeleteWordButton)
    .subscribe((param: boolean) => {
      this.isShowDeleteWordButton = param;
    });

  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private store$: Store<IAppState>) {
    this.formGroup = formBuilder.group({
      isShowWordTranslation: '',
      isShowDifficultWordButton: '',
      isShowDeleteWordButton: '',
    });
  }

  saveSettings(): void {
    const settingsValues = this.checkSettingsValues(this.formGroup.value);
    this.store$.dispatch(changeSettingsModes(settingsValues));
  }

  checkSettingsValues(obj) {
    const result = {};
    /* eslint-disable */

    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'boolean') {
          result[key] = obj[key];
        }
      }
    }

    return result;
  }
}
