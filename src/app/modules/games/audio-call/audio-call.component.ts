import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDifficultWordsData,
  selectUserWords,
} from '../../../redux/selectors/words.selectors';
import {
  IAggWordsPaginator,
  IWord,
  IUserWord,
} from '../../shared/models/word.models';

import {
  fetchStatistic,
  putStatistic,
} from '../../../redux/actions/statistics.actions';

import { AUDIO_CALL } from '../../../constants/global.constants';
import {
  postUserWord,
  putUserWord,
  fetchAllUserWords,
} from '../../../redux/actions/words.actions';

import { selectStatistic } from '../../../redux/selectors/statistic.selectors';
import { IStatistic } from '../../shared/models/statistics.models';
import {
  fetchACallWordsWithLevelsSuccess,
  fetchACallWordsWithLevels,
} from '../../../redux/actions/audioCall.actions';
import { selectAudioCallWords } from '../../../redux/selectors/audioCall.selectors';
import { StatisticService } from '../../shared/services/statistic.service';

enum gameRoundSteps {
  questions,
  answerWait,
  answerCorrect,
  answerIncorrect,
  endGame,
}

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent implements OnInit, OnDestroy {
  level: number;

  group: number;

  fromBook: boolean;

  fromDictionary: boolean;

  private userWord: IUserWord;

  private userWords: IUserWord[] = [];

  private audioURL =
    'https://raw.githubusercontent.com/Dirtymalka/rslang-data/master/';

  private wordsResult = {
    know: [],
    dontKnow: [],
  };

  private correctAnswerSeries = 0;

  private bestCorrectAnswerSeries = 0;

  public statistic: IStatistic;

  public wordsForRounds: IWord[][] = [];

  public audioForRoundUrl = '';

  public answers: IWord[] = [];

  public userAnswer = '';

  public gameRound = 0;

  public maxRound = 3;

  public gameStep: gameRoundSteps = 0;

  private $player: HTMLAudioElement;

  @ViewChild('stream') set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.$player = ref.nativeElement;
  }

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.level = params.level;
      this.group = params.group;
      this.fromBook = !!params.fromBook;
      this.fromDictionary = !!params.fromDictionary;
    });

    this.getWordsForGame();
    this.store.dispatch(fetchAllUserWords());
    this.store.dispatch(fetchStatistic());
    this.store.select(selectUserWords).subscribe((words) => {
      this.userWords = words;
    });

    this.store.select(selectStatistic).subscribe((stat: IStatistic) => {
      this.statistic = stat;
    });
  }

  private getWordsForGame(): void {
    if (this.fromDictionary) {
      this.store
        .select(selectDifficultWordsData)
        .subscribe((words: IAggWordsPaginator) => {
          this.shuffleWords(words.aggWords);
        });
      return;
    }

    this.store.dispatch(
      fetchACallWordsWithLevels({
        level: (this.level - 1).toString(),
        group: (this.group - 1).toString(),
      }),
    );

    this.store.select(selectAudioCallWords).subscribe((words) => {
      if (!words) {
        return;
      }

      this.shuffleWords(words);
    });
  }

  private shuffleWords(words): void {
    this.answers = [];
    this.wordsForRounds = [];

    words.forEach((word) => {
      if (!this.wordsForRounds[0]) {
        this.wordsForRounds.push([]);
      }

      if (this.wordsForRounds[0].length <= 4) {
        this.wordsForRounds[0].push(word);
        return;
      }

      if (!this.wordsForRounds[1]) {
        this.wordsForRounds.push([]);
      }

      if (this.wordsForRounds[1].length <= 4) {
        this.wordsForRounds[1].push(word);
        return;
      }

      if (!this.wordsForRounds[2]) {
        this.wordsForRounds.push([]);
      }

      if (this.wordsForRounds[2].length <= 4) {
        this.wordsForRounds[2].push(word);
        return;
      }

      if (!this.wordsForRounds[3]) {
        this.wordsForRounds.push([]);
      }

      if (this.wordsForRounds[3].length <= 4) {
        this.wordsForRounds[3].push(word);
      }
    });

    this.wordsForRounds.forEach((roundWords) => {
      this.answers.push(roundWords[Math.floor(Math.random() * 4)]);
    });

    this.audioForRoundUrl = `${this.audioURL}${
      this.answers[this.gameRound].audio
    }`;

    this.maxRound = this.answers.length - 1;
  }

  ngOnDestroy(): void {
    this.store.dispatch(fetchACallWordsWithLevelsSuccess({ words: undefined }));
  }

  public checkAnswer(wordForCheck: string): void {
    if (this.gameStep !== 1) {
      return;
    }

    this.userAnswer = wordForCheck;

    if (wordForCheck === this.answers[this.gameRound].word) {
      this.correctAnswerSeries += 1;
      this.addToResults(
        'know',
        this.answers[this.gameRound].word,
        this.answers[this.gameRound].wordTranslate,
        this.answers[this.gameRound].transcription,
        this.answers[this.gameRound].audio,
      );

      this.sendWordResult('correctCount');
      this.gameStep = 2;
      return;
    }

    this.bestCorrectAnswerSeries = Math.max(
      this.bestCorrectAnswerSeries,
      this.correctAnswerSeries,
    );

    this.correctAnswerSeries = 0;

    this.addToResults(
      'dontKnow',
      this.answers[this.gameRound].word,
      this.answers[this.gameRound].wordTranslate,
      this.answers[this.gameRound].transcription,
      this.answers[this.gameRound].audio,
    );

    this.sendWordResult('incorrectCount');
    this.gameStep = 3;
  }

  public playAudio(): void {
    this.$player.play();
  }

  public handlerNextButton(): void {
    if (this.gameStep === 1) {
      this.bestCorrectAnswerSeries = Math.max(
        this.bestCorrectAnswerSeries,
        this.correctAnswerSeries,
      );

      this.correctAnswerSeries = 0;

      this.addToResults(
        'dontKnow',
        this.answers[this.gameRound].word,
        this.answers[this.gameRound].wordTranslate,
        this.answers[this.gameRound].transcription,
        this.answers[this.gameRound].audio,
      );

      this.sendWordResult('incorrectCount');
      this.gameStep = 3;
      this.userAnswer = '';
      return;
    }

    if (this.gameRound < this.maxRound) {
      this.gameRound += 1;
      this.gameStep = 0;
      this.userAnswer = '';
      this.audioForRoundUrl = `${this.audioURL}${
        this.answers[this.gameRound].audio
      }`;
      return;
    }

    this.userAnswer = '';
    this.sendStatistic();
    this.gameStep = 4;
  }

  private sendStatistic(): void {
    const statistic: IStatistic = {
      ...this.statistic,
      optional: {
        ...this.statistic.optional,
        audioCall: [
          ...this.statistic.optional.audioCall,
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

  private sendWordResult(result: 'correctCount' | 'incorrectCount'): void {
    this.userWord = this.userWords.find((word) => {
      return word.wordId === this.answers[this.gameRound].id;
    });

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
              game: AUDIO_CALL,
            },
          },
        }),
      );
    } else {
      this.store.dispatch(
        postUserWord({
          wordId: this.answers[this.gameRound].id,
          word: {
            optional: {
              [result]: 1,
              isDifficult: false,
              isDeleted: false,
              isStudy: true,
            },
          },
          gameName: AUDIO_CALL,
        }),
      );
    }
  }

  public audioEnded(): void {
    if (this.gameStep !== 0) {
      return;
    }
    this.gameStep = 1;
  }

  private addToResults(
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
}
