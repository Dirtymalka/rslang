import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  showTranslateChecked = true;

  difficultWordsButtonChecked = true;

  deleteWordsButtonChecked = true;

  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      isShowWordTranslation: '',
      isShowDifficultWordButton: '',
      isShowDeleteWordButton: '',
    });
  }

  save() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));

    // TODO: change store
  }
}
