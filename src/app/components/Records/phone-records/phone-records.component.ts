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
import { IPhoneRecord } from '../../../Models/interface/phone-record.model';
import { ITransactionLog } from '../../../Models/interface/transaction-log.model';
import { ProductVendorService } from '../../../services/product-vendor.service';
import { DescriptionService } from '../../../services/description.service';
import { UserAccountService } from '../../../services/user-account.service';
import { DeleteDialogComponent } from '../../Dialogbox/delete-dialog/delete-dialog.component';
import { PhoneRecordsService } from '../../../services/phone-records.service';
import { AddUserDialogComponent } from '../../Dialogbox/add-user-dialog/add-user-dialog.component';
import { PhoneEntryFormComponent } from '../../EntryForms/phone-entry-form/phone-entry-form.component';
import { EmailEntryFormComponent } from '../../EntryForms/email-entry-form/email-entry-form.component';
import { TransactionLogsService } from '../../../services/transaction-logs.service';

interface Record {
  id: string;
  status: string;
  emailId: string;
  customerId: string;
  repliedBy: string;
  receivedDate: Date;
  sendingDate: Date;
  vendor: string;
  description: string;
  dateAdded: Date;
}

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
    DialogboxComponent,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './phone-records.component.html',
  styleUrls: ['./phone-records.component.css'],
})
export class PhoneRecordsComponent implements OnInit {
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
  emailStringParams: string = 'Phone';
  records: IPhoneRecord[] = [];
  filteredRecords: IPhoneRecord[] = [];
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
    'remark',
    'actionColumn',
  ];

  dataSource = new MatTableDataSource<IPhoneRecord>();

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly phonerecordsService: PhoneRecordsService,
    private readonly transactionlogsService: TransactionLogsService
  ) {}

  /**
   * Lifecycle hook that initializes the component by loading transaction data.
   */
  ngOnInit() {
    this.fetchRecords();
    const today = new Date();
    this.dateFrom = today; // Set to today's date
    this.dateTo = today; // Set to today's date
  }

  /**
   * Lifecycle hook that sets the paginator for the table after the view initializes.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Loads the list of users from the backend and populates the table data source.
   */
  fetchRecords(): void {
    this.phonerecordsService.fetchRecords().subscribe({
      next: (records) => {
        const filteredRecords = records
          .filter(
            (record) => !record.isDeleted && record.transactionType === 'Phone'
          )
          .sort((a, b) => Number(b.id) - Number(a.id)); // Sort by ID descending

        this.records = records;
        this.filteredRecords = filteredRecords;
        this.dataSource.data = [...filteredRecords];

        //If no search term and date filters are set, just reset the data
        if (!this.searchTerm) {
          this.dataSource.data = [...filteredRecords]; // Display all records w/o further filtering
        } else {
          this.filterSearch();
        }

        // Set default sorting explicitly
        this.sort.sort({
          id: 'id',
          start: 'desc',
          disableClear: true,
        });

        // Reapply pagination
        this.applyPagination();
      },
      error: (err) => {
        // console.error('Failed to fetch records:', err);
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
      record.status.toLowerCase().includes(term) ||
      record.productVendorId?.toLowerCase().includes(term) ||
      record.descriptionId?.toLowerCase().includes(term);
      record.remark.toLowerCase().includes(term);

      // Parse dates for date filtering
      const pickupDate = new Date(record.pickUpDate);
      const from = this.dateFrom ? new Date(this.dateFrom) : null;
      const to = this.dateTo ? new Date(this.dateTo) : null;

      // Adjust 'to' date to the end of the day
      if (to) to.setHours(23, 59, 59, 999);

      // Check if record matches the date range
      const matchesDate =
        (!from || pickupDate >= from) && (!to || pickupDate <= to);

      // Apply isDeleted filter in combination with other filters
      const matchesIsDeleted = !record.isDeleted;

      // Apply Email filter in combination with other filters
      const matchesTransactionType = record.transactionType === 'Phone';

      // Combine all filters
      return (
        matchesSearch &&
        matchesDate &&
        matchesIsDeleted &&
        matchesTransactionType
      );
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
      // If filters are empty, reset the data to the initial state by re-fetching records
      if (this.filteredRecords.length !== this.records.length) {
        // console.log('Search term and date filters are empty. Resetting data...');
        this.fetchRecords(); // Re-fetch data only if there was no prior filtering
      }
      return; // Exit the method as no further filtering is needed
    }

    // If there are active search or date filters, apply those filters
    // console.log('Applying filters with active inputs...');
    this.filterSearch(); // Apply the actual search filter

    // Reapply pagination after applying filters
    this.applyPagination();
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

  showLogs(phoneId: number): void {
    // Fetch transaction logs for the given phoneId
    this.transactionlogsService
      .getTransactionLogsByTransactionId(phoneId.toString())
      .subscribe(
        (logs: ITransactionLog[]) => {
          // Once logs are fetched, open the dialog and pass the logs as data
          const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '90vw',
            maxWidth: '100vw',
            data: {
              emailId: phoneId,
              emailStringParams: this.emailStringParams,
              transactionLogs: logs, // Passing the fetched transaction logs
            },
          });

          // Optionally, you can subscribe to the dialog's afterClosed() event
          dialogRef.afterClosed().subscribe((result) => {
            // Handle any logic after the dialog is closed, if necessary
            // console.log('The dialog was closed', result);
          });
        },
        (error) => {
         // console.error('Error fetching transaction logs:', error);
          // Handle error if necessary (show error messages, etc.)
        }
      );
  }

  deleteRecord(id: number): void {
    // Open the delete confirmation dialog
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id }, // Pass the ID to the dialog
    });

    // Listen for the dialog closure event to confirm deletion
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Proceed to delete the record if confirmed
        this.phonerecordsService.deleteUser(id).subscribe({
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

  showEdit(id?: number, isEdit: boolean = true): void {
    const dialogRef = this.dialog.open(PhoneEntryFormComponent, {
      width: '900px',
      height: '90',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { id, isEdit },
    });

    // After the dialog is closed, check if the dialog was closed with the 'refresh' action
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.ngOnInit();
      }
    });
  }

  openDialog(id?: number, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(PhoneEntryFormComponent, {
      width: '900px',
      height: '90',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { id, isEdit }, // Passing data to the dialog
    });

    // After the dialog is closed, check if the dialog was closed with the 'refresh' action
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.ngOnInit();
      }
    });
  }
}
