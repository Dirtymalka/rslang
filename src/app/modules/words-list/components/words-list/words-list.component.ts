import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';
import {
  fetchAllWordsSuccess,
  fetchAllUserWordsSuccess,
} from '../../../../redux/actions/words.actions';

import { IUserWord, IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit {
  listWords: IWord[];

  userWords: IUserWord[];

  paginationOptions;

  pageIndex = 0;

  previousPageIndex = 0;

  @ViewChild('paginatorRef') paginatorRef: ElementRef;

  constructor(
    private wordsService: WordsServiceService,
    private store$: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
        this.pageIndex = paginationOptions.page;

        this.getWordsList();
      });

    this.getUserWords();
    this.getFilteredWords();
  }

  getFilteredWords(): void {
    this.wordsService.getUserWords().subscribe((userWords) => {
      console.log(userWords);
      const { group, page } = this.paginationOptions;
      this.wordsService
        .getWords(group, page)
        .subscribe((wordsList) => console.log(wordsList));
    });
  }

  getUserWords(): void {
    this.wordsService.getUserWords().subscribe(
      (data) => {
        this.userWords = data;
        console.log('user words!', data);
        this.store$.dispatch(
          fetchAllUserWordsSuccess({ userWords: this.userWords }),
        );
      },
      (error) => {
        console.log(error.message, 'user words not found');
      },
    );
  }

  swicthPaginationIndex(): void {
    this.paginatorRef.nativeElement.pageIndex = this.paginationOptions.page;
    this.paginatorRef.nativeElement.previousPageIndex =
      this.paginationOptions.page - 1;
  }

  getWordsList(): void {
    const { group, page } = this.paginationOptions;
    this.wordsService.getWords(group, page).subscribe(
      (listWords: IWord[]) => {
        this.listWords = listWords;

        this.store$.dispatch(fetchAllWordsSuccess({ words: listWords }));
      },
      (error) => {
        console.log(error.message, 'user words not found');
      },
    );
  }

  filterByDeleted(): void {
    console.log('filter magic');
  }

  isInUserWords(word: IWord): IUserWord {
    return this.userWords.find((userWord) => userWord.wordId === word.id);
  }

  markAllAsDifficult(allWords: IWord[]): void {
    console.log('list emit', allWords);
    allWords.forEach((word) => this.markAsDifficult(word));
  }

  markAsDifficult(word: IWord): void {
    if (!this.userWords.length || !this.isInUserWords(word)) {
      const optional = {
        isDifficult: true,
        isDeleted: false,
        isStudy: true,
      };

      this.wordsService
        .postWord(word.id, { optional })
        .subscribe(() => this.getWordsList());
    }

    if (this.isInUserWords(word)) {
      const { wordId } = this.isInUserWords(word);

      this.wordsService.getUserWord(wordId).subscribe((data) =>
        this.wordsService
          .putWord(data.wordId, {
            difficulty: data.difficulty,
            optional: { ...data.optional, isDifficult: true, isStudy: true },
          })
          .subscribe(() => this.getUserWords()),
      );
    }
  }

  markAsDeleted(word: IWord): void {
    if (!this.userWords.length || !this.isInUserWords(word)) {
      const optional = {
        isDifficult: false,
        isDeleted: true,
        isStudy: false,
      };

      this.wordsService.postWord(word.id, { optional }).subscribe(() => {
        this.getUserWords();
      });
    }

    if (this.isInUserWords(word)) {
      const { wordId } = this.isInUserWords(word);

      this.wordsService.getUserWord(wordId).subscribe((data) =>
        this.wordsService
          .putWord(data.wordId, {
            difficulty: data.difficulty,
            optional: { ...data.optional, isDeleted: true, isStudy: false },
          })
          .subscribe(() => {
            this.getUserWords();
          }),
      );
    }
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    const options = { ...this.paginationOptions, page: this.pageIndex };

    this.store$.dispatch(changePaginationOptions(options));
    this.getWordsList();
  }
}
