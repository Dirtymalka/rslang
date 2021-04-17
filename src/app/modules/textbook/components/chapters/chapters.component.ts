import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';

import { IChapter } from '../../../shared/models/chapter.models';
import { IAppState } from '../../../../redux/state/app.state';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';

import { IPagination } from '../../../../redux/state/settings.state';
import { PAGINATION } from '../../../../constants/global.constants';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent implements OnInit {
  chapters: IChapter[] = [
    { name: 'Глава 1', group: 0, style: 'group-0' },
    { name: 'Глава 2', group: 1, style: 'group-1' },
    { name: 'Глава 3', group: 2, style: 'group-2' },
    { name: 'Глава 4', group: 3, style: 'group-3' },
    { name: 'Глава 5', group: 4, style: 'group-4' },
    { name: 'Глава 6', group: 5, style: 'group-5' },
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
    const options = {
      group: chapter.group,
      page: 0,
      indexFrom: 0,
      indexTo: 20,
    };
    this.store$.dispatch(changePaginationOptions(options));
    this.savePaginationOptions(chapter);
  }

  savePaginationOptions(chapter: IChapter): void {
    const pagination: IPagination = LocalStorageService.getItemFromLocalStorage(
      PAGINATION,
    );

    if (pagination) {
      LocalStorageService.deleteItemFromLocalStorageByKey(PAGINATION);
    }

    LocalStorageService.setItemToLocalStorage('pagination', {
      group: chapter.group,
      page: 0,
      indexFrom: 0,
      indexTo: 20,
    });
  }
}
