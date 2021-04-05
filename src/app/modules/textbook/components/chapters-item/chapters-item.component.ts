import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
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
export class ChaptersItemComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @Input()
  chapter: IChapter;

  @Output()
  chooseChapter = new EventEmitter<IChapter>();

  @ViewChild('chapterItemRef') elementLabel: ElementRef;

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

  ngAfterViewInit(): void {
    this.switchCurrentGroupLabel();
  }

  ngAfterViewChecked(): void {
    this.switchCurrentGroupLabel();
  }

  onClick(): void {
    this.chooseChapter.emit(this.chapter);
  }

  switchCurrentGroupLabel(): void {
    if (this.chapter.group === this.currentGroup) {
      this.elementLabel.nativeElement.classList.add('chapter__label--active');
    } else {
      this.elementLabel.nativeElement.classList.remove(
        'chapter__label--active',
      );
    }
  }
}
