import {createAction, props} from "@ngrx/store";
import {IAggWords, IUserWord, IWord, IWordPost} from "../../modules/shared/models/wordModels";

export const fetchAllWords = createAction(
  "[Words Words] Fetch Words"
)

export const fetchAllWordsSuccess = createAction(
  "[Words Words] Fetch Words Success",
  props<{ words: IWord[] }>()
)

export const fetchAllWordsFailure = createAction(
  "[Words Words] Fetch Words Failure",
)


export const fetchAllUserWords = createAction(
  "[Words UserWords] Fetch UserWords"
)

export const fetchAllUserWordsSuccess = createAction(
  "[Words UserWords] Fetch UserWords Success",
  props<{ userWords: IUserWord[] }>()
)

export const fetchAllUserWordsFailure = createAction(
  "[Words UserWords] Fetch UserWords Failure",
)

export const postUserWord = createAction(
  "[Words UserWords] Post Word",
  props<{ wordId: string, word: IWordPost }>()
)

export const postUserWordSuccess = createAction(
  "[Words UserWords] Post Word Success",
  props<{ wordsInfo: IWordPost }>()
)

export const postUserWordFailure = createAction(
  "[Words UserWords] Post Word Failure",
)

export const putUserWord = createAction(
  "[Words UserWords] Put Word",
  props<{ wordId: string, word: IWordPost }>()
)

export const putUserWordSuccess = createAction(
  "[Words UserWords] Put Word Success",
  props<{ wordId: string, word: IWordPost }>()
)

export const putUserWordFailure = createAction(
  "[Words UserWords] Put Word Failure",
)

export const deleteUserWord = createAction(
  "[Words UserWords] Delete Word",
  props<{ wordId: string }>()
)

export const deleteUserWordSuccess = createAction(
  "[Words UserWords] Delete Word Success",
)

export const deleteUserWordFailure = createAction(
  "[Words UserWords] Delete Word Failure",
)


export const fetchAggUserWords = createAction(
  "[Words UserWords] Fetch AggUserWords",
  props<{ group: any, filter: any, wordsPerPage?: number }>()
)

export const fetchAggUserWordsSuccess = createAction(
  "[Words UserWords] Fetch AggUserWords Success",
  props<{ aggWords: IAggWords }>()
)

export const fetchAggUserWordsFailure = createAction(
  "[Words UserWords] Fetch AggUserWords Failure",
)
