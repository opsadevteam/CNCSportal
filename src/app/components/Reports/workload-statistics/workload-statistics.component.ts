import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  IProductSummaryChartDto,
  IUserCountSummaryChartDto,
  IProductSummaryChartTotalDto,
  ITransactionPerDayDto,
  IDescriptionSummaryDto,
} from '../../../Models/interface/workload-statistics.model';
import { WorkloadStatisticsService } from '../../../services/workload-statistics.service';
import { CdkTable } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-workload-statistics',
  standalone: true,
  imports: [
    CommonModule,
    CanvasJSAngularChartsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './workload-statistics.component.html',
  styleUrls: ['./workload-statistics.component.css'],
})
export class WorkloadStatisticsComponent implements OnInit {
  productSummaryData: IProductSummaryChartDto | null = null;
  userCountData: IUserCountSummaryChartDto | null = null;
  productSummaryTotal: IProductSummaryChartTotalDto | null = null;
  transactionPerDay: ITransactionPerDayDto | null = null;
  descriptionData: IDescriptionSummaryDto | null = null;

  productChartOptions: any = {}; // For product summary chart
  userChartOptions: any = {}; // For user count chart
  transactionsChartOptions: any = {}; // For transactions per day chart
  productSummaryTotalOptions: any = {};
  transactionPerDayOptions: any = {};
  userCountTableDataOptions: any[] = []; // Table data
  descriptionsOptions: any[] = []; // Correctly typed as an array of IDescriptionSummary

  filteredDescriptionsOptions: any[] = []; // Filtered data based on date range
  startDate: Date | null = null;
  endDate: Date | null = null;
  searchTerm: any;

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
              type: 'pie',
              showInLegend: true,
              toolTipContent: '{label}: {y}%',
              dataPoints: this.productSummaryData?.dataPoints.map((item) => ({
                label: item.label,
                y: item.y,
              })),
            },
          ],
        };
      });

    // Fetch user count data for chart
    this.workloadStatisticsService.getUserCountChartData().subscribe((data) => {
      this.userCountData = data; // This is the original data with 'dataPoints'

      // Create chart options using dataPoints for the chart
      this.userChartOptions = {
        animationEnabled: true,
        title: {
          text: 'User Count Summary',
        },
        axisY: {
          title: 'User',
          reversed: false, // Reverses Y-axis for horizontal bars
        },
        data: [
          {
            type: 'bar',
            showInLegend: true,
            name: 'Call Count',
            dataPoints: this.userCountData?.dataPoints.map((item) => ({
              label: item.user,
              y: item.callCount,
            })),
          },
          {
            type: 'bar',
            showInLegend: true,
            name: 'Mail Count',
            dataPoints: this.userCountData?.dataPoints.map((item) => ({
              label: item.user,
              y: item.eMailCount,
            })),
          },
        ],
      };

      // Map user count data for the table (flat array)
      this.userCountTableDataOptions =
        this.userCountData?.dataPoints.map((item) => ({
          user: item.user,
          callCount: item.callCount,
          emailCount: item.eMailCount,
          qqCount: item.qqCount,
          total: item.callCount + item.eMailCount + item.qqCount, // Calculate total
        })) || [];
    });

    // Fetch product summary total data
    this.workloadStatisticsService
      .getProductSummaryChartTotal()
      .subscribe((data) => {
        this.productSummaryTotal = data;
        this.productSummaryTotalOptions = {
          dataPoints: this.productSummaryTotal?.dataPoints,
        };
      });

    // Fetch transactions per day data
    this.workloadStatisticsService.getTransactionPerDay().subscribe((data) => {
      this.transactionPerDay = data;

      // Create default data structure for all days from 1 to 31
      const defaultData = Array.from({ length: 31 }, (_, index) => ({
        day: index + 1,
        callTotal: 0,
        emailTotal: 0,
        qqCount: 0,
        total: 0,
      }));

      // Merge the fetched data with the default data
      const transactionData = defaultData.map((defaultDay) => {
        const foundData = this.transactionPerDay?.dataPoints?.find(
          (item) => item.day === defaultDay.day
        );
        return foundData ? foundData : defaultDay;
      });

      this.transactionPerDayOptions = {
        animationEnabled: true,
        title: {
          text: 'Transactions Per Day',
        },
        axisX: {
          title: 'Day of the Month',
          minimum: 0,
          maximum: 31,
          interval: 1,
        },
        axisY: {
          title: 'Transaction Count',
          includeZero: true,
        },
        data: [
          {
            type: 'line',
            showInLegend: true,
            name: 'Phone Calls',
            dataPoints: transactionData.map((item) => ({
              label: `Phone Calls`,
              y: item.callTotal,
            })),
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'Emails',
            dataPoints: transactionData.map((item) => ({
              label: `Emails`,
              y: item.emailTotal,
            })),
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'QQ Transactions',
            dataPoints: transactionData.map((item) => ({
              label: `QQ`,
              y: item.qqCount,
            })),
          },
          {
            type: 'line',

            name: 'Total',
            dataPoints: transactionData.map((item) => ({
              label: `Day ${item.day}`,
            })),
          },
        ],
      };
    });

    // Fetch Descriptions total data
    this.workloadStatisticsService
      .getDescriptionCount()
      .subscribe((data: IDescriptionSummaryDto) => {
        this.descriptionData = data; // Assuming 'data' has the data you need

        // Ensure that descriptionData and dataPoints are properly defined before mapping
        if (
          this.descriptionData?.dataPoints &&
          Array.isArray(this.descriptionData.dataPoints)
        ) {
          this.descriptionsOptions = this.descriptionData.dataPoints.map(
            (item) => ({
              description: item.description,
              callCount: item.callCount,
              emailCount: item.eMailCount,
              qqCount: item.qqCount,
              total: item.callCount + item.eMailCount + item.qqCount,
            })
          );
        } else {
          this.descriptionsOptions = [];
          // console.error('Data points missing or not an array:', this.descriptionData);
        }
      });
  }

  // Filter data based on the selected date range
  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      this.filteredDescriptionsOptions = this.descriptionsOptions.filter(
        (item) => item.date >= this.startDate! && item.date <= this.endDate!
      );
    } else {
      this.filteredDescriptionsOptions = [...this.descriptionsOptions]; // Reset to all data
    }
  }

  // Export data to Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
      this.filteredDescriptionsOptions
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Descriptions');
    XLSX.writeFile(workbook, 'Descriptions.xlsx');
  }

  searchData() {}
  filterBy(){
  
}
}



//     // placeholder for fetching transactions per day chart data (if available)
//     // fetch transactions per day data (if available)
//     this.workloadStatisticsService.gettransactionsperdaydata()
//       .subscribe((data) => {
//         this.transactionschartoptions = {
//           animationenabled: true,
//           title: {
//             text: "transactions per day"
//           },
//           data: [{
//             type: "line",
//             datapoints: data.map(item => ({
//               x: new date(item.date), // assuming item.date is in date format
//               y: item.transactioncount
//             }))
//           }]
//         };
//       });

//     // placeholder for fetching descriptions (if available)
//     // assuming descriptions have a structure that provides these fields
//     this.workloadStatisticsService.getdescriptionsummary()
//       .subscribe((data) => {
//         this.descriptions = data;
//       });
//   }
// }
