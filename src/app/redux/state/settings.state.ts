export interface ISettingsState {
  group: number;
  page: number;
  isShowWordTranslation: boolean;
  isShowDifficultWordButton: boolean;
  isShowDeleteWordButton: boolean;
}

export const initialSettingsState: ISettingsState = {
  group: 0,
  page: 0,
  isShowWordTranslation: true,
  isShowDifficultWordButton: true,
  isShowDeleteWordButton: true,
};
