import {
  Component,
  DoCheck,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  IAggWordsPaginator,
  IUserWord,
  IWord,
} from '../../../../shared/models/word.models';
import { IStatistic } from '../../../../shared/models/statistics.models';
import { WordsServiceService } from '../../../../shared/services/words-service.service';
import { fetchAllUserWords } from '../../../../../redux/actions/words.actions';
import {
  fetchStatistic,
  putStatistic,
} from '../../../../../redux/actions/statistics.actions';
import {
  selectDifficultWordsData,
  selectUserWords,
  selectWordsForGame,
} from '../../../../../redux/selectors/words.selectors';
import { selectStatistic } from '../../../../../redux/selectors/statistic.selectors';
import {
  cancelFullscreen,
  randomInteger,
} from '../../../../shared/utils/utils';
import {
  MEDIA_PREFIX,
  SPRINT,
} from '../../../../../constants/global.constants';
import { StatisticService } from '../../../../shared/services/statistic.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('sprint') sprint;

  @Output() gameOver = new EventEmitter<{
    wordsResult: {
      know: any[];
      dontKnow: any[];
    };
    totalScore: number;
  }>();

  userWords: IUserWord[] = [];

  statistic: IStatistic;

  level: number;

  group: number;

  fromBook: boolean;

  fromDictionary: boolean;

  words: IWord[];

  isLoading: boolean;

  word: IWord;

  wordForCheck: IWord;

  wordsResult = {
    know: [],
    dontKnow: [],
  };

  correctAnswerSeries = 0;

  bestCorrectAnswerSeries = 0;

  scoreForWord = 10;

  totalScore = 0;

  checkCount = 0;

  isWrong = false;

  isCorrect = false;

  count = 60;

  counter;

  fullScreen: boolean;

  disableButtons: boolean;

  audioPlayer = new Audio();

  playedOutWords: string[] = [];

  factorsLength: number[] = new Array(1);

  subscription: Subscription = new Subscription();

  gameOver1: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private wordService: WordsServiceService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.level = params.level;
        this.group = params.group;
        this.fromBook = !!params.fromBook;
        this.fromDictionary = !!params.fromDictionary;
      }),
    );

    this.getGameWords();

    this.store.dispatch(fetchAllUserWords());
    this.store.dispatch(fetchStatistic());

    this.subscription.add(
      this.store.select(selectUserWords).subscribe((words) => {
        this.userWords = words;
      }),
    );

    this.subscription.add(
      this.store.select(selectStatistic).subscribe((stat: IStatistic) => {
        this.statistic = stat;
      }),
    );

    document.addEventListener('keydown', this.handleKeyDown);

    this.counter = setInterval(() => {
      this.count -= 1;
    }, 1000);
  }

  ngDoCheck(): void {
    this.checkGameOver();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.removeEventListener('keydown', this.handleKeyDown);
    clearInterval(this.counter);
    this.count = null;
  }

  private getGameWords() {
    this.isLoading = true;

    if (this.fromBook) {
      this.subscription.add(
        this.store.select(selectWordsForGame).subscribe((words: IWord[]) => {
          this.words = words;
          this.getWordsForRound();
          this.isLoading = false;
        }),
      );

      return;
    }

    if (this.fromDictionary) {
      this.subscription.add(
        this.store
          .select(selectDifficultWordsData)
          .subscribe((words: IAggWordsPaginator) => {
            this.words = words.aggWords;
            this.getWordsForRound();
            this.isLoading = false;
          }),
      );

      return;
    }

    this.subscription.add(
      this.wordService
        .getWordsExt(this.level - 1, this.group - 1, 100, 100)
        .subscribe((words: IWord[]) => {
          this.words = words;
          this.getWordsForRound();
          this.isLoading = false;
        }),
    );
  }

  getWordsForRound(): void {
    this.getUniqueWord();

    const isRight = Math.random() > 0.5;

    if (isRight) {
      this.wordForCheck = this.word;
    } else {
      this.wordForCheck = this.getAnotherWord(this.word);
    }

    this.onAudioClickHandler(this.word?.audio, false);
  }

  getUniqueWord(): void {
    const randomIndex = randomInteger(0, this.words.length - 1);
    this.word = this.words[randomIndex];

    if (this.playedOutWords.includes(this.word?.id)) {
      this.getUniqueWord();
    }
  }

  getAnotherWord(word: IWord): IWord {
    const randomIndex = randomInteger(0, this.words.length - 1);
    const anotherWord: IWord = this.words[randomIndex];
    if (word?.id === anotherWord?.id) {
      return this.getAnotherWord(word);
    }
    return anotherWord;
  }

  checkAnswer(answer: string): void {
    if (this.disableButtons) {
      return;
    }

    switch (answer) {
      case 'correct': {
        if (this.word.id === this.wordForCheck.id) {
          this.correctAnswerHandler();
        } else {
          this.incorrectAnswerHandler();
        }
        break;
      }
      case 'incorrect': {
        if (this.word.id !== this.wordForCheck.id) {
          this.correctAnswerHandler();
        } else {
          this.incorrectAnswerHandler();
        }
        break;
      }
      default:
        break;
    }

    this.playedOutWords.push(this.word.id);

    this.disableButtons = true;
    this.checkGameOver();
    if (this.gameOver1) {
      return;
    }
    // setTimeout(() => {
    this.changeScoreForWord();
    this.getWordsForRound();
    this.disableButtons = false;
    // }, 300);
  }

  checkGameOver(): void {
    if (
      (this.count !== null && this.count <= 0) ||
      this.playedOutWords?.length === this.words?.length
    ) {
      document.removeEventListener('keydown', this.handleKeyDown);
      clearInterval(this.counter);
      this.gameOver.emit({
        wordsResult: this.wordsResult,
        totalScore: this.totalScore,
      });
      this.bestCorrectAnswerSeries = Math.max(
        this.bestCorrectAnswerSeries,
        this.correctAnswerSeries,
      );

      this.sendStatistic();
      this.count = null;
      this.gameOver1 = true;
    }
  }

  correctAnswerHandler(): void {
    this.correctAnswerSeries += 1;
    this.totalScore += this.scoreForWord;
    this.addToResults(
      'know',
      this.word.word,
      this.word.wordTranslate,
      this.word.transcription,
      this.word.audio,
    );

    this.sendWordResult('correctCount');
    this.isCorrect = true;

    this.onAudioClickHandler('../../../assets/sounds/success.mp3', true);

    setTimeout(() => {
      this.isCorrect = false;
    }, 300);
  }

  incorrectAnswerHandler(): void {
    this.bestCorrectAnswerSeries = Math.max(
      this.correctAnswerSeries,
      this.bestCorrectAnswerSeries,
    );
    this.correctAnswerSeries = 0;
    this.addToResults(
      'dontKnow',
      this.word.word,
      this.word.wordTranslate,
      this.word.transcription,
      this.word.audio,
    );

    this.sendWordResult('incorrectCount');
    this.isWrong = true;

    this.onAudioClickHandler('../../../assets/sounds/sounds_error.mp3', true);

    setTimeout(() => {
      this.isWrong = false;
    }, 300);
  }

  addToResults(
    result: 'know' | 'dontKnow',
    word: string,
    wordTranslate: string,
    wordTranscription: string,
    audioUrl: string,
  ): void {
    const resultContainWord = this.wordsResult[result].find(
      (res) => res.word === word,
    );

    if (resultContainWord) {
      return;
    }

    this.wordsResult[result].push({
      word,
      wordTranslate,
      wordTranscription,
      audioUrl,
    });
  }

  changeScoreForWord(): void {
    if (this.correctAnswerSeries < 4) {
      this.scoreForWord = 10;
      this.checkCount = this.correctAnswerSeries;
      this.factorsLength = new Array(1);
    }
    if (this.correctAnswerSeries >= 4 && this.correctAnswerSeries < 8) {
      this.scoreForWord = 20;
      this.checkCount = this.correctAnswerSeries - 4;
      this.factorsLength = new Array(2);
    }
    if (this.correctAnswerSeries >= 8 && this.correctAnswerSeries < 12) {
      this.scoreForWord = 40;
      this.checkCount = this.correctAnswerSeries - 8;
      this.factorsLength = new Array(3);
    }
    if (this.correctAnswerSeries > 12) {
      this.scoreForWord = 80;
      this.checkCount = 3;
      this.factorsLength = new Array(4);
    }
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowLeft') {
      this.checkAnswer('incorrect');
    }
    if (event.key === 'ArrowRight') {
      this.checkAnswer('correct');
    }
  };

  toggleFullScreen(): void {
    if (this.fullScreen) {
      cancelFullscreen();
      this.fullScreen = false;
    } else {
      this.sprint.nativeElement.requestFullscreen();
      this.fullScreen = true;
    }
  }

  sendWordResult(result: 'correctCount' | 'incorrectCount'): void {
    const userWord = this.userWords.find(
      (word) => word.wordId === this.word.id,
    );
    if (userWord) {
      this.subscription.add(
        this.wordService
          .putWord(
            userWord.wordId,
            {
              optional: {
                ...userWord.optional,
                [result]: userWord.optional[result]
                  ? userWord.optional[result] + 1
                  : 1,
                isStudy:
                  userWord.optional.isStudy ||
                  this.fromBook ||
                  this.fromDictionary,
              },
            },
            SPRINT,
          )
          .subscribe(),
      );
    } else {
      this.subscription.add(
        this.wordService
          .postWord(
            this.word.id,
            {
              optional: {
                [result]: 1,
                isDifficult: false,
                isDeleted: false,
                isStudy: this.fromBook || this.fromDictionary,
              },
            },
            SPRINT,
          )
          .subscribe(),
      );
    }
  }

  sendStatistic(): void {
    const statistic: IStatistic = {
      ...this.statistic,
      optional: {
        ...this.statistic.optional,
        sprint: [
          ...this.statistic.optional.sprint,
          {
            ...StatisticService.createGameStat(
              this.wordsResult.know.length,
              this.wordsResult.dontKnow.length,
              this.bestCorrectAnswerSeries,
            ),
          },
        ],
      },
    };
    this.store.dispatch(putStatistic({ statistic }));
  }

  onAudioClickHandler = (audioSrc: string, staticAudio: boolean): void => {
    if (
      this.audioPlayer.src !== `${!staticAudio ? MEDIA_PREFIX : ''}${audioSrc}`
    ) {
      this.audioPlayer.src = `${!staticAudio ? MEDIA_PREFIX : ''}${audioSrc}`;
    }
    this.audioPlayer.load();
    this.audioPlayer
      .play()
      .then((r) => r)
      .catch((e) => e);
  };
}
