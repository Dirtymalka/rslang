export interface ISettingsState {
  isShowWordTranslation: boolean;
  isWordsView: string;
  isCompactView: boolean;
  isShowDifficultWordButton: boolean;
  isShowDeleteWordButton: boolean;
}

export const initialSettingsState: ISettingsState = {
  isShowWordTranslation: true,
  isWordsView: 'param-0',
  isCompactView: false,
  isShowDifficultWordButton: false,
  isShowDeleteWordButton: false,
};
