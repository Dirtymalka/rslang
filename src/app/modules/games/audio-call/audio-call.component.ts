import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectWordsForGame,
  selectDifficultWordsData,
  selectUserWords,
} from '../../../redux/selectors/words.selectors';
import { MEDIA_PREFIX, AUDIO_CALL } from '../../../constants/global.constants';

import {
  IAggWordsPaginator,
  IWord,
  IUserWord,
} from '../../shared/models/word.models';

import {
  fetchStatistic,
  putStatistic,
} from '../../../redux/actions/statistics.actions';

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
import { cancelFullscreen } from '../../shared/utils/utils';
import { selectUserInfo } from '../../../redux/selectors/user.selectors';

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
  @ViewChild('audioCall') audioCall;

  subscription: Subscription = new Subscription();

  fullScreen = false;

  sourceWords: IWord[] = [];

  public answerObjForThisRound: IWord;

  level: number;

  group: number;

  fromBook: boolean;

  fromDictionary: boolean;

  private userWord: IUserWord;

  private userWords: IUserWord[] = [];

  audioPlayer = new Audio();

  private wordsResult = {
    know: [],
    dontKnow: [],
  };

  private correctAnswerSeries = 0;

  private bestCorrectAnswerSeries = 0;

  public statistic: IStatistic;

  public wordsForRounds: string[][] = [];

  public answers: string[] = [];

  public userAnswer = '';

  public gameRound = 0;

  public maxRound = 3;

  public gameStep: gameRoundSteps = 0;

  isAuthorized: boolean;

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

    this.subscription.add(
      this.store.select(selectUserInfo).subscribe((info) => {
        this.isAuthorized = info.isAuthorized;
      }),
    );

    this.audioPlayer.addEventListener('ended', () => {
      if (this.gameStep === 0) {
        this.gameStep = 1;
      }
    });

    if (this.isAuthorized) {
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
    }

    this.getWordsForGame();
    document.addEventListener('keydown', this.keyBoardHandler);
  }

  private getWordsForGame(): void {
    if (this.fromBook) {
      this.subscription.add(
        this.store.select(selectWordsForGame).subscribe((words: IWord[]) => {
          this.shuffleWords(words);
        }),
      );
      return;
    }

    if (this.fromDictionary) {
      this.store
        .select(selectDifficultWordsData)
        .subscribe((wordsObj: IAggWordsPaginator) => {
          if (!wordsObj) {
            return;
          }
          this.shuffleWords(wordsObj.aggWords);
        });
      return;
    }

    this.store.dispatch(
      fetchACallWordsWithLevels({
        level: (this.level - 1).toString(),
        group: (this.group - 1).toString(),
      }),
    );

    this.subscription.add(
      this.store.select(selectAudioCallWords).subscribe((wordsObj) => {
        if (!wordsObj) {
          return;
        }

        this.shuffleWords(wordsObj);
      }),
    );
  }

  private shuffleWords(wordsObj): void {
    this.maxRound = wordsObj.length - 1;
    this.sourceWords = wordsObj;
    const arrayWords: string[] = this.sourceWords.map((item) => item.word);
    this.answers = arrayWords.sort(() => Math.random() - 0.5);

    let i = 0;

    this.answers.forEach((item) => {
      this.wordsForRounds.push([item]);

      while (this.wordsForRounds[i].length < 5) {
        const word = this.getRandomWord(arrayWords);
        if (word !== item) {
          this.wordsForRounds[i].push(word);
        }
      }

      i += 1;
    });

    this.wordsForRounds.forEach((wordsRound) =>
      wordsRound.sort(() => Math.random() - 0.5),
    );

    this.wordsForRounds.forEach((roundWords) => {
      this.answers.push(roundWords[Math.floor(Math.random() * 4)]);
    });

    this.getObjAnswer();
    this.onAudioClickHandler(this.answerObjForThisRound.audio, false);
  }

  private getObjAnswer() {
    this.answerObjForThisRound = this.sourceWords.find(
      (wordObj) => wordObj.word === this.answers[this.gameRound],
    );
  }

  public getWordTranslate(word) {
    const { wordTranslate } = this.sourceWords.find(
      (wordObj) => wordObj.word === word,
    );

    return wordTranslate;
  }

  private getRandomWord(arrayWords) {
    return arrayWords[Math.round(Math.random() * (arrayWords.length - 1))];
  }

  ngOnDestroy(): void {
    this.store.dispatch(fetchACallWordsWithLevelsSuccess({ words: undefined }));
    this.audioPlayer.removeEventListener('ended', () => {
      if (this.gameStep === 0) {
        this.gameStep = 1;
      }
    });
    document.removeEventListener('keydown', this.keyBoardHandler);
    this.subscription.unsubscribe();
  }

  public checkAnswer(wordForCheck: string): void {
    if (this.gameStep !== 1) {
      return;
    }

    this.userAnswer = wordForCheck;

    if (wordForCheck === this.answerObjForThisRound.word) {
      this.correctAnswerSeries += 1;
      this.addToResults(
        'know',
        this.answerObjForThisRound.word,
        this.answerObjForThisRound.wordTranslate,
        this.answerObjForThisRound.transcription,
        this.answerObjForThisRound.audio,
      );

      if (this.isAuthorized) {
        this.sendWordResult('correctCount');
      }
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
      this.answerObjForThisRound.word,
      this.answerObjForThisRound.wordTranslate,
      this.answerObjForThisRound.transcription,
      this.answerObjForThisRound.audio,
    );

    if (this.isAuthorized) {
      this.sendWordResult('incorrectCount');
    }
    this.gameStep = 3;
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
        this.answerObjForThisRound.word,
        this.answerObjForThisRound.wordTranslate,
        this.answerObjForThisRound.transcription,
        this.answerObjForThisRound.audio,
      );

      if (this.isAuthorized) {
        this.sendWordResult('incorrectCount');
      }
      this.gameStep = 3;
      this.userAnswer = '';
      return;
    }

    if (this.gameRound < this.maxRound) {
      this.gameRound += 1;
      this.gameStep = 0;
      this.userAnswer = '';
      this.getObjAnswer();
      this.onAudioClickHandler(this.answerObjForThisRound.audio, false);
      return;
    }

    this.userAnswer = '';
    if (this.isAuthorized) {
      this.sendStatistic();
    }
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
      return word.wordId === this.answerObjForThisRound.id;
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
          wordId: this.answerObjForThisRound.id,
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

  keyBoardHandler = (event: KeyboardEvent): void => {
    if (this.gameStep === 0 || this.gameStep === 4) {
      return;
    }

    if (event.code === 'Enter') {
      this.handlerNextButton();
      return;
    }

    if (
      event.code === 'Digit1' ||
      event.code === 'Digit2' ||
      event.code === 'Digit3' ||
      event.code === 'Digit4' ||
      event.code === 'Digit5'
    ) {
      this.checkAnswer(
        this.wordsForRounds[this.gameRound][Number(event.key) - 1],
      );
    }
  };

  toggleFullScreen(): void {
    if (this.fullScreen) {
      cancelFullscreen();
      this.fullScreen = false;
    } else {
      this.audioCall.nativeElement.requestFullscreen();
      this.fullScreen = true;
    }
  }
}
