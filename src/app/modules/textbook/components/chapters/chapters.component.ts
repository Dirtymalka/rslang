import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeGroup } from '../../../../redux/actions/settings.actions';
import { IChapter } from '../../../../models/chapter.models';
import { IAppState } from '../../../../redux/state/app.state';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent {
  chapters: IChapter[] = [
    { name: 'Unit 1', group: 0 },
    { name: 'Unit 2', group: 1 },
    { name: 'Unit 3', group: 2 },
    { name: 'Unit 4', group: 3 },
    { name: 'Unit 5', group: 4 },
    { name: 'Unit 6', group: 5 },
  ];

  constructor(private store$: Store<IAppState>) {}

  chooseChapter(chapter: IChapter): void {
    this.store$.dispatch(changeGroup({ group: chapter.group }));
    console.log(chapter.group);
  }
}
