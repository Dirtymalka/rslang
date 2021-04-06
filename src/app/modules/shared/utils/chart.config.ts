import * as Highcharts from 'highcharts';
import { IUserWord } from '../models/word.models';
import { getDayFromDate } from './utils';

export const toLineChartConfig = (words: IUserWord[]): Highcharts.Options => {
  const data = words.reduce((acc, word: IUserWord) => {
    const date = getDayFromDate(word.optional.studiedDate);
    return {
      ...acc,
      [date]: acc[date] ? acc[date] + 1 : 1,
    };
  }, {});

  const dataForChart = Object.entries(data)
    .map((item) => [Number(item[0]), item[1]])
    .sort((a: [number, IUserWord], b: [number, IUserWord]) => a[0] - b[0])
    .reduce((acc, item, index) => {
      return [
        ...acc,
        [item[0], (acc[index - 1] ? acc[index - 1][1] : 0) + item[1]],
      ];
    }, []);

  return {
    title: {
      text: 'Общий прогресс',
      style: {
        fontWeight: 'bold',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'line',
        name: 'Общий прогресс изучения',
        data: dataForChart,
      },
    ],
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: { text: 'Количество слов' },
    },
  };
};

export const toColumnChartConfig = (words: IUserWord[]): Highcharts.Options => {
  const data = words.reduce((acc, word: IUserWord) => {
    const date = getDayFromDate(word.optional.studiedDate);
    return {
      ...acc,
      [date]: acc[date] ? acc[date] + 1 : 1,
    };
  }, {});

  const dataForChart = Object.entries(data)
    .map((item) => [Number(item[0]), item[1]])
    .sort((dataA: [number], dataB: [number]) => dataA[0] - dataB[0]);

  return {
    title: {
      text: 'Ежедневный прогресс',
      style: {
        fontWeight: 'bold',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'column',
        name: 'Ежедневный прогресс изучения',
        data: dataForChart,
        dataLabels: {
          enabled: true,
          format: '{y}',
        },
      },
    ],
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        groupPadding: 0.1,
      },
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
    },
    yAxis: {
      title: { text: 'Количество слов' },
    },
  };
};
