import { Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WordsServiceService } from '../../../shared/services/words-service.service';
import { IAggWord } from '../../../shared/models/word.models';

@Component({
  selector: 'app-deleted-words',
  templateUrl: './deleted-words.component.html',
  styleUrls: ['./deleted-words.component.scss'],
})
export class DeletedWordsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  CHAPTERS_COLOR = ['group0', 'group1', 'group2', 'group3', 'group4', 'group5'];

  public displayedColumns: string[] = ['img', 'word', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public words: MatTableDataSource<IAggWord[]>;

  public pageEvent;

  public pageIndex = 0;

  public previousPageIndex = 0;

  public pageSize = 20;

  public length = 0;

  public chapterNumber = 0;

  public loading = true;

  constructor(private wordsServiceService: WordsServiceService) {}

  ngOnInit(): void {
    this.getServerData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getBarClass(): string {
    return this.CHAPTERS_COLOR[this.chapterNumber];
  }

  public removeWord(id: string): void {
    this.subscription.add(
      this.wordsServiceService.getUserWord(id).subscribe((data) =>
        this.wordsServiceService
          .putWord(data.wordId, {
            difficulty: data.difficulty,
            optional: { ...data.optional, isDeleted: false },
          })
          .subscribe(() => this.getServerData()),
      ),
    );
  }

  public paginated(event?: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.previousPageIndex = event.previousPageIndex;
    this.getServerData();
  }

  private getServerData(): void {
    this.loading = true;
    const filter = {
      $and: [
        {
          'userWord.optional.isDeleted': true,
        },
      ],
    };

    this.subscription.add(
      this.wordsServiceService
        .getUserAggWordsToPaginator({
          group: this.chapterNumber,
          page: this.pageIndex,
          wordsPerPage: this.pageSize,
          filter,
        })
        .subscribe((w) => {
          this.length = w.count;
          this.words = new MatTableDataSource<IAggWord[]>(w.aggWords);
          this.loading = false;
        }),
    );
  }

  public chapterClick(num: number): void {
    this.chapterNumber = num;
    this.getServerData();
  }

  removeTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
