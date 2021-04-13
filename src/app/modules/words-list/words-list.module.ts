import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordsListComponent } from './components/words-list/words-list.component';
import { WordsListItemComponent } from './components/words-list-item/words-list-item.component';
import { IconSoundComponent } from './components/sound-icon/icon-sound.component';
import { SharedModule } from '../shared/shared.module';
import { ControlBarModule } from './components/control-bar/control-bar.module';

@NgModule({
  declarations: [
    WordsListComponent,
    WordsListItemComponent,
    IconSoundComponent,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, ControlBarModule],
  exports: [WordsListComponent],
})
export class WordsListModule {}
