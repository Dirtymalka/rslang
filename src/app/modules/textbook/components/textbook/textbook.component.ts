import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PAGINATION } from '../../../../constants/global.constants';
import { changePaginationOptions } from '../../../../redux/actions/settings.actions';
import { selectPaginationOptions } from '../../../../redux/selectors/settings.selectors';
import { IAppState } from '../../../../redux/state/app.state';
import { IPagination } from '../../../../redux/state/settings.state';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
})
export class TextbookComponent implements OnInit, OnDestroy {
  paginationOptions;

  constructor(private store$: Store<IAppState>) {}

  ngOnInit(): void {
    this.store$
      .select(selectPaginationOptions)
      .subscribe((paginationOptions) => {
        this.paginationOptions = paginationOptions;
      });

    const pagination: IPagination = LocalStorageService.getItemFromLocalStorage(
      PAGINATION,
    );

    if (pagination) {
      const options = { ...pagination };
      this.store$.dispatch(changePaginationOptions(options));
    } else {
      this.store$.dispatch(
        changePaginationOptions({
          group: 0,
          page: 0,
          indexFrom: 0,
          indexTo: 20,
        }),
      );
    }
  }

  ngOnDestroy(): void {
    const pagination: IPagination = LocalStorageService.getItemFromLocalStorage(
      PAGINATION,
    );

    if (pagination) {
      LocalStorageService.deleteItemFromLocalStorageByKey(PAGINATION);
    }
    LocalStorageService.setItemToLocalStorage(
      'pagination',
      this.paginationOptions,
    );
  }
}
