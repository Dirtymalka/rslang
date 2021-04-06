import { Options } from 'highcharts';
import { IUserWord } from '../models/word.models';
import { getDayFromDate } from './utils';

const emptyLineChartConfig: Options = {
  title: {
    text: 'Общий прогресс',
    style: {
      fontWeight: 'bold',
    },
  },
  series: [
    {
      type: 'line',
      name: 'Общий прогресс изучения',
      data: [],
    },
  ],
  lang: {
    noData: 'Нет данных',
  },
  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: 'black',
    },
  },
  yAxis: {
    title: { text: 'Количество слов' },
  },
};

const emptyColumnChartConfig: Options = {
  title: {
    text: 'Ежедневный прогресс',
    style: {
      fontWeight: 'bold',
    },
  },
  series: [
    {
      type: 'line',
      name: 'Ежедневный прогресс изучения',
      data: [],
    },
  ],
  lang: {
    noData: 'No data',
  },
  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: 'black',
    },
  },
  yAxis: {
    title: { text: 'Количество слов' },
  },
};

export const toLineChartConfig = (words: IUserWord[]): Options => {
  if (!words.length) {
    return emptyLineChartConfig;
  }

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

export const toColumnChartConfig = (words: IUserWord[]): Options => {
  if (!words.length) {
    return emptyColumnChartConfig;
  }

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
