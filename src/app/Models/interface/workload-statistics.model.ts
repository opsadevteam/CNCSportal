export interface IChartDataPoint {
  label: string;
  y: number;
  takeOffDate: Date | null;
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
  takeOffDate: Date | null;
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
  takeOffDate: Date | null;
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
  takeOffDate: Date | null;
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
  takeOffDate: Date | null;
}

export interface IDescriptionSummaryDto {
  dataPoints: IDescriptionSummary[]; 
}

export interface DescriptionAggregation {
  description: string;
  callCount: number;
  emailCount: number;
  qqCount: number;
  total: number;
  takeOffDate: Date | null; 
}
