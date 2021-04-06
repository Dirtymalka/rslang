import { IUserWord } from '../models/word.models';
import {
  IOptional,
  IStatistic,
  IStatisticGame,
} from '../models/statistics.models';
import { GAMES, GAMES_NAMES } from '../../../constants/global.constants';

export const getDayFromDate = (date: number): number => {
  const timeZone = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(date).setHours(0, 0, 0, 0) - timeZone;
};

export const getCountByStudiedWordsByDate = (
  date: number,
  wordsData: IUserWord[],
): number => {
  const data = wordsData.map((word: IUserWord) => {
    const transformDate = getDayFromDate(word.optional.studiedDate);
    return {
      ...word,
      optional: {
        ...word.optional,
        studiedDate: transformDate,
      },
    };
  });
  const wordWithDate = data.filter(
    (word: IUserWord) => word.optional.studiedDate === date,
  );
  return wordWithDate.length;
};

export const getTotalSuccessPercentByDate = (
  date: number,
  gameStatistic: IOptional,
): number => {
  const filteredStatByDate = Object.values(gameStatistic)
    // .map((gameStat) => gameStat.result)
    .reduce((res, game: IStatisticGame) => res.concat(game), [])
    .map((game: IStatisticGame) => ({
      ...game,
      date: getDayFromDate(game.date),
    }))
    .filter((game: IStatisticGame) => game.date === date);

  const totalCorrectCount = filteredStatByDate.reduce(
    (total: number, game: IStatisticGame) => total + game.correct,
    0,
  );
  const totalIncorrectCount = filteredStatByDate.reduce(
    (total: number, game: IStatisticGame) => total + game.incorrect,
    0,
  );
  return (
    Math.round(
      (totalCorrectCount / (totalCorrectCount + totalIncorrectCount)) * 100,
    ) || 0
  );
};

export const getTotalSuccessPercentByGame = (
  statistic: IStatisticGame[],
): number => {
  const correctCount = statistic.reduce(
    (total: number, gameStat: IStatisticGame) => total + gameStat.correct,
    0,
  );
  const incorrectCount = statistic.reduce(
    (total: number, gameStat: IStatisticGame) => total + gameStat.incorrect,
    0,
  );
  return (
    Math.round((correctCount / (correctCount + incorrectCount)) * 100) || 0
  );
};

export const getStatByGames = (
  date: number,
  statistic: IStatistic,
  userWords: IUserWord[],
): {
  name: string;
  totalLearnedWords: number;
  bestAnswersSeries: number;
  totalGameSuccessPercent: number;
}[] => {
  const transformedWordsByDate: IUserWord[] = userWords.map(
    (word: IUserWord) => {
      const transformDate = getDayFromDate(word.optional.studiedDate);
      return {
        ...word,
        optional: {
          ...word.optional,
          studiedDate: transformDate,
        },
      };
    },
  );

  const filteredWordsByDate: IUserWord[] = transformedWordsByDate.filter(
    (word: IUserWord) => word.optional.studiedDate === date,
  );

  return GAMES.reduce((result: [], game: string) => {
    const totalLearnedWords = filteredWordsByDate.filter(
      (word: IUserWord) => word.optional.game === game,
    );

    const filteredStatisticByDate: IStatisticGame[] = statistic.optional[
      game
    ].filter((gameStatistic: IStatisticGame) => gameStatistic.date === date);

    const totalGameSuccessPercent = getTotalSuccessPercentByGame(
      filteredStatisticByDate,
    );

    const gameStat = {
      name: GAMES_NAMES[game],
      totalLearnedWords: totalLearnedWords.length,
      bestAnswersSeries: filteredStatisticByDate.reduce(
        (res, gameStatistic) => Math.max(res, gameStatistic.bestAnswersSeries),
        0,
      ) || 0,
      totalGameSuccessPercent,
    };
    return [...result, gameStat];
  }, []);
};
