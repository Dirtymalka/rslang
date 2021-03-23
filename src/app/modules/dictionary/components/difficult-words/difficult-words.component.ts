import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import { IAggWord } from '../../../shared/models/wordModels';

@Component({
  selector: 'app-difficult-words',
  templateUrl: './difficult-words.component.html',
  styleUrls: ['./difficult-words.component.scss'],
})
export class DifficultWordsComponent implements OnInit {
  displayedColumns: string[] = ['word', 'wordTranslate', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public words: any;

  public pageEvent;

  public pageIndex = 0;

  public previousPageIndex = 0;

  public pageSize = 20;

  public length = 0;

  constructor(private wordsServiceService: WordsServiceService) {}

  ngOnInit(): void {
    this.getServerData();
  }

  removeWord(id: string): void {
    console.log(id);
    this.wordsServiceService.getUserWord(id).subscribe((data) =>
      this.wordsServiceService
        .putWord(data.wordId, {
          difficulty: data.difficulty,
          optional: { ...data.optional, isDifficult: false, isStudy: true },
        })
        .subscribe(() => this.getServerData()),
    );
  }

  public paginated(event?: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
    this.wordsServiceService
      .getUserAggWordsToPaginator({
        group: '',
        page: this.pageIndex,
        wordsPerPage: this.pageSize,
        filter,
      })
      .subscribe((w) => {
        this.length = w.count;
        this.words = new MatTableDataSource<IAggWord[]>(w.aggWords);
      });
  }
}
