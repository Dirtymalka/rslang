import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';
import {
  fetchAllWordsSuccess,
  fetchAllUserWordsSuccess,
  fetchWordsForGame,
} from '../../../../redux/actions/words.actions';

import { IUserWord, IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import { WORDS_LIST_LENGTH } from '../../../../constants/global.constants';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit {
  listWords: IWord[];

  userWords: IUserWord[];

  currentPageWords: IWord[];

  wordsNotStudy: IWord[];

  paginationOptions;

  pageIndex = 0;

  previousPageIndex = 0;

  scrollForward = true;

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

        this.getFilteredWords();
      });

    this.getUserWords();
  }

  getFilteredWords(): void {
    this.wordsService.getUserWords().subscribe((userWords) => {
      const { group, page } = this.paginationOptions;

      this.wordsService.getWords(group, page).subscribe((wordsList) => {
        this.store$.dispatch(fetchWordsForGame({ words: wordsList }));

        this.currentPageWords = wordsList.filter((word) =>
          userWords.find(
            (userWord) =>
              userWord.wordId === word.id && !userWord.optional.isDeleted,
          ),
        );

        this.wordsNotStudy = wordsList.filter((word) =>
          userWords.find(
            (userWord) =>
              userWord.wordId === word.id && userWord.optional.isDeleted,
          ),
        );

        if (
          !this.currentPageWords.length &&
          this.wordsNotStudy.length === WORDS_LIST_LENGTH
        ) {
          let options;

          if (this.scrollForward) {
            options = { group, page: page + 1 };
          } else {
            options = { group, page: page - 1 };
          }

          this.store$.dispatch(changePaginationOptions(options));
          this.getAllWords();
        }
        if (
          this.currentPageWords.length === WORDS_LIST_LENGTH &&
          !this.wordsNotStudy.length
        ) {
          this.getAllWords();
        }
        if (!this.currentPageWords.length && !this.wordsNotStudy.length) {
          this.getAllWords();
        }
      });
    });
  }

  getAllWords(): void {
    const { group, page } = this.paginationOptions;

    this.wordsService.getWords(group, page).subscribe((wordsList) => {
      this.store$.dispatch(fetchWordsForGame({ words: wordsList }));
      this.listWords = wordsList;
      this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
    });
  }

  getUserWords(): void {
    this.wordsService.getUserWords().subscribe(
      (data) => {
        this.userWords = data;
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

  isInUserWords(word: IWord): IUserWord {
    return this.userWords.find((userWord) => userWord.wordId === word.id);
  }

  markAllAsDifficult(allWords: IWord[]): void {
    const currentPageWords = allWords.filter((word) =>
      this.userWords.find(
        (userWord) =>
          userWord.wordId === word.id && !userWord.optional.isDifficult,
      ),
    );

    currentPageWords.forEach((word) => this.markAsDifficult(word));
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
        .subscribe(() => this.getFilteredWords());
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

  markAllAsDeleted(allWords: IWord[]): void {
    const currentPageWords = allWords.filter((word) =>
      this.userWords.find(
        (userWord) =>
          userWord.wordId === word.id && !userWord.optional.isDeleted,
      ),
    );
    currentPageWords.forEach((word) => this.markAsDeleted(word));
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
            this.getFilteredWords();
          }),
      );
    }
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    const { previousPageIndex } = event;
    const options = { ...this.paginationOptions, page: this.pageIndex };

    this.store$.dispatch(changePaginationOptions(options));

    if (this.pageIndex - previousPageIndex < 0) {
      this.scrollForward = false;
    } else {
      this.scrollForward = true;
    }
  }
}
