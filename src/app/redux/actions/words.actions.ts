import { createAction, props } from '@ngrx/store';
import {
  IUserWord,
  IWord,
  IWordPost,
} from '../../modules/shared/models/word.models';

export const fetchAllWords = createAction('[Words Words] Fetch Words');

export const fetchAllWordsSuccess = createAction(
  '[Words Words] Fetch Words Success',
  props<{ words: IWord[] }>(),
);

export const fetchWordsForGame = createAction(
  '[Words WordsForGames] Fetch Words For Games',
  props<{ words: IWord[] }>(),
);

export const fetchAllWordsFailure = createAction(
  '[Words Words] Fetch Words Failure',
);

export const fetchAllUserWords = createAction(
  '[Words UserWords] Fetch UserWords',
);

export const fetchAllUserWordsSuccess = createAction(
  '[Words UserWords] Fetch UserWords Success',
  props<{ userWords: IUserWord[] }>(),
);

export const fetchAllUserWordsFailure = createAction(
  '[Words UserWords] Fetch UserWords Failure',
);

export const postUserWord = createAction(
  '[Words UserWords] Post Word',
  props<{
    wordId: string;
    word: IWordPost;
    gameName?: 'hangman' | 'audioCall' | 'savanna' | 'sprint';
  }>(),
);

export const postUserWordSuccess = createAction(
  '[Words UserWords] Post Word Success',
  props<{ wordsInfo: IWordPost }>(),
);

export const postUserWordFailure = createAction(
  '[Words UserWords] Post Word Failure',
);

export const putUserWord = createAction(
  '[Words UserWords] Put Word',
  props<{
    wordId: string;
    word: IWordPost;
    gameName?: 'hangman' | 'audioCall' | 'savanna' | 'sprint';
  }>(),
);

export const putUserWordSuccess = createAction(
  '[Words UserWords] Put Word Success',
  props<{ wordId: string; word: IWordPost }>(),
);

export const putUserWordFailure = createAction(
  '[Words UserWords] Put Word Failure',
);

export const deleteUserWord = createAction(
  '[Words UserWords] Delete Word',
  props<{ wordId: string }>(),
);

export const deleteUserWordSuccess = createAction(
  '[Words UserWords] Delete Word Success',
);

export const deleteUserWordFailure = createAction(
  '[Words UserWords] Delete Word Failure',
);

export const fetchAggUserWords = createAction(
  '[Words UserWords] Fetch AggUserWords',
  props<{ group: string | number; filter: any; wordsPerPage?: number }>(),
);

export const fetchAggUserWordsSuccess = createAction(
  '[Words UserWords] Fetch AggUserWords Success',
  props<{ aggWords: any }>(),
);

export const fetchAggUserWordsFailure = createAction(
  '[Words UserWords] Fetch AggUserWords Failure',
);

export const selectWord = createAction(
  '[Words SelectedWords] Select Word',
  // (selectedWords: IWord[]) => selectedWords,
  props<{ words: IWord[] | [] }>(),
);

export const updateSelectedWords = createAction(
  '[Words SelectedWords] Deselect Word',
  // (selectedWords: IWord[]) => selectedWords,
  props<{ words: IWord[] | [] }>(),
);

export const fetchDifficultWords = createAction(
  '[Words UserWords] Fetch DifficultWords',
  props<{
    group: string | number;
    filter: any;
    wordsPerPage: number;
    page: number;
  }>(),
);

export const fetchDifficultWordsSuccess = createAction(
  '[Words UserWords] Fetch DifficultWords Success',
  props<{ difficultWordsData: any }>(),
);

export const fetchDifficultWordsFailure = createAction(
  '[Words UserWords] Fetch DifficultWords Failure',
);
