import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryComponent } from './dictionary.component';
import { DeletedWordsComponent } from './components/deleted-words/deleted-words.component';
import { DifficultWordsComponent } from './components/difficult-words/difficult-words.component';
import { LearnedWordsComponent } from './components/learned-words/learned-words.component';

const routes: Routes = [
  { path: '', redirectTo: 'learned-words', pathMatch: 'full' },
  {
    path: '',
    component: DictionaryComponent,
    children: [
      { path: 'learned-words', component: LearnedWordsComponent },
      { path: 'difficult-words', component: DifficultWordsComponent },
      { path: 'deleted-words', component: DeletedWordsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryRoutingModule {}
