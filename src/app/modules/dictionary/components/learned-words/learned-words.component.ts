import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { WordsServiceService } from '../../../shared/services/words-service.service';
import { IAggWord } from '../../../shared/models/word.models';

@Component({
  selector: 'app-learned-words',
  templateUrl: './learned-words.component.html',
  styleUrls: ['./learned-words.component.scss'],
})
export class LearnedWordsComponent implements OnInit {
  public displayedColumns: string[] = ['img', 'word', 'results'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public words: MatTableDataSource<IAggWord[]> = null;

  public pageEvent;

  public pageIndex = 0;

  public previousPageIndex = 0;

  public pageSize = 20;

  public length = 0;

  public loading = true;

  constructor(private wordsServiceService: WordsServiceService) {}

  ngOnInit(): void {
    this.getServerData();
  }

  public paginated(event?: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex;
    this.getServerData();
  }

  private getServerData(): void {
    this.loading = true;
    const filter = {
      $and: [
        {
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
        this.loading = false;
      });
  }

  removeTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
