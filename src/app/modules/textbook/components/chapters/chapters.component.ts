import { Component } from '@angular/core';
import { IChapter } from '../../../../models/chapter.models';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent {
  chapters: IChapter[] = [
    { name: 'Unit 1' },
    { name: 'Unit 2' },
    { name: 'Unit 3' },
    { name: 'Unit 4' },
    { name: 'Unit 5' },
    { name: 'Unit 6' },
  ];

  chooseChapter(chapter: IChapter): void {
    console.log(chapter);
  }
}
