import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { WordsListComponent } from './components/word-list/words-list.component';
import { WordsListItemComponent } from './components/words-list-item/words-list-item.component';

@NgModule({
  declarations: [WordsListComponent, WordsListItemComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatCheckboxModule],
  exports: [
    WordsListComponent,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class WordsListModule {}
