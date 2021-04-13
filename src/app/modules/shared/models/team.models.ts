export interface ITeam {
  name: string;
  title: string;
  image: string;
  github: string;
  responsibilities: string[];
}

export const TEAM: ITeam[] = [
  {
    name: 'Артем Антонов',
    title: 'тимлид',
    image: 'dirtymalka',
    github: 'https://github.com/dirtymalka',
    responsibilities: [
      'Организация стейтменеджмента (ngRx)',
      'Основные services',
      'Статистика',
      'Страница логина',
      'Игра "Виселица"',
      'Игра "Спринт"',
    ],
  },
  {
    name: 'Максим Тихомиров',
    title: 'разработчик',
    image: 'maxim-tihomirov',
    github: 'https://github.com/maxim-tihomirov',
    responsibilities: ['Основной лэйаут (хедер, футер)', 'игра "Саванна"'],
  },
  {
    name: 'Евгения Шибкова',
    title: 'разработчик',
    image: 'jenia-shibkova',
    github: 'https://github.com/jenia-shibkova',
    responsibilities: ['Учебник', 'Стартовая страница'],
  },
  {
    name: 'Юра Сулыга',
    title: 'разработчик',
    image: 'yuriysga',
    github: 'https://github.com/yuriysga',
    responsibilities: ['Словарь', 'Игра "Аудиовызов"'],
  },
];
