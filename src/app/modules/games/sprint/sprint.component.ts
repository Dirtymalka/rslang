import { Component } from '@angular/core';

interface IWordsResult {
  know: [];
  dontKnow: [];
}

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent {
  wordsResult: IWordsResult;

  totalScore: number;

  gameOver = false;

  gameOverHandler({ wordsResult, totalScore }): void {
    setTimeout(() => {
      this.wordsResult = wordsResult;
      this.gameOver = true;
      this.totalScore = totalScore;
    });
  }
}
