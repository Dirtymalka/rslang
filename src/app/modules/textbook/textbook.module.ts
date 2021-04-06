import { NgModule } from '@angular/core';

import { TextbookComponent } from './components/textbook/textbook.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { ChaptersItemComponent } from './components/chapters-item/chapters-item.component';
import { WordsListModule } from '../words-list/words-list.module';
import { ControlBarModule } from '../control-bar/components/control-bar.module';
import { SharedModule } from '../shared/shared.module';
import { TextbookRoutingModule } from './textbook-routing.module';

@NgModule({
  declarations: [TextbookComponent, ChaptersComponent, ChaptersItemComponent],
  imports: [
    SharedModule,
    WordsListModule,
    ControlBarModule,
    TextbookRoutingModule,
  ],
  exports: [TextbookComponent],
})
export class TextbookModule {}
