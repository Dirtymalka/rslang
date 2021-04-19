export interface ISettingsState {
  pagination: IPagination;
  isShowWordTranslation: boolean;
  isShowDifficultWordButton: boolean;
  isShowDeleteWordButton: boolean;
}

export interface IPagination {
  group: number;
  page: number;
  indexFrom: number;
  indexTo: number;
}

export const initialSettingsState: ISettingsState = {
  pagination: { group: 0, page: 0, indexFrom: 0, indexTo: 20 },
  isShowWordTranslation: true,
  isShowDifficultWordButton: true,
  isShowDeleteWordButton: true,
};
