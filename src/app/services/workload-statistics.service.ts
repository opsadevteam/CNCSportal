import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';
import {
  IProductSummaryChartDto,
  IUserCountSummaryChartDto,
} from '../Models/interface/workload-statistics.model'; 

@Injectable({
  providedIn: 'root',
})
export class WorkloadStatisticsService {
  baseUrl =
    environment.ENVI_POINT === 'DEV' ? environment.DEV : environment.LOCAL;

  constructor(private http: HttpClient) {}

  // Method to get product summary chart data
  getProductSummaryChartData(): Observable<IProductSummaryChartDto> {
    return this.http.get<IProductSummaryChartDto>(
      this.baseUrl + Constant.API_WORKLOAD_STATISTICS_METHOD.GET_SUMMARY_RECORDS
    );
  }

  // Method to get user count chart data
  getUserCountChartData(): Observable<IUserCountSummaryChartDto> {
    return this.http.get<IUserCountSummaryChartDto>(
      this.baseUrl + Constant.API_WORKLOAD_STATISTICS_METHOD.GET_USER_COUNTS_RECORDS
    );
  }
}
