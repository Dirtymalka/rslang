import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WordsListComponent],
})
export class WordsListModule {}
