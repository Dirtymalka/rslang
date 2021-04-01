import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  fetchWordsWithLevels,
  fetchWordsWithLevelsSuccess,
} from '../../../redux/actions/hangman.actions';
import { selectHangmanWords } from '../../../redux/selectors/hangman.selectors';
import { IWord } from '../../shared/models/wordModels';
import {
  fetchAllUserWords,
  postUserWord,
  putUserWord,
} from '../../../redux/actions/words.actions';
import { selectUserWords } from '../../../redux/selectors/words.selectors';
import { ALPHABET } from '../../shared/constants/global.constants';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit, OnDestroy {
  IMAGES_GAL = [
    'assets/hangman/gal0.png',
    'assets/hangman/gal1.png',
    'assets/hangman/gal2.png',
    'assets/hangman/gal3.png',
    'assets/hangman/gal4.png',
    'assets/hangman/gal5.png',
    'assets/hangman/gal6.png',
  ];

  userWord;

  userWords;

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

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let level: number;
    let group: number;
    this.route.queryParams.subscribe((params) => {
      level = params.level;
      group = params.group;
    });
    this.store.dispatch(
      fetchWordsWithLevels({
        level: (level - 1).toString(),
        group: (group - 1).toString(),
      }),
    );
    this.store.dispatch(fetchAllUserWords());
    this.store.select(selectHangmanWords).subscribe((w) => {
      this.words =
        !!w && (group - (1 % 2) === 0 ? w.slice(0, 10) : w.slice(10, 20));
      this.word = this.words[this.indexWord];
    });
    this.store.select(selectUserWords).subscribe((words) => {
      this.userWords = words;
    });
    document.addEventListener('keydown', this.keyBoardHandler);
  }

  ngOnDestroy(): void {
    this.store.dispatch(fetchWordsWithLevelsSuccess({ words: [] }));
    document.removeEventListener('keydown', this.keyBoardHandler);
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
    if (this.indexWord < 9) {
      this.indexWord += 1;
      this.word = this.words[this.indexWord];
      this.resetState();
      return;
    }

    this.gameOver = true;
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
            },
          },
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
              isStudy: true,
            },
          },
        }),
      );
    }
  }

  dontKnowHandler(): void {
    this.roundOver = true;
    this.isSuccessResult = false;
    this.addToResults(
      'dontKnow',
      this.word.word,
      this.word.wordTranslate,
      this.word.transcription,
      this.word.audio,
    );

    this.sendWordResult('incorrectCount');
  }
}