import { NgModule } from '@angular/core';

import { WordsListComponent } from './components/words-list/words-list.component';
import { WordsListItemComponent } from './components/words-list-item/words-list-item.component';
import { IconSoundComponent } from './components/sound-icon/icon-sound.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WordsListComponent,
    WordsListItemComponent,
    IconSoundComponent,
  ],
  imports: [SharedModule],
  exports: [WordsListComponent],
})
export class WordsListModule {}
