export interface ISettings {
  wordsPerDay: number;
  optional: IOptional;
  isShowWordTranslation: boolean;
  isShowDifficultWordButton: boolean;
  isShowDeleteWordButton: boolean;
}

export interface IOptional {
  isShowWordTranslation: boolean;
  isShowWordSentence: boolean;
  isShowWordMeaning: boolean;
  isShowOptionalButtons: boolean;
}

export interface ISettingsModes {
  isShowWordTranslation?: boolean;
  isShowDifficultWordButton?: boolean;
  isShowDeleteWordButton?: boolean;
}
