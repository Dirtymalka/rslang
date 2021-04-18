import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WordsServiceService } from '../shared/services/words-service.service';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { LearnedWordsComponent } from './components/learned-words/learned-words.component';
import { DifficultWordsComponent } from './components/difficult-words/difficult-words.component';
import { DeletedWordsComponent } from './components/deleted-words/deleted-words.component';
import { DictionaryComponent } from './dictionary.component';
import { DicSpinnerComponent } from './components/dictionary-spinner/dic-spinner/dic-spinner.component';

@NgModule({
  declarations: [
    LearnedWordsComponent,
    DifficultWordsComponent,
    DeletedWordsComponent,
    DictionaryComponent,
    DicSpinnerComponent,
  ],
  imports: [
    DictionaryRoutingModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  providers: [WordsServiceService],
  exports: [],
})
export class DictionaryModule {}
