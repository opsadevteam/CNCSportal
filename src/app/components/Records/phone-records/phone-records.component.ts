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
    NgIf,
    NgFor,
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
  templateUrl: './phone-records.component.html',
  styleUrls: ['./phone-records.component.css'],
})
export class PhoneRecordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);

  searchTerm: string = '';
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  filterBy: string = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  hasSearched: boolean = false;
  filteredData: any[] = [];
  emailStringParams: string = 'Phone';

  displayedColumns: string[] = [
    'id',
    'status',
    'emailId',
    'customerId',
    'repliedBy',
    'receivedDate',
    'sendingDate',
    'vendor',
    'description',
    'dateAdded',
    'actionColumn',
  ];

  dataSource = new MatTableDataSource<Record>();

  records: Record[] = [
    {
      id: '000001',
      status: 'CLOSED',
      emailId: 'JXF2024112001',
      customerId: 'Sample123',
      repliedBy: 'CS James',
      receivedDate: new Date('2024-11-12'),
      sendingDate: new Date('2024-11-12'),
      vendor: 'VENDOR 01',
      description: 'FD - Virtual Deposit',
      dateAdded: new Date('2024-11-13'),
    },
    {
      id: '000002',
      status: 'PROCESSING',
      emailId: 'JXF2024112002',
      customerId: 'Sample456',
      repliedBy: 'CS Mamamo',
      receivedDate: new Date('2024-11-14'),
      sendingDate: new Date('2024-11-14'),
      vendor: 'VENDOR 02',
      description: 'FD - Virtual Deposit',
      dateAdded: new Date('2024-11-14'),
    },
    {
      id: '000003',
      status: 'PENDING',
      emailId: 'JXF2024112003',
      customerId: 'Sample789',
      repliedBy: 'CS Foreman',
      receivedDate: new Date('2024-11-15'),
      sendingDate: new Date('2024-11-15'),
      vendor: 'VENDOR 03',
      description: 'FD - Virtual Deposit',
      dateAdded: new Date('2024-11-15'),
    },
    {
      id: '000004',
      status: 'CLOSED',
      emailId: 'JXF2024112004',
      customerId: 'Sample111',
      repliedBy: 'CS Mason',
      receivedDate: new Date('2024-11-15'),
      sendingDate: new Date('2024-11-15'),
      vendor: 'VENDOR 04',
      description: 'FD - Virtual Deposit',
      dateAdded: new Date('2024-11-15'),
    },
    {
      id: '000009',
      status: 'PENDING',
      emailId: 'JXF2024112004',
      customerId: 'Sample111',
      repliedBy: 'CS BurstFade',
      receivedDate: new Date('2024-11-08'),
      sendingDate: new Date('2024-11-06'),
      vendor: 'VENDOR 05',
      description: 'FD - Virtual Deposit',
      dateAdded: new Date('2024-11-18'),
    },
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource.data = this.records;
    this.filteredRecords = this.records;
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterSearch() {
    this.filteredRecords = this.records.filter((record) => {
      const term = this.searchTerm ? this.searchTerm.toLowerCase() : '';
      const matchesSearch =
        record.emailId.toLowerCase().includes(term) ||
        record.repliedBy.toLowerCase().includes(term) ||
        record.customerId.toLowerCase().includes(term) ||
        record.status.toLowerCase().includes(term);

      const dateAdded = new Date(record.dateAdded);
      const from = this.dateFrom ? new Date(this.dateFrom) : null;
      const to = this.dateTo ? new Date(this.dateTo) : null;

      // Adjust the 'to' date to include the full day
      if (to) {
        to.setHours(23, 59, 59, 999);
      }

      const matchesDate =
        (!from || dateAdded >= from) && (!to || dateAdded <= to);

      return matchesSearch && matchesDate; // Combine both filters
    });

    this.totalItems = this.filteredRecords.length;

    // Apply pagination after filtering
    this.applyPagination();
    this.cdRef.detectChanges(); // Notify Angular to update the view
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Paginate the filtered records
    const paginatedRecords = this.filteredRecords.slice(startIndex, endIndex);

    // Update the dataSource
    this.dataSource.data = paginatedRecords;
    this.cdRef.detectChanges(); // Ensure the view updates
  }

  applyFilter() {
    this.filterSearch();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  refreshTable() {
    this.searchTerm = '';
    this.dataSource.filter = '';
    this.filterSearch();
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

  showEdit(action: string): void {}

  showDelete(action: string): void {}

  filteredRecords: Record[] = [];
}
