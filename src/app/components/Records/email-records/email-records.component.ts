import {
  Component,
  ViewChild,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  viewChild,
  inject,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { DialogboxComponent } from '../../Dialogbox/logs-dialog/dialogbox.component';
import { HttpClient } from '@angular/common/http';
import { IEmailRecord } from '../../../Models/interface/email-record.model';
import { TransactionService } from '../../../services/transaction.service';
import { ProductVendorService } from '../../../services/product-vendor.service';
import { DescriptionService } from '../../../services/description.service';
import { UserAccountService } from '../../../services/user-account.service';
import { DeleteDialogComponent } from '../../Dialogbox/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-phone-records',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatCardHeader,
    MatCardModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './email-records.component.html',
  styleUrls: ['./email-records.component.css'],
})
export class EmailRecordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  searchTerm: string = '';
  isSearchApplied: boolean = false;
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  filterBy: string = 'id';
  emailStringParams: string = 'Email';
  records: IEmailRecord[] = [];
  filteredRecords: IEmailRecord[] = [];
  displayedColumns: string[] = [
    'id',
    'status',
    'transactionId',
    'customerId',
    'repliedBy',
    'pickUpDate',
    'takeOffDate',
    'dateAdded',
    'productVendorId',
    'descriptionId',
    'actionColumn',
  ];

  dataSource = new MatTableDataSource<IEmailRecord>();

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly transactionService: TransactionService
  ) {}

  /**
   * Lifecycle hook that initializes the component by loading transaction data.
   */
  ngOnInit() {
    this.fetchRecords();
  }

  /**
   * Lifecycle hook that sets the paginator for the table after the view initializes.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Loads the list of users from the backend and populates the table data source.
   */
  fetchRecords(): void {

    // Fetch data from the service
    this.transactionService.fetchRecords().subscribe({
      next: (records) => {
        // Filter records: Exclude isDeleted = true and transactionType !== 'Email'
        const filteredRecords = records.filter(
          (record) => !record.isDeleted && record.transactionType === 'Email'
        );

        // Store both raw and filtered records
        this.records = records;
        this.filteredRecords = filteredRecords;

        // If no search term and date filters are set, just reset the data
        if (!this.searchTerm && !this.dateFrom && !this.dateTo) {
          // console.log('No filters applied. Displaying all records.');
          this.dataSource.data = [...filteredRecords]; // Display all records without further filtering
        } else {
          // Apply search filters and date range filters
          //console.log('Applying filters to records...');
          this.filterSearch(); // Apply filters based on search term and date range
        }

        // Reset pagination and sorting with updated data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // Recalculate pagination and apply pagination to the filtered data
        this.applyPagination();
      },
      error: (err) => {
        //console.error('Failed to fetch records:', err);
      },
    });
  }

  filterSearch(): void {
    // If searchTerm is empty and no date filters are set, reset to initial state
    if (!this.searchTerm && !this.dateFrom && !this.dateTo) {
      this.filteredRecords = [...this.records]; // Reset filtered records to all records
      this.dataSource.data = this.filteredRecords; // Update the dataSource with all records
      this.totalItems = this.filteredRecords.length; // Update total items count
      this.applyPagination(); // Reapply pagination
      return; // Exit method as there is no need for filtering
    }

    // Proceed with filtering when there are active inputs
    this.filteredRecords = this.records.filter((record) => {
      // Normalize search term
      const term = this.searchTerm ? this.searchTerm.toLowerCase() : '';

      // Check if record matches the search term
      const matchesSearch =
        record.transactionId.toLowerCase().includes(term) ||
        record.repliedBy.toLowerCase().includes(term) ||
        record.customerId.toLowerCase().includes(term) ||
        record.status.toLowerCase().includes(term);

      // Parse dates for date filtering
      const dateAdded = new Date(record.dateAdded);
      const from = this.dateFrom ? new Date(this.dateFrom) : null;
      const to = this.dateTo ? new Date(this.dateTo) : null;

      // Adjust 'to' date to the end of the day
      if (to) to.setHours(23, 59, 59, 999);

      // Check if record matches the date range
      const matchesDate =
        (!from || dateAdded >= from) && (!to || dateAdded <= to);

      // Combine both filters
      return matchesSearch && matchesDate;
    });

    // Update data source with filtered records
    this.dataSource.data = this.filteredRecords;
    this.totalItems = this.filteredRecords.length; // Update total items count
    this.applyPagination(); // Reapply pagination
    this.cdRef.detectChanges(); // Notify Angular to update the view
  }

  applyFilter(): void {
    // Check if search term and date filters are empty
    if (!this.searchTerm && !this.dateFrom && !this.dateTo) {
      // If filters are empty, just reset the data to the initial state
      if (this.filteredRecords.length !== this.records.length) {
        // console.log(
        //   'Search term and date filters are empty. Resetting data...'
        // );
        this.fetchRecords(); // Reset data by re-fetching records
      }
      return; // Exit the method as no further filtering is needed
    }

    // Apply combined search and date filters only if there is an active search term or date filters
    if (this.searchTerm || this.dateFrom || this.dateTo) {
      //  console.log('Applying filters with active inputs...');
      this.filterSearch(); // Apply the actual search filter

      // Update pagination with the filtered data
      this.applyPagination();
    }

    this.isSearchApplied = true; // Set flag indicating search is applied
  }

  applyPagination(): void {
    // Calculate start and end indices for pagination
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Update dataSource with paginated data
    this.dataSource.data = this.filteredRecords.slice(startIndex, endIndex);

    // Notify Angular to update the view
    this.cdRef.detectChanges();
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    // Apply pagination based on the new page index and page size
    this.applyPagination();
  }

  resetFilters() {
    this.searchTerm = '';
    this.dateFrom = null;
    this.dateTo = null;

    // Apply filters again and reset pagination
    this.applyFilter();
  }

  // showLogs(emailId: string): void {

  // const dialogRef = this.dialog.open(DialogboxComponent, {
  //   data: { emailId }, // Pass the emailId (string) to the dialog
  // });

  // console.log('Email ID passed to dialog:', emailId); // Ensure this logs the string emailId

  // // Optional: Handle the dialog result or closure if needed
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('Dialog closed', result);
  // });

  //   // const logData = [
  //   //   {

  //   //   },
  //   // ];

  //   // this.dialog.open(DialogboxComponent, {
  //   //   width: '90vw',
  //   //   maxWidth: '100vw',
  //   //   data: {
  //   //     logs: logData,
  //   //     emailStringParams: this.emailStringParams,
  //   //   },
  //   // });
  // }

  showLogs(emailId: string): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '90vw',
      maxWidth: '100vw',
      data: {
        emailId: emailId,
        emailStringParams: this.emailStringParams,
      },
    });
  }

  showEdit(action: string) {}

  deleteRecord(id: number): void {
    // Open the delete confirmation dialog
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id }, // Pass the ID to the dialog
    });

    // Listen for the dialog closure event to confirm deletion
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Proceed to delete the record if confirmed
        this.transactionService.deleteUser(id).subscribe({
          next: () => {
            // console.log(`Record with ID ${id} deleted successfully.`);
            this.fetchRecords(); // Refresh the records after deletion
          },
          error: (err) => {
            // console.error(`Failed to delete record with ID ${id}:`, err);
          },
        });
      }
    });
  }

  resolveCellValue(column: string, element: any): string {
    switch (column) {
      case 'status':
        return `<span class="badge status-${element.status.toLowerCase()}">${
          element.status
        }</span>`;
      case 'receivedDate':
      case 'sendingDate':
      case 'dateAdded':
        return new Date(element[column]).toLocaleDateString();
      default:
        return element[column] || '-';
    }
  }
}
