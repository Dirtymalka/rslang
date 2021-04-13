class TeamMember {
  name: string;

  github: string;

  photo: string;

  role: string;

  tasks: string[];

  constructor(
    name: string,
    github: string,
    photo: string,
    role: string,
    tasks: string[],
  ) {
    this.name = name;
    this.github = github;
    this.photo = photo;
    this.role = role;
    this.tasks = tasks;
  }
}

const team: TeamMember[] = [
  {
    name: 'ARTSIOM ANTONAU',
    github: 'dirtymalka',
    photo: 'dirtymalka',
    role: 'Team lead',
    tasks: [
      'It is a long established fact',
      'when an unknown printer',
      'release of Letraset',
    ],
  },
  {
    name: 'Natalija Eina',
    github: 'natein',
    photo: 'natein',
    role: 'Developer',
    tasks: [
      'the leap into electronic',
      'In the 1960s with',
      'Aldus PageMaker including',
      'Where does it come from?',
    ],
  },
  {
    name: 'Nataliia Cherkes',
    github: 'chernataly2020',
    photo: 'chernataly2020',
    role: 'Developer',
    tasks: [
      'It is a long established fact',
      'when an unknown printer',
      'release of Letraset',
    ],
  },
  {
    name: 'Maksim Tsikhamirau',
    github: 'maxim-tihomirov',
    photo: 'maxim-tihomirov',
    role: 'Developer',
    tasks: [
      'the leap into electronic',
      'In the 1960s with',
      'Aldus PageMaker including',
      'Where does it come from?',
    ],
  },
  {
    name: 'Ivan Hrynenko',
    github: 'igrynenko',
    photo: 'igrynenko',
    role: 'Developer',
    tasks: [
      'It is a long established fact',
      'when an unknown printer',
      'release of Letraset',
    ],
  },
  {
    name: 'Yauheniya Shybkova',
    github: 'jenia-shibkova',
    photo: 'jenia-shibkova',
    role: 'Developer',
    tasks: [
      'It is a long established fact',
      'when an unknown printer',
      'release of Letraset',
    ],
  },
  {
    name: 'Yuriy Sulyga',
    github: 'yuriysga',
    photo: 'yuriysga',
    role: 'Developer',
    tasks: [
      'It is a long established fact',
      'when an unknown printer',
      'release of Letraset',
    ],
  },
];

export default team;
