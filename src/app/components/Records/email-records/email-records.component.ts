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
import { CommonModule, NgFor, NgIf } from '@angular/common';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './email-records.component.html',
  styleUrls: ['./email-records.component.css'],
})
export class EmailRecordsComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly menuTrigger = viewChild.required(MatMenuTrigger);  

  searchTerm: string = '';
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  filterBy: string = 'id';
  emailStringParams: string = 'Phone';
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
     private readonly transactionService: TransactionService) {}

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
  fetchRecords() {
    this.transactionService.fetchRecords().subscribe({
      next: (records) => {
        console.log('Fetched records:', records); // Log the records to verify
        this.dataSource.data = records;
      },
      error: (err) => {
        console.error('Error fetching records:', err);
      }
    });
  }
  
  

  applyFilter() {
    this.filteredRecords = this.records.filter((record) => {
      const term = this.searchTerm.toLowerCase();
      const matchesSearch =
        record.id.toLowerCase().includes(term) ||
        record.status.toLowerCase().includes(term) ||
        record.customerId.toLowerCase().includes(term) ||
        record.repliedBy.toLowerCase().includes(term);

      const dateAdded = new Date(record.dateAdded);
      const from = this.dateFrom ? new Date(this.dateFrom) : null;
      const to = this.dateTo ? new Date(this.dateTo) : null;

      if (to) {
        to.setHours(23, 59, 59, 999);
      }

      const matchesDate =
        (!from || dateAdded >= from) && (!to || dateAdded <= to);

      return matchesSearch && matchesDate;
    });

    this.totalItems = this.filteredRecords.length;
    this.applyPagination();
    this.cdRef.detectChanges();
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.filteredRecords.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  resetFilters() {
    this.searchTerm = '';
    this.dateFrom = null;
    this.dateTo = null;
    this.applyFilter();
  }

  showLogs(action: string): void {
    const logData = [
      {
        id: '001234',
        action: 'INSERT',
        status: 'PENDING',
        emailId: 'JXF2024112001',
        customerId: 'Sample123',
        repliedBy: 'CS Mamamo',
        receivedDate: new Date('2024-11-08'),
        sendingDate: new Date('2024-11-06'),
        vendor: 'VENDOR 05',
        description: 'FD - Virtual Deposit',
        dateAdded: new Date('2024-11-18'),
      },
      {
        id: '001235',
        action: 'UPDATE',
        status: 'PROCESSING',
        emailId: 'JXF2024112001',
        customerId: 'Sample123',
        repliedBy: 'CS Mamamo',
        receivedDate: new Date('2024-11-08'),
        sendingDate: new Date('2024-11-06'),
        vendor: 'VENDOR 05',
        description: 'FD - Virtual Deposit',
        dateAdded: new Date('2024-11-18'),
      },
      {
        id: '001236',
        action: 'DELETE',
        status: 'CLOSED',
        emailId: 'JXF2024112001',
        customerId: 'Sample123',
        repliedBy: 'CS Mamamo',
        receivedDate: new Date('2024-11-08'),
        sendingDate: new Date('2024-11-06'),
        vendor: 'VENDOR 06',
        description: 'FD - Virtual Deposit',
        dateAdded: new Date('2024-11-18'),
      },
    ];

    this.dialog.open(DialogboxComponent, {
      width: '90vw',
      maxWidth: '100vw',
      data: {
        logs: logData,
        emailStringParams: this.emailStringParams,
      },
    });
  }

  showEdit(action: string) {}

  showDelete(action: string) {}

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
