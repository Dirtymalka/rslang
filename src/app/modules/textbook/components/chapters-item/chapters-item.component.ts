import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import { IAppState } from '../../../../redux/state/app.state';

import { IChapter } from '../../../shared/models/chapter.models';

@Component({
  selector: 'app-chapters-item',
  templateUrl: './chapters-item.component.html',
  styleUrls: ['./chapters-item.component.scss'],
})
export class ChaptersItemComponent implements OnInit {
  @Input()
  chapter: IChapter;

  @Output()
  chooseChapter = new EventEmitter<IChapter>();

  currentGroup;

  paginationOptions;

  paginationSub$: Subscription;

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.paginationSub$ = this.store$
      .select(selectPaginationOptions)
      .subscribe((options) => {
        const { group, page } = options;
        this.currentGroup = group;
        this.paginationOptions = { group, page };
      });
  }

  onClick(): void {
    this.chooseChapter.emit(this.chapter);
  }
}
