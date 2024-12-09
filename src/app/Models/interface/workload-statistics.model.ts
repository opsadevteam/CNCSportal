export interface IChartDataPoint {
  label: string;
  y: number;
}

export interface IProductSummaryChartDto {
  dataPoints: IChartDataPoint[];
}

export interface IChartDataTableTotalDataPoints {
  product: string;
  callTotal: number;
  emailTotal: number;
  qqCount: number;
  total: number;
}

export interface IProductSummaryChartTotalDto {
  dataPoints: IChartDataTableTotalDataPoints[];
}

export interface IUserChartDataPoint {
  user: string;
  callCount: number;
  eMailCount: number;
  qqCount: number;
  total: number;
}

export interface IUserCountSummaryChartDto {
  dataPoints: IUserChartDataPoint[];
}

export interface ITransactionPerDayDataPoint {
  day: number;
  callTotal: number;
  emailTotal: number;
  qqCount: number;
  total: number;
}

export interface ITransactionPerDayDto {
  dataPoints: ITransactionPerDayDataPoint[];
}

export interface IDescriptionSummary {
  description: string;
  callCount: number;
  eMailCount: number;
  qqCount: number;
  total: number;
}

export interface IDescriptionSummaryDto {
  dataPoints: IDescriptionSummary[]; 
}
