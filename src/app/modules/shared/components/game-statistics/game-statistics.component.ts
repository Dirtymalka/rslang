import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IAnswer {
  word: string;
  wordTranslate: string;
  wordTranscription: string;
  audioUrl: string;
}

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.scss'],
})
export class GameStatisticsComponent implements OnInit {
  @Input() wrongAnswers: IAnswer[];

  @Input() rightAnswers: IAnswer[];

  @Input() gameName: string;

  winPercent: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.winPercent = Math.round(
      this.rightAnswers.length / this.wrongAnswers.length +
        this.rightAnswers.length * 100,
    );
  }

  goOnMainPage(): void {
    this.router.navigate(['/']);
  }

  goToStartPage(): void {
    this.router.navigate([`games/${this.gameName}`, 'start-page']);
  }
}
