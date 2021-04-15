import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';

import { IChapter } from '../../../shared/models/chapter.models';
import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent implements OnInit {
  chapters: IChapter[] = [
    { name: 'Unit 1', group: 0, style: 'group-0' },
    { name: 'Unit 2', group: 1, style: 'group-1' },
    { name: 'Unit 3', group: 2, style: 'group-2' },
    { name: 'Unit 4', group: 3, style: 'group-3' },
    { name: 'Unit 5', group: 4, style: 'group-4' },
    { name: 'Unit 6', group: 5, style: 'group-5' },
  ];

  paginationOptions;

  paginationOptions$: Subscription;

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.paginationOptions$ = this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
      });
  }

  chooseChapter(chapter: IChapter): void {
    const options = { group: chapter.group, page: 0 };
    this.store$.dispatch(changePaginationOptions(options));
  }
}
