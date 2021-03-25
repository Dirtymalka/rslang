export interface ISettingsState {
  isShowWordTranslation: boolean;
  isShowWordSentence: boolean;
  isShowWordMeaning: boolean;
  isShowOptionalButtons: boolean;
}

export const initialSettingsState: ISettingsState = {
  isShowWordTranslation: true,
  isShowWordSentence: true,
  isShowWordMeaning: true,
  isShowOptionalButtons: true,
};
