import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectDifficultWordsData } from '../../../../redux/selectors/words.selectors';
import { fetchDifficultWords } from '../../../../redux/actions/words.actions';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import { IAggWord } from '../../../shared/models/word.models';
import {
  AUDIO_CALL,
  HANGMAN,
  SAVANNA,
  SPRINT,
} from '../../../../constants/global.constants';

@Component({
  selector: 'app-difficult-words',
  templateUrl: './difficult-words.component.html',
  styleUrls: ['./difficult-words.component.scss'],
})
export class DifficultWordsComponent implements OnInit {
  CHAPTERS_COLOR = ['group0', 'group1', 'group2', 'group3', 'group4', 'group5'];

  displayedColumns: string[] = ['img', 'word', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tabColor = '';

  public words: MatTableDataSource<IAggWord[]>;

  public pageEvent;

  public pageIndex = 0;

  public previousPageIndex = 0;

  public pageSize = 20;

  public length = 0;

  public chapterNumber = 0;

  public wordsLength = true;

  hangman = HANGMAN;

  audioCall = AUDIO_CALL;

  savanna = SAVANNA;

  sprint = SPRINT;

  constructor(
    private store: Store,
    private wordsServiceService: WordsServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.select(selectDifficultWordsData).subscribe((w) => {
      if (w) {
        this.wordsLength = w.aggWords.length < 5;
      }
    });

    this.getServerData();
  }

  public getBarClass(): string {
    return this.CHAPTERS_COLOR[this.chapterNumber];
  }

  removeWord(id: string): void {
    this.wordsServiceService.getUserWord(id).subscribe((data) =>
      this.wordsServiceService
        .putWord(data.wordId, {
          difficulty: data.difficulty,
          optional: { ...data.optional, isDifficult: false },
        })
        .subscribe(() => this.getServerData()),
    );
  }

  public paginated(event?: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex;
    this.getServerData();
  }

  private getServerData(): void {
    const filter = {
      $and: [
        {
          'userWord.optional.isDifficult': true,
          'userWord.optional.isStudy': true,
          'userWord.optional.isDeleted': false,
        },
      ],
    };

    this.store.dispatch(
      fetchDifficultWords({
        group: this.chapterNumber,
        page: this.pageIndex,
        wordsPerPage: this.pageSize,
        filter,
      }),
    );

    this.store.select(selectDifficultWordsData).subscribe((w) => {
      if (w) {
        this.length = w.count;
        this.words = new MatTableDataSource<IAggWord[]>(w.aggWords);
      }
    });
  }

  public chapterClick(num: number): void {
    this.chapterNumber = num;
    this.getServerData();
  }

  public startGame(game: string): void {
    this.router.navigate([`games/${game}/`], {
      queryParams: {
        fromDictionary: true,
      },
    });
  }
}
