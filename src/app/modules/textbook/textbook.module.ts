import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextbookComponent } from './components/textbook/textbook.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { ChaptersItemComponent } from './components/chapters-item/chapters-item.component';
import { WordsListModule } from '../words-list/words-list.module';

@NgModule({
  declarations: [TextbookComponent, ChaptersComponent, ChaptersItemComponent],
  imports: [CommonModule, WordsListModule],
  exports: [TextbookComponent, ChaptersComponent],
})
export class TextbookModule {}