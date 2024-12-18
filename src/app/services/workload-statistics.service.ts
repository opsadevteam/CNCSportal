import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';
import {
  IProductSummaryChartDto,
  IProductSummaryChartTotalDto,
  IUserCountSummaryChartDto,
  ITransactionPerDayDto,
  IDescriptionSummaryDto,
} from '../Models/interface/workload-statistics.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkloadStatisticsService {
  baseUrl =
    environment.ENVI_POINT === 'DEV' ? environment.DEV : environment.LOCAL;

  constructor(private http: HttpClient) {}

  private buildDateRangeParams(startDate?: Date, endDate?: Date): HttpParams {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return params;
  }

  private logData(message: string, data: any): void {
    console.log(message, data);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

  private aggregateDataPoints(dataPoints: any[]): any[] {
    return dataPoints.reduce((acc, point) => {
      const existing = acc.find((p: { label: any }) => p.label === point.label);
      if (existing) {
        existing.value += point.value;
      } else {
        acc.push(point);
      }
      return acc;
    }, []);
  }

  getProductSummaryChartData(
    startDate: Date = new Date('1900-01-01'),
    endDate: Date = new Date()
  ): Observable<IProductSummaryChartDto> {
    const params = this.buildDateRangeParams(startDate, endDate);
    return this.http
      .get<IProductSummaryChartDto>(
        `${this.baseUrl}${Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS}/ProductSummary`,
        { params }
      )
      .pipe(
        tap((data) => this.logData('Product Summary Chart Data', data)),
        tap(
          (data) =>
            (data.dataPoints = this.aggregateDataPoints(data.dataPoints))
        ),
        catchError(this.handleError)
      );
  }

  getUserCountChartData(
    startDate: Date = new Date('1900-01-01'),
    endDate: Date = new Date()
  ): Observable<IUserCountSummaryChartDto> {
    const params = this.buildDateRangeParams(startDate, endDate);
    return this.http
      .get<IUserCountSummaryChartDto>(
        `${this.baseUrl}${Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS}/UserCount`,
        { params }
      )
      .pipe(
        tap((data) => this.logData('User Count Chart Data', data)),
        catchError(this.handleError)
      );
  }

  getProductSummaryChartTotal(
    startDate: Date = new Date('1900-01-01'),
    endDate: Date = new Date()
  ): Observable<IProductSummaryChartTotalDto> {
    const params = this.buildDateRangeParams(startDate, endDate);
    return this.http
      .get<IProductSummaryChartTotalDto>(
        `${this.baseUrl}${Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS}/ProductSummary/Total`,
        { params }
      )
      .pipe(
        tap((data) => this.logData('Product Summary Chart Total Data', data)),
        catchError(this.handleError)
      );
  }

  getTransactionPerDay(
    startDate: Date = new Date('1900-01-01'),
    endDate: Date = new Date()
  ): Observable<ITransactionPerDayDto> {
    const params = this.buildDateRangeParams(startDate, endDate);
    return this.http
      .get<ITransactionPerDayDto>(
        `${this.baseUrl}${Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS}/TransactionPerDay`,
        { params }
      )
      .pipe(
        tap((data) => this.logData('Transaction Per Day Data', data)),
        catchError(this.handleError)
      );
  }

  getDescriptionCount(
    startDate: Date = new Date('1900-01-01'),
    endDate: Date = new Date()
  ): Observable<IDescriptionSummaryDto> {
    const params = this.buildDateRangeParams(startDate, endDate);
    return this.http
      .get<IDescriptionSummaryDto>(
        `${this.baseUrl}${Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS}/Description-Table`,
        { params }
      )
      .pipe(
        tap((data) => this.logData('Description Count Data', data)),
        catchError(this.handleError)
      );
  }
}
