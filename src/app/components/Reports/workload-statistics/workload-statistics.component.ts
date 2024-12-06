import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  IProductSummaryChartDto,
  IUserCountSummaryChartDto,
} from '../../../Models/interface/workload-statistics.model';
import { WorkloadStatisticsService } from '../../../services/workload-statistics.service';

@Component({
  selector: 'app-workload-statistics',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './workload-statistics.component.html',
  styleUrls: ['./workload-statistics.component.css'],
})
export class WorkloadStatisticsComponent implements OnInit {
  productSummaryData: IProductSummaryChartDto | null = null;
  userCountData: IUserCountSummaryChartDto | null = null;
  productChartOptions: any = {}; // For product summary chart
  userChartOptions: any = {}; // For user count chart
  transactionsChartOptions: any = {}; // For transactions per day chart
  descriptions: any[] = []; // For storing descriptions data

  constructor(private workloadStatisticsService: WorkloadStatisticsService) {}

  ngOnInit(): void {
    // Fetch product summary chart data
    this.workloadStatisticsService
      .getProductSummaryChartData()
      .subscribe((data) => {
        this.productSummaryData = data;
        this.productChartOptions = {
          animationEnabled: true,
          title: {
            text: 'Product Summary',
          },
          data: [
            {
              type: 'pie', // Change the type to "pie" for a pie chart
              showInLegend: true,
              toolTipContent: '{label}: {y}%', // Display percentage in the tooltip
              dataPoints: this.productSummaryData?.dataPoints.map((item) => ({
                label: item.label,
                y: item.y,
              })),
            },
          ],
        };
      });

    this.workloadStatisticsService.getUserCountChartData().subscribe(
      (data) => {
        this.userCountData = data;
        this.userChartOptions = {
          animationEnabled: true,
          title: {
            text: 'User Count Summary',
          },
          data: [
            {
              type: 'stackedColumn',
              showInLegend: true,
              name: 'Call Count',
              dataPoints: this.userCountData?.dataPoints.map((item) => ({
                label: item.user,
                y: item.callCount,
              })),
            },
            {
              type: 'stackedColumn',
              showInLegend: true,
              name: 'Mail Count',
              dataPoints: this.userCountData?.dataPoints.map((item) => ({
                label: item.user,
                y: item.mailCount,
              })),
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching user count data:', error);
      }
    );

    // Placeholder for fetching transactions per day chart data (if available)
    // Fetch transactions per day data (if available)
    // this.workloadStatisticsService.getTransactionsPerDayData()
    //   .subscribe((data) => {
    //     this.transactionsChartOptions = {
    //       animationEnabled: true,
    //       title: {
    //         text: "Transactions Per Day"
    //       },
    //       data: [{
    //         type: "line",
    //         dataPoints: data.map(item => ({
    //           x: new Date(item.date), // Assuming item.date is in date format
    //           y: item.transactionCount
    //         }))
    //       }]
    //     };
    //   });

    // // Placeholder for fetching descriptions (if available)
    // // Assuming descriptions have a structure that provides these fields
    // this.workloadStatisticsService.getDescriptionSummary()
    //   .subscribe((data) => {
    //     this.descriptions = data;
    //   });
  }
}
