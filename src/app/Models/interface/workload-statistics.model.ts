export interface IChartDataPoint {
  label: string;
  y: number;
}

export interface IProductSummaryChartDto {
  dataPoints: IChartDataPoint[];
}

export interface IUserChartDataPoint {
  user: string;
  callCount: number;
  mailCount: number;
}

export interface IUserCountSummaryChartDto {
  dataPoints: IUserChartDataPoint[];
}
