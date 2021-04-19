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

  bestScore: any;

  gameOverHandler({ wordsResult, totalScore, bestScore }): void {
    this.wordsResult = wordsResult;
    this.gameOver = true;
    this.totalScore = totalScore;
    this.bestScore = bestScore;
  }
}
