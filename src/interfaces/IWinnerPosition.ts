export interface IWinningValue {
  type: string;
  value: number;
}

export interface IWinningNumber {
  type: string;
  number: number;
}

export interface ISumByType {
  type: string;
  sum: number;
}

export interface IWinnerPosition {
  totalSumWinningNumber: number;
  allWinningNumbers: IWinningNumber[];
  totalSumByTypes: ISumByType[];
}
