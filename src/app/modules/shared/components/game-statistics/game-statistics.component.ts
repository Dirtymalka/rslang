import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MEDIA_PREFIX } from '../../../../constants/global.constants';

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

  @Input() totalScore: number = null;

  @Input() gameName: string;

  winPercent: number;

  audioPlayer = new Audio();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.winPercent = Math.round(
      (this.rightAnswers.length /
        ((this.wrongAnswers.length + this.rightAnswers.length) || 1)) *
        100,
    );
  }

  goOnMainPage(): void {
    this.router.navigate(['/']);
  }

  goToStartPage(): void {
    this.router.navigate([`games/${this.gameName}`, 'start-page']);
  }

  onAudioClickHandler = (audioSrc: string): void => {
    if (this.audioPlayer.src !== `${MEDIA_PREFIX}${audioSrc}`) {
      this.audioPlayer.src = `${MEDIA_PREFIX}${audioSrc}`;
    }
    this.audioPlayer.load();
    this.audioPlayer
      .play()
      .then((r) => r)
      .catch((e) => e);
  };
}
