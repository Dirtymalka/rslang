import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';
import {
  fetchAllWordsSuccess,
  // fetchAllUserWords,
} from '../../../../redux/actions/words.actions';

import { IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit {
  listWords: IWord[];

  paginationOptions;

  paginationOptions$: Subscription;

  pageIndex = 0;

  previousPageIndex = 0;

  @ViewChild('paginatorRef') paginatorRef: ElementRef;

  constructor(
    private wordsService: WordsServiceService,
    private store$: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.paginationOptions$ = this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
        this.pageIndex = paginationOptions.page;
        this.getWordsList();
      });
  }

  swicthPaginationIndex() {
    this.paginatorRef.nativeElement.pageIndex = this.paginationOptions.page;
    this.paginatorRef.nativeElement.previousPageIndex =
      this.paginationOptions.page - 1;
  }

  getWordsList(): void {
    const { group, page } = this.paginationOptions;
    this.wordsService.getWords(group, page).subscribe(
      (listWords: IWord[]) => {
        this.listWords = listWords;
        console.log('list', this.listWords);

        this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
      },
      (error) => {
        console.log(error.message);
      },
    );
  }

  markAsDifficult(word: IWord): void {
    console.log(word);
  }

  markAsDeleted(word: IWord): void {
    console.log(word);
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    const options = { ...this.paginationOptions, page: this.pageIndex };

    this.store$.dispatch(changePaginationOptions(options));
    this.getWordsList();
  }
}
