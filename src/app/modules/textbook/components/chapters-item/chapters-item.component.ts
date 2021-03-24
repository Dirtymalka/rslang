import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChapter } from '../../../../models/chapter.models';

@Component({
  selector: 'app-chapters-item',
  templateUrl: './chapters-item.component.html',
  styleUrls: ['./chapters-item.component.scss'],
})
export class ChaptersItemComponent {
  @Input()
  chapter: IChapter;

  @Output()
  chooseChapter = new EventEmitter<IChapter>();

  onClick(): void {
    this.chooseChapter.emit(this.chapter);
  }
}
