import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { fetchWordsWithLevels } from '../../../redux/actions/hangman.actions';
import { selectHangmanWords } from '../../../redux/selectors/hangman.selectors';
import {
  IAggWordsPaginator,
  IUserWord,
  IWord,
} from '../../shared/models/word.models';
import {
  fetchAllUserWords,
  postUserWord,
  putUserWord,
} from '../../../redux/actions/words.actions';
import {
  selectDifficultWordsData,
  selectUserWords,
  selectWordsForGame,
} from '../../../redux/selectors/words.selectors';
import { ALPHABET } from '../../shared/constants/global.constants';
import { selectStatistic } from '../../../redux/selectors/statistic.selectors';
import { IStatistic } from '../../shared/models/statistics.models';
import { StatisticService } from '../../shared/services/statistic.service';
import {
  fetchStatistic,
  putStatistic,
} from '../../../redux/actions/statistics.actions';
import { HANGMAN, MEDIA_PREFIX } from '../../../constants/global.constants';
import { cancelFullscreen } from '../../shared/utils/utils';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit, OnDestroy {
  @ViewChild('hangman') hangman;

  IMAGES_GAL = [
    'assets/hangman/gal0.png',
    'assets/hangman/gal1.png',
    'assets/hangman/gal2.png',
    'assets/hangman/gal3.png',
    'assets/hangman/gal4.png',
    'assets/hangman/gal5.png',
    'assets/hangman/gal6.png',
  ];

  level: number;

  group: number;

  fromBook: boolean;

  fromDictionary: boolean;

  userWord: IUserWord;

  userWords: IUserWord[] = [];

  statistic: IStatistic;

  correctAnswerSeries = 0;

  bestCorrectAnswerSeries = 0;

  roundOver: boolean;

  gameOver: boolean;

  isSuccessResult: boolean;

  correctLetters: string[] = [];

  incorrectLetters: string[] = [];

  words: IWord[] = [];

  word: IWord;

  indexWord = 0;

  wordsResult = {
    know: [],
    dontKnow: [],
  };

  audioPlayer = new Audio();

  fullScreen = false;

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.level = params.level;
        this.group = params.group;
        this.fromBook = !!params.fromBook;
        this.fromDictionary = !!params.fromDictionary;
      }),
    );

    this.getWordsForGame();

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

    document.addEventListener('keydown', this.keyBoardHandler);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.removeEventListener('keydown', this.keyBoardHandler);
  }

  getWordsForGame(): void {
    if (this.fromBook) {
      this.subscription.add(
        this.store.select(selectWordsForGame).subscribe((words: IWord[]) => {
          this.words = words;
          this.word = this.words[this.indexWord];
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
            this.word = this.words[this.indexWord];
          }),
      );

      return;
    }

    this.store.dispatch(
      fetchWordsWithLevels({
        level: (this.level - 1).toString(),
        group: (this.group - 1).toString(),
      }),
    );

    this.subscription.add(
      this.store.select(selectHangmanWords).subscribe((w: IWord[]) => {
        if (w) {
          this.words = w;
          this.word = this.words[this.indexWord];
        }
      }),
    );
  }

  checkLetter(letter: string): void {
    if (
      this.correctLetters.includes(letter.toLowerCase()) ||
      this.incorrectLetters.includes(letter.toLowerCase()) ||
      this.gameOver ||
      this.roundOver
    ) {
      return;
    }
    if (this.word.word.toLowerCase().includes(letter.toLowerCase())) {
      this.correctLetters = this.correctLetters.concat(
        this.word.word
          .toLowerCase()
          .split('')
          .filter((l) => l.toLowerCase() === letter.toLowerCase()),
      );
    } else {
      this.incorrectLetters.push(letter.toLowerCase());
    }

    if (this.incorrectLetters.length === this.IMAGES_GAL.length - 1) {
      this.roundOver = true;
      this.isSuccessResult = false;
      this.bestCorrectAnswerSeries = Math.max(
        this.bestCorrectAnswerSeries,
        this.correctAnswerSeries,
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
    }

    if (this.correctLetters.length === this.word.word.length) {
      this.roundOver = true;
      this.isSuccessResult = true;
      this.correctAnswerSeries += 1;
      this.addToResults(
        'know',
        this.word.word,
        this.word.wordTranslate,
        this.word.transcription,
        this.word.audio,
      );

      this.sendWordResult('correctCount');
    }
  }

  addToResults(
    result: string,
    word: string,
    wordTranslate: string,
    wordTranscription: string,
    audioUrl: string,
  ): void {
    this.wordsResult[result].push({
      word,
      wordTranslate,
      wordTranscription,
      audioUrl,
    });
  }

  continue(): void {
    setTimeout(() => {
      if (this.indexWord < this.words.length - 1) {
        this.indexWord += 1;
        this.word = this.words[this.indexWord];
        this.resetState();
        return;
      }
      this.bestCorrectAnswerSeries = Math.max(
        this.bestCorrectAnswerSeries,
        this.correctAnswerSeries,
      );
      this.gameOver = true;
      this.sendStatistic();
    }, 300);
  }

  sendStatistic(): void {
    const statistic: IStatistic = {
      ...this.statistic,
      optional: {
        ...this.statistic.optional,
        hangman: [
          ...this.statistic.optional.hangman,
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

  resetState(): void {
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.roundOver = false;
    this.isSuccessResult = false;
  }

  keyBoardHandler = (event: KeyboardEvent): void => {
    if (this.roundOver) {
      if (event.key === 'Enter') {
        this.continue();
      }
      return;
    }
    if (this.gameOver) {
      return;
    }
    this.keyHandler(event);
  };

  keyHandler(event: KeyboardEvent): void {
    if (!ALPHABET.includes(event.key.toUpperCase())) {
      return;
    }
    this.checkLetter(event.key);
  }

  sendWordResult(result: 'correctCount' | 'incorrectCount'): void {
    this.userWord = this.userWords.find((word) => word.wordId === this.word.id);
    if (this.userWord) {
      this.store.dispatch(
        putUserWord({
          wordId: this.userWord.wordId,
          word: {
            optional: {
              ...this.userWord.optional,
              [result]: this.userWord.optional[result]
                ? this.userWord.optional[result] + 1
                : 1,
              isStudy:
                this.userWord.optional.isStudy ||
                this.fromBook ||
                this.fromDictionary,
            },
          },
          gameName: HANGMAN,
        }),
      );
    } else {
      this.store.dispatch(
        postUserWord({
          wordId: this.word.id,
          word: {
            optional: {
              [result]: 1,
              isDifficult: false,
              isDeleted: false,
              isStudy: this.fromBook || this.fromDictionary,
            },
          },
          gameName: HANGMAN,
        }),
      );
    }
  }

  dontKnowHandler(): void {
    this.roundOver = true;
    this.isSuccessResult = false;
    this.bestCorrectAnswerSeries = Math.max(
      this.bestCorrectAnswerSeries,
      this.correctAnswerSeries,
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

  toggleFullScreen(): void {
    if (this.fullScreen) {
      cancelFullscreen();
      this.fullScreen = false;
    } else {
      this.hangman.nativeElement.requestFullscreen();
      this.fullScreen = true;
    }
  }
}
