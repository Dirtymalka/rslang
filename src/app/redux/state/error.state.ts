export interface IError {
  errorMessage: string;
  errorCode?: number;
}

export const initialErrorState: IError = {
  errorMessage: '',
  errorCode: null,
};
