export interface ISettings {
  wordsPerDay: number;
  optional: IOptional;
}

export interface IOptional {
  isShowWordTranslation: boolean;
  isShowWordSentence: boolean;
  isShowWordMeaning: boolean;
  isShowOptionalButtons: boolean;
}
