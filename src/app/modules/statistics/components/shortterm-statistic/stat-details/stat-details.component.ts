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

  totalSuccessPercent = 0;

  statisticByGames: {
    name: string;
    totalLearnedWords: number;
    bestAnswersSeries: number;
    totalGameSuccessPercent: number;
  }[] = GAMES.map((game: string) => ({
    name: game,
    bestAnswersSeries: 0,
    totalGameSuccessPercent: 0,
    totalLearnedWords: 0,
  }));

  games = GAMES;

  ngOnInit(): void {
    const filteredWords: IUserWord[] =
      this.userWords?.length &&
      this.userWords.filter((word: IUserWord) => word.optional?.studiedDate);
    this.studyWordsToday = filteredWords.length
      ? getCountByStudiedWordsByDate(getDayFromDate(Date.now()), filteredWords)
      : 0;
    this.totalSuccessPercent = getTotalSuccessPercentByDate(
      getDayFromDate(Date.now()),
      this.statistic.optional,
    );
    this.statisticByGames = getStatByGames(
      getDayFromDate(Date.now()),
      this.statistic,
      this.userWords,
    );
  }
}
