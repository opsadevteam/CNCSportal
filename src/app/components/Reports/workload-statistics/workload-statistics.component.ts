import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  IProductSummaryChartDto,
  IUserCountSummaryChartDto,
  IProductSummaryChartTotalDto,
  ITransactionPerDayDto,
  IDescriptionSummaryDto,
  DescriptionAggregation,
} from '../../../Models/interface/workload-statistics.model';
import { WorkloadStatisticsService } from '../../../services/workload-statistics.service';
import { CdkTable } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
    MatButtonModule,
    MatInputModule,
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
  aggregateTotals: any;

  constructor(private workloadStatisticsService: WorkloadStatisticsService) {}

  ngOnInit(): void {
    this.initializeProductSummaryChart();
    this.initializeUserCountChart();
    this.initializeTransactionperDay();
    this.initializeDescriptionSummary();
  }

  // Updated filterByDateRange to handle descriptions filtering
  filterByDateRange(): void {
    this.filterByProduct();
    this.filterByUserCount();
    this.filterByTransactionPerDay();
    this.filterByDescriptionCount();
  }

  // Product Summary Filter
  filterByProduct(): void {
    if (this.startDate && this.endDate) {
      // Ensure dates are properly formatted
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      this.workloadStatisticsService
        .getProductSummaryChartData(startDate, endDate)
        .subscribe((data) => {
          this.productSummaryData = data;

          // Update chart options
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
                dataPoints: data.dataPoints.map((item) => ({
                  label: item.label,
                  y: item.y,
                })),
              },
            ],
          };
        });

      // Fetch product summary total data
      this.workloadStatisticsService
        .getProductSummaryChartTotal(startDate, endDate)
        .subscribe((data) => {
          this.productSummaryTotal = data;

          // Aggregate by Product
          const aggregatedData = this.productSummaryTotal?.dataPoints.reduce(
            (acc, item) => {
              const existingProduct = acc.find(
                (p) => p.product === item.product
              );
              if (existingProduct) {
                existingProduct.total += item.total;
              } else {
                acc.push({ ...item });
              }
              return acc;
            },
            [] as typeof data.dataPoints
          );

          // Update table options
          this.productSummaryTotalOptions = {
            dataPoints: aggregatedData,
          };

          // console.log('Aggregated Product Summary Table Data:', aggregatedData);
        });
    } else {
      console.warn('Start Date or End Date not selected.');
    }
  }

  // Filter by User Count
  filterByUserCount(): void {
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      this.workloadStatisticsService
        .getUserCountChartData(startDate, endDate)
        .subscribe((data) => {
          // Consolidate duplicate users
          const consolidatedData = this.consolidateUserCounts(data.dataPoints);

          // Sort data alphabetically by user
          consolidatedData.sort((a, b) => a.label.localeCompare(b.label));

          // Update chart options
          this.userChartOptions = this.getUserChartOptions(consolidatedData);

          // Update table data
          this.userCountTableDataOptions = consolidatedData.map((item) => ({
            user: item.label,
            callCount: item.callCount,
            emailCount: item.eMailCount,
            qqCount: item.qqCount || 0,
            total: item.callCount + item.eMailCount + (item.qqCount || 0),
          }));
        });
    } else {
      console.warn('Start Date or End Date not selected.');
    }
  }

  // Filter by Transaction Per Day
  filterByTransactionPerDay(): void {
    // Ensure that the start and end date are selected before filtering
    if (!this.startDate || !this.endDate) {
      console.warn('Start Date or End Date not selected.');
      return;
    }

    // Convert start and end dates to Date objects
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Check if transaction data is available
    if (this.transactionPerDay && this.transactionPerDay.dataPoints) {
      // Filter the transaction data based on the selected date range
      const filteredData = this.transactionPerDay.dataPoints.filter((item) => {
        const itemDate = item.takeOffDate
          ? new Date(item.takeOffDate)
          : new Date();
        return itemDate >= start && itemDate <= end;
      });

      // If filtered data is not empty, update the chart
      if (filteredData.length > 0) {
        this.updateChart(filteredData);
      } else {
        console.warn('No data available within the selected date range.');
        this.updateChart([]); // Update chart with empty data if no results found
      }
    } else {
      console.error('Transaction data is unavailable.');
    }
  }

  updateChart(filteredData: any[]): void {
    // Code to update the chart with the filtered data
    this.transactionPerDayOptions = {
      animationEnabled: true,
      title: {
        text: 'Transaction Per Day',
      },
      data: [
        {
          type: 'column',
          dataPoints: filteredData.map((item) => ({
            label: item.day.toString(),
            y: item.total,
          })),
        },
      ],
    };
  }

  //Filter by Description Count
  filterByDescriptionCount(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Ensure the start and end dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid date range selected.');
        return;
      }

      // Filter the descriptions based on the selected date range
      this.filteredDescriptionsOptions = this.descriptionsOptions.filter(
        (item) => {
          const itemDate = item.takeOffDate ? new Date(item.takeOffDate) : null;

          // Only include items that have a valid takeOffDate within the date range
          if (itemDate) {
            return itemDate >= start && itemDate <= end;
          }

          return false; // Skip items without a valid takeOffDate
        }
      );

      //console.log('Filtered Descriptions:', this.filteredDescriptionsOptions); // Log the filtered results

      // Optionally check if filtered results are empty
      if (this.filteredDescriptionsOptions.length === 0) {
        console.warn('No descriptions match the selected date range.');
      }
    } else {
      console.warn('Start Date or End Date not selected.');
    }
  }

  // Fetch and Initialize Product Summary
  initializeProductSummaryChart(): void {
    this.workloadStatisticsService
      .getProductSummaryChartData()
      .subscribe((data) => {
        this.productSummaryData = data;

        // Initialize the chart
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
              dataPoints: data.dataPoints.map((item) => ({
                label: item.label,
                y: item.y,
              })),
            },
          ],
        };
      });

    // Deploy Table
    // Fetch product summary total data
    this.workloadStatisticsService
      .getProductSummaryChartTotal()
      .subscribe((data) => {
        this.productSummaryTotal = data;

        // Aggregate by Product
        const aggregatedData = this.productSummaryTotal?.dataPoints.reduce(
          (acc, item) => {
            const existingProduct = acc.find((p) => p.product === item.product);
            if (existingProduct) {
              existingProduct.total += item.total;
            } else {
              acc.push({ ...item });
            }
            return acc;
          },
          [] as typeof data.dataPoints
        );

        // Update chart options
        this.productSummaryTotalOptions = {
          dataPoints: aggregatedData?.map((item) => ({
            ...item,
            takeOffDate: item.takeOffDate, // Add takeOffDate if needed
          })),
        };
      });
  }

  // Fetch and Initialize User Count
  initializeUserCountChart(): void {
    this.workloadStatisticsService.getUserCountChartData().subscribe((data) => {
      // Consolidate duplicate users
      const consolidatedData = this.consolidateUserCounts(data.dataPoints);

      // Sort data alphabetically by user
      consolidatedData.sort((a, b) => a.label.localeCompare(b.label));

      // Update chart options
      this.userChartOptions = this.getUserChartOptions(consolidatedData);

      // Map user count data for the table
      this.userCountTableDataOptions = consolidatedData.map((item) => ({
        user: item.label,
        callCount: item.callCount,
        emailCount: item.eMailCount,
        qqCount: item.qqCount || 0,
        total: item.callCount + item.eMailCount + (item.qqCount || 0),
      }));
    });
  }

  // Fetch and Initialize Transaction Per Day
  initializeTransactionperDay(): void {
    this.workloadStatisticsService.getTransactionPerDay().subscribe((data) => {
      this.transactionPerDay = data;

      // Create default data structure for all days from 1 to 31
      const defaultData = Array.from({ length: 31 }, (_, index) => ({
        day: index + 1,
        callTotal: 0,
        emailTotal: 0,
        qqCount: 0,
        total: 0,
        takeOffDate: null, // Default null
      }));

      // Merge the fetched data with the default data
      const transactionData = defaultData.map((defaultDay) => {
        const foundData = this.transactionPerDay?.dataPoints?.find(
          (item) => item.day === defaultDay.day
        );
        return foundData
          ? { ...foundData, takeOffDate: foundData.takeOffDate }
          : defaultDay;
      });

      // Use the shared method for setting the chart options
      this.setChartOptions(transactionData);
    });
  }

  // Fetch and Initialize Description Summary
  initializeDescriptionSummary(): void {
    this.workloadStatisticsService
      .getDescriptionCount()
      .subscribe((data: IDescriptionSummaryDto) => {
        this.descriptionData = data;
        console.log('Description Data:', this.descriptionData?.dataPoints); // Log dataPoints to check if takeOffDate is there

        if (
          this.descriptionData?.dataPoints &&
          Array.isArray(this.descriptionData.dataPoints)
        ) {
          // First, map the data as before
          const mappedData = this.descriptionData.dataPoints.map((item) => {
            console.log('Mapping Description Data:', item); // Log each item for verification

            // Ensure takeOffDate is in a valid date format (if it exists)
            const itemTakeOffDate = item.takeOffDate
              ? new Date(item.takeOffDate)
              : null;

            return {
              description: item.description,
              callCount: item.callCount,
              emailCount: item.eMailCount,
              qqCount: item.qqCount,
              total: item.callCount + item.eMailCount + item.qqCount,
              takeOffDate: itemTakeOffDate, // Add takeOffDate
            };
          });

          // Aggregate by Product
          const aggregatedData = this.descriptionData?.dataPoints.reduce(
            (acc, item) => {
              const existingProduct = acc.find(
                (p) => p.description === item.description
              );
              if (existingProduct) {
                existingProduct.total += item.total;
              } else {
                acc.push({ ...item });
              }
              return acc;
            },
            [] as typeof data.dataPoints
          );

          // Now aggregate by description
          this.descriptionsOptions = Object.values(
            mappedData.reduce<Record<string, DescriptionAggregation>>(
              (acc, item) => {
                if (!acc[item.description]) {
                  acc[item.description] = {
                    description: item.description,
                    callCount: 0,
                    emailCount: 0,
                    qqCount: 0,
                    total: 0,
                    takeOffDate: item.takeOffDate, // Assuming you want the first takeOffDate for each description
                  };
                }

                // Aggregate the counts for each description
                acc[item.description].callCount += item.callCount;
                acc[item.description].emailCount += item.emailCount;
                acc[item.description].qqCount += item.qqCount;
                acc[item.description].total += item.total;

                return acc;
              },
              {}
            )
          );

          console.log('Aggregated Description Data:', this.descriptionsOptions); // Log aggregated data by description
        } else {
          this.descriptionsOptions = [];
          console.error(
            'Data points missing or not an array:',
            this.descriptionData
          );
        }
      });
  }

  private consolidateUserCounts(dataPoints: any[]): any[] {
    const userMap = new Map();

    dataPoints.forEach((item) => {
      if (userMap.has(item.user)) {
        const existing = userMap.get(item.user);
        existing.callCount += item.callCount;
        existing.eMailCount += item.eMailCount;
        existing.qqCount = (existing.qqCount || 0) + (item.qqCount || 0);
      } else {
        userMap.set(item.user, {
          label: item.user,
          callCount: item.callCount,
          eMailCount: item.eMailCount,
          qqCount: item.qqCount || 0,
        });
      }
    });

    return Array.from(userMap.values());
  }

  private getUserChartOptions(dataPoints: any[]): any {
    return {
      animationEnabled: true,
      title: { text: 'User Count Summary' },
      axisX: {
        title: 'Count',
        interval: 1, // Force X-axis to show whole numbers
      },
      axisY: {
        title: 'Users',
        reversed: false, // Bars grow upward
      },
      data: [
        {
          type: 'bar', // Horizontal bars
          showInLegend: true,
          name: 'Call Count',
          dataPoints: dataPoints.map((item) => ({
            label: item.label,
            y: item.callCount,
          })),
        },
        {
          type: 'bar',
          showInLegend: true,
          name: 'Mail Count',
          dataPoints: dataPoints.map((item) => ({
            label: item.label,
            y: item.eMailCount,
          })),
        },
      ],
    };
  }

  // Common method for setting up the chart options
  setChartOptions(data: any[]): void {
    const defaultData = Array.from({ length: 31 }, (_, index) => ({
      day: index + 1,
      callTotal: 0,
      emailTotal: 0,
      qqCount: 0,
      total: 0,
      takeOffDate: null, // Default null
    }));
    const transactionData = defaultData.map((defaultDay) => {
      const foundData = this.transactionPerDay?.dataPoints?.find(
        (item) => item.day === defaultDay.day
      );
      return foundData
        ? { ...foundData, takeOffDate: foundData.takeOffDate }
        : defaultDay;
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
          type: 'spline', // Curve line for Phone Calls
          showInLegend: true,
          name: 'Phone Calls',
          dataPoints: data.map((item) => ({
            label: `${item.day}`, // Correct string interpolation
            y: item.callTotal,
            takeOffDate: item.takeOffDate,
          })),
        },
        {
          type: 'spline', // Curve line for Emails
          showInLegend: true,
          name: 'Emails',
          dataPoints: data.map((item) => ({
            label: `${item.day}`, // Correct string interpolation
            y: item.emailTotal,
            takeOffDate: item.takeOffDate,
          })),
        },
      ],
      toolTip: {
        contentFormatter: function (e: any) {
          // Corrected 'contentFormatre' to 'contentFormatter'
          const data = e.entries[0].dataPoint;
          const day = data.label.replace('Day ', '');
          const callTotal =
            transactionData.find((item) => item.day === parseInt(day))
              ?.callTotal || 0;
          const emailTotal =
            transactionData.find((item) => item.day === parseInt(day))
              ?.emailTotal || 0;
          return `<b>Day ${day}</b><br/>Total Calls: ${callTotal}<br/>Total Emails: ${emailTotal}`;
        },
      },
    };
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
}
