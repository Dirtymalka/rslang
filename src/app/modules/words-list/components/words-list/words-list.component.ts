import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import {
  fetchAllWordsSuccess,
  fetchAllUserWordsSuccess,
  fetchWordsForGame,
} from '../../../../redux/actions/words.actions';

import { IUserWord, IWord } from '../../../shared/models/word.models';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import {
  PAGINATION,
  WORDS_LIST_LENGTH,
} from '../../../../constants/global.constants';
import {
  selectGroup0,
  selectGroup1,
  selectGroup2,
  selectGroup3,
  selectGroup4,
  selectGroup5,
} from '../../../../redux/selectors/bookWords.selectors';
import {
  fetchGroup0,
  fetchGroup1,
  fetchGroup2,
  fetchGroup3,
  fetchGroup4,
  fetchGroup5,
} from '../../../../redux/actions/bookWords.actions';

import { IPagination } from '../../../../redux/state/settings.state';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { selectUserInfo } from '../../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsListComponent implements OnInit {
  bookWords = [[], [], [], [], [], []];

  listWords: IWord[];

  userWords: IUserWord[] = [];

  currentGroupWords: IWord[];

  wordsNotStudy: IWord[];

  withoutDeletedWords: IWord[];

  paginationOptions;

  pageSize = WORDS_LIST_LENGTH;

  pageIndex = 0;

  previousPageIndex = 0;

  scrollForward = true;

  indexFrom: number;

  indexTo: number;

  isAuthorized: boolean;

  @ViewChild('paginator') paginator: ElementRef;

  constructor(
    private wordsService: WordsServiceService,
    private store$: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
        this.pageIndex = Math.max(this.paginationOptions.page, 0);
        this.indexFrom = this.paginationOptions.indexFrom;
        this.indexTo = this.paginationOptions.indexTo;
        this.listWords = [];
        this.getUnitWords();
      });

    this.groupsSubscribes();

    this.store$.select(selectUserInfo).subscribe((info) => {
      this.isAuthorized = info.isAuthorized;
    });
  }

  getPageIndex(): number {
    const index = this.paginationOptions.indexFrom / 20 - 1;
    if (index <= 0) return 0;
    return index;
  }

  groupsSubscribes(): void {
    this.store$.select(selectGroup0).subscribe((group0) => {
      this.bookWords[0] = group0;
    });

    this.store$.select(selectGroup1).subscribe((group1) => {
      this.bookWords[1] = group1;
    });

    this.store$.select(selectGroup2).subscribe((group2) => {
      this.bookWords[2] = group2;
    });

    this.store$.select(selectGroup3).subscribe((group3) => {
      this.bookWords[3] = group3;
    });

    this.store$.select(selectGroup4).subscribe((group4) => {
      this.bookWords[4] = group4;
    });

    this.store$.select(selectGroup5).subscribe((group5) => {
      this.bookWords[5] = group5;
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

  updateCurrentWords(): void {
    this.wordsService.getUserWords().subscribe((data) => {
      this.userWords = data;

      this.getWordsPerPage();
      this.store$.dispatch(
        fetchAllUserWordsSuccess({ userWords: this.userWords }),
      );
    });
  }

  getUnitWords(): void {
    const { group } = this.paginationOptions;

    if (this.isAuthorized) {
      this.wordsService.getUserWords().subscribe((data) => {
        this.userWords = data;
        this.store$.dispatch(
          fetchAllUserWordsSuccess({ userWords: this.userWords }),
        );
      });
    }

    if (this.bookWords[group].length) {
      this.currentGroupWords = this.bookWords[group];

      this.getWordsPerPage();
      return;
    }

    this.wordsService
      .getWordsExt(group, 0, 600, 600)
      .subscribe((wordsPerGroup) => {
        this.currentGroupWords = wordsPerGroup;
        this.getWordsPerPage();

        this.saveGroupAtStore(group);
      });
  }

  getWordsPerPage(): void {
    this.listWords = [];
    this.withoutDeletedWords = this.getFilteredWords(this.currentGroupWords);

    const wordsPerPage = this.withoutDeletedWords.slice(
      this.indexFrom,
      this.indexTo,
    );

    this.listWords = wordsPerPage;

    this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
    this.store$.dispatch(fetchWordsForGame({ words: this.listWords }));
  }

  updateWordsPerPage(allWords: IWord[]): void {
    this.listWords = [];
    const deletedWordIds = allWords.map((word) => word.id);

    this.withoutDeletedWords = this.withoutDeletedWords.filter(
      (word) => !deletedWordIds.includes(word.id),
    );

    const wordsPerPage = this.currentGroupWords.slice(
      this.indexFrom,
      this.indexTo,
    );

    this.listWords = wordsPerPage;

    this.store$.dispatch(fetchAllWordsSuccess({ words: this.listWords }));
    this.store$.dispatch(fetchWordsForGame({ words: this.listWords }));
  }

  saveGroupAtStore(group: number): void {
    switch (group) {
      case 0:
        if (!this.bookWords[0].length) {
          this.store$.dispatch(fetchGroup0({ words: this.currentGroupWords }));
        }
        break;
      case 1:
        if (!this.bookWords[1].length) {
          this.store$.dispatch(fetchGroup1({ words: this.currentGroupWords }));
        }
        break;
      case 2:
        if (!this.bookWords[2].length) {
          this.store$.dispatch(fetchGroup2({ words: this.currentGroupWords }));
        }
        break;
      case 3:
        if (!this.bookWords[3].length) {
          this.store$.dispatch(fetchGroup3({ words: this.currentGroupWords }));
        }
        break;
      case 4:
        if (!this.bookWords[4].length) {
          this.store$.dispatch(fetchGroup4({ words: this.currentGroupWords }));
        }
        break;
      case 5:
        if (!this.bookWords[5].length) {
          this.store$.dispatch(fetchGroup5({ words: this.currentGroupWords }));
        }
        break;
      default:
        this.store$.dispatch(fetchGroup0({ words: this.currentGroupWords }));
    }
  }

  getFilteredWords(wordsPerPage: IWord[]): IWord[] {
    const deletedWordIds = this.userWords
      .filter((userWord) => userWord.optional.isDeleted)
      .map((userWord) => userWord.wordId);

    const words = wordsPerPage.filter(
      (word) => !deletedWordIds.includes(word.id),
    );
    return words;
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

  /// ///////////////////
  swicthPaginationIndex(): void {
    this.paginator.nativeElement.pageIndex = this.paginationOptions.page;
    this.paginator.nativeElement.previousPageIndex =
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

  markAsDeleted(word: IWord): void {
    if (!this.userWords.length || !this.isInUserWords(word)) {
      const optional = {
        isDifficult: false,
        isDeleted: true,
        isStudy: false,
      };

      this.wordsService.postWord(word.id, { optional }).subscribe(() => {
        this.updateCurrentWords();
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
            this.updateCurrentWords();
          }),
      );
    }
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    const { previousPageIndex } = event;

    if (this.pageIndex - previousPageIndex < 0) {
      if (previousPageIndex === 0) return;
      this.scrollForward = false;

      this.decreaseIndexes();
      this.getWordsPerPage();
    } else {
      if (previousPageIndex === this.getLastPage()) return;
      this.scrollForward = true;

      this.increaseIndexes();
      this.getWordsPerPage();
    }

    this.savePaginationOptions();
  }

  switchPagination(): void {
    if (this.scrollForward) {
      this.decreaseIndexes();
      this.getWordsPerPage();
    } else {
      this.increaseIndexes();
      this.getWordsPerPage();
    }

    this.savePaginationOptions();
  }

  getLastPage(): number {
    return this.withoutDeletedWords.length / WORDS_LIST_LENGTH - 1;
  }

  savePaginationOptions(): void {
    const pagination: IPagination = LocalStorageService.getItemFromLocalStorage(
      PAGINATION,
    );

    if (pagination) {
      LocalStorageService.deleteItemFromLocalStorageByKey(PAGINATION);
    }

    LocalStorageService.setItemToLocalStorage('pagination', {
      group: this.paginationOptions.group,
      page: this.pageIndex,
      indexFrom: this.indexFrom,
      indexTo: this.indexTo,
    });
  }
}
