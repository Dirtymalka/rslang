export interface ISettingsState {
  // group: number;
  // page: number;
  pagination: IPagination;
  isShowWordTranslation: boolean;
  isShowDifficultWordButton: boolean;
  isShowDeleteWordButton: boolean;
}

export interface IPagination {
  group: number;
  page: number;
}

export const initialSettingsState: ISettingsState = {
  // group: 0,
  // page: 0,
  pagination: { group: 0, page: 0 },
  isShowWordTranslation: true,
  isShowDifficultWordButton: true,
  isShowDeleteWordButton: true,
};
