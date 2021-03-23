import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { WordsServiceService } from '../../../shared/services/words-service.service';

import { IAggWord } from '../../../shared/models/wordModels';

@Component({
  selector: 'app-learned-words',
  templateUrl: './learned-words.component.html',
  styleUrls: ['./learned-words.component.scss'],
})
export class LearnedWordsComponent implements OnInit {
  public displayedColumns: string[] = [
    'word',
    'wordTranslate',
    'results',
    'actions',
  ];

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

  public paginated(event?: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.previousPageIndex = event.previousPageIndex;
    this.getServerData();
  }

  private getServerData(): void {
    const filter = { $and: [{ userWord: { $exists: true } }] };
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
