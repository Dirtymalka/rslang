import { Component, Input, OnInit } from '@angular/core';
import { IUserWord } from '../../../../shared/models/word.models';
import { IStatistic } from '../../../../shared/models/statistics.models';
import {
  getCountByStudiedWordsByDate,
  getDayFromDate,
  getStatByGames,
  getTotalSuccessPercentByDate,
} from '../../../../shared/utils/utils';
import { GAMES } from '../../../../../constants/global.constants';

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss'],
})
export class StatDetailsComponent implements OnInit {
  @Input() userWords: IUserWord[];

  @Input() statistic: IStatistic;

  studyWordsToday = 0;

  totalSuccessPercent: number;

  statisticByGames: {
    name: string;
    totalLearnedWords: number;
    bestAnswersSeries: number;
    totalGameSuccessPercent: number;
  }[];

  games = GAMES;

  ngOnInit(): void {
    const filteredWords: IUserWord[] =
      this.userWords?.length &&
      this.userWords.filter((word: IUserWord) => word.optional.studiedDate);
    this.studyWordsToday = getCountByStudiedWordsByDate(
      getDayFromDate(Date.now()),
      filteredWords,
    );
    this.totalSuccessPercent = getTotalSuccessPercentByDate(
      getDayFromDate(Date.now()),
      this.statistic.optional,
    );
    this.statisticByGames = getStatByGames(this.statistic, this.userWords);
  }
}
