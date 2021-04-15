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
import { selectGroup0 } from '../../../../redux/selectors/bookWords.selectors';
import {
  fetchGroup0,
  fetchGroup1,
  fetchGroup2,
  fetchGroup3,
  fetchGroup4,
  fetchGroup5,
} from '../../../../redux/actions/bookWords.actions';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit {
  group0: IWord[];

  group1: IWord[];

  group2: IWord[];

  group3: IWord[];

  group4: IWord[];

  group5: IWord[];

  listWords: IWord[];

  userWords: IUserWord[];

  currentPageWords: IWord[];

  currentGroupWords: IWord[];

  wordsNotStudy: IWord[];

  paginationOptions;

  pageSize = WORDS_LIST_LENGTH;

  pageIndex = 0;

  previousPageIndex = 0;

  scrollForward = true;

  indexFrom = 0;

  indexTo = WORDS_LIST_LENGTH;

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
        console.log(paginationOptions);
        this.listWords = [];
        // this.getFilteredWords();
        this.getUserWords();
        this.getUnitWords();
      });

    this.store$.select(selectGroup0).subscribe((group0) => {
      this.group0 = group0;
    });

    this.store$.select(selectGroup0).subscribe((group1) => {
      this.group1 = group1;
    });

    this.store$.select(selectGroup0).subscribe((group2) => {
      this.group2 = group2;
    });

    this.store$.select(selectGroup0).subscribe((group3) => {
      this.group3 = group3;
    });

    this.store$.select(selectGroup0).subscribe((group4) => {
      this.group4 = group4;
    });

    this.store$.select(selectGroup0).subscribe((group5) => {
      this.group5 = group5;
    });
  }

  getUserWords() {
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

  isInDeleted(word): boolean {
    const isInDeleted = this.userWords.find(
      (userWord) => userWord.wordId === word.id && userWord.optional.isDeleted,
    );

    if (isInDeleted) {
      return true;
    }
    return false;
  }

  getUnitWords(): void {
    const { group, page } = this.paginationOptions;
    console.log(group);
    this.wordsService.getUserWords().subscribe((data) => {
      this.userWords = data;
      this.store$.dispatch(
        fetchAllUserWordsSuccess({ userWords: this.userWords }),
      );
      console.log(group);
      this.wordsService
        .getWordsExt(group, page, 600, 0)
        .subscribe((wordsPerGroup) => {
          console.log(wordsPerGroup);
          console.log(this.userWords);

          this.currentGroupWords = wordsPerGroup;
          this.getWordsList();

          this.switchStoreGroup(group);
        });
    });
  }

  switchStoreGroup(group: number): void {
    console.log(group, 'switch');
    switch (group) {
      case 0:
        if (!this.group0.length) {
          this.store$.dispatch(fetchGroup0({ words: this.currentGroupWords }));
        }
        break;
      case 1:
        if (!this.group1.length) {
          this.store$.dispatch(fetchGroup1({ words: this.currentGroupWords }));
        }
        break;
      case 2:
        if (!this.group2.length) {
          this.store$.dispatch(fetchGroup2({ words: this.currentGroupWords }));
        }
        break;
      case 3:
        if (!this.group3.length) {
          this.store$.dispatch(fetchGroup3({ words: this.currentGroupWords }));
        }
        break;
      case 4:
        if (!this.group4.length) {
          this.store$.dispatch(fetchGroup4({ words: this.currentGroupWords }));
        }
        break;
      case 5:
        if (!this.group5.length) {
          this.store$.dispatch(fetchGroup5({ words: this.currentGroupWords }));
        }
        break;
      default:
        this.store$.dispatch(fetchGroup0({ words: this.currentGroupWords }));
    }
  }

  getWordsList(): void {
    const wordsPerPage = this.currentGroupWords.slice(
      this.indexFrom,
      this.indexTo,
    );
    console.log(wordsPerPage);

    const withoutDeletedWords = this.getFilteredWords(wordsPerPage);
    console.log(withoutDeletedWords);

    if (withoutDeletedWords.length === WORDS_LIST_LENGTH) {
      console.log(true);
      this.listWords = withoutDeletedWords;
      this.store$.dispatch(fetchWordsForGame({ words: this.listWords }));
      return;
    }

    if (!withoutDeletedWords.length) {
      this.listWords = wordsPerPage;
      this.store$.dispatch(fetchWordsForGame({ words: this.listWords }));
    } else {
      console.log(false);
    }
  }

  getFilteredWords(wordsPerPage: IWord[]): IWord[] {
    const withoutDeletedWords = wordsPerPage.filter((word) =>
      this.userWords.find(
        (userWord) =>
          userWord.wordId === word.id && !userWord.optional.isDeleted,
      ),
    );
    return withoutDeletedWords;
  }

  increaseIndexes(): void {
    this.indexFrom += WORDS_LIST_LENGTH;
    this.indexTo += WORDS_LIST_LENGTH;
  }

  decreaseIndexes(): void {
    this.indexFrom -= WORDS_LIST_LENGTH;
    this.indexTo -= WORDS_LIST_LENGTH;
  }

  listIsNotEmpty(): boolean {
    if (this.listWords && this.listWords.length) {
      return true;
    }
    return false;
  }

  getGroupClassName(): string {
    return `group-${this.paginationOptions.group}`;
  }

  getFilteredWordss(): void {
    this.listWords = [];

    this.wordsService.getUserWords().subscribe((userWords) => {
      this.userWords = userWords;
      this.store$.dispatch(
        fetchAllUserWordsSuccess({ userWords: this.userWords }),
      );

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
          this.switchPagination();
          this.listWords = wordsList;
          this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
          return;
        }
        if (
          this.currentPageWords.length === WORDS_LIST_LENGTH &&
          !this.wordsNotStudy.length
        ) {
          this.listWords = wordsList;
          this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
          return;
        }
        if (!this.currentPageWords.length && !this.wordsNotStudy.length) {
          this.listWords = wordsList;
          this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
          return;
        }

        this.listWords = this.currentPageWords;
        this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
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

    if (!currentPageWords.length) {
      allWords.forEach((word) => this.markAsDifficult(word));
    }

    currentPageWords.forEach((word) => this.markAsDifficult(word));
  }

  markAsDifficult(word: IWord): void {
    if (!this.userWords.length || !this.isInUserWords(word)) {
      const optional = {
        isDifficult: true,
        isDeleted: false,
        isStudy: true,
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
            optional: { ...data.optional, isDifficult: true, isStudy: true },
          })
          .subscribe(() => this.getUserWords()),
      );
    }
  }

  markAllAsDeleted(allWords: IWord[]): void {
    this.listWords = [];

    const currentPageWords = allWords.filter((word) =>
      this.userWords.find(
        (userWord) =>
          userWord.wordId === word.id && !userWord.optional.isDeleted,
      ),
    );

    if (!currentPageWords.length) {
      allWords.forEach((word) => this.markAsDeleted(word));
    }

    currentPageWords.forEach((word) => this.markAsDeleted(word));

    this.switchPagination();
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

  switchPagination(): void {
    const { group, page } = this.paginationOptions;
    let options;

    if (this.scrollForward) {
      options = { group, page: page + 1 };
    } else {
      options = { group, page: page - 1 };
    }

    this.store$.dispatch(changePaginationOptions(options));
  }

  pageChangeEvent(event: PageEvent): void {
    console.log(event);
    this.pageIndex = event.pageIndex;
    const { previousPageIndex } = event;
    // const options = { ...this.paginationOptions, page: this.pageIndex };
    // this.store$.dispatch(changePaginationOptions(options));
    if (this.pageIndex - previousPageIndex < 0) {
      console.log('назад');
      this.scrollForward = false;
      console.log(this.indexFrom, this.indexTo);
      this.decreaseIndexes();
      console.log(this.indexFrom, this.indexTo);

      this.getWordsList();
    } else {
      console.log('вперед');
      this.scrollForward = true;
      console.log('previousPageIndex', previousPageIndex);
      console.log('this.pageIndex', this.pageIndex);
      console.log(this.indexFrom, this.indexTo);
      this.increaseIndexes();
      console.log(this.indexFrom, this.indexTo);

      this.getWordsList();
    }
  }
}
