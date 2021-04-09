import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  team = [
    {
      name: 'Artem Antonau',
      title: 'teamlead',
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
      name: 'Maxim Tihomirov',
      title: 'developer',
      image: 'maxim-tihomirov',
      github: 'https://github.com/maxim-tihomirov',
      responsibilities: ['Основной лэйаут (хедер, футер)', 'игра "Саванна"'],
    },
    {
      name: 'Eugenia Shibkova',
      title: 'developer',
      image: 'jenia-shibkova',
      github: 'https://github.com/jenia-shibkova',
      responsibilities: ['Учебник', 'Стартовая страница'],
    },
    {
      name: 'Yuriy Sulyga',
      title: 'developer',
      image: 'yuriysga',
      github: 'https://github.com/yuriysga',
      responsibilities: ['Словарь', 'Игра "Аудиовызов"'],
    },
  ];
}
