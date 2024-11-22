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
    DialogboxComponent   
    
  ],
  templateUrl: './email-records.component.html',
  styleUrls: ['./email-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailRecordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  displayedColumns: string[] = [
    'id',
    'status',
    'transactionId',
    'customerId',
    'repliedBy',
    'pickUpDate',
    'takeOffDate',
    'dateAdded',
    'actionColumn',
  ];

  dataSource = new MatTableDataSource<IEmailRecord>();
  records: IEmailRecord[] = [];
  filteredRecords: IEmailRecord[] = [];

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchRecords();
  }

  filterBy: string = 'id'; 

  fetchRecords() {
    this.http.get<IEmailRecord[]>('https://localhost:44369/api/v1/EmailRecords').subscribe(
      (response) => {
        // Convert string dates to Date objects
        this.records = response.map(record => ({
          ...record,
          pickUpDate: new Date(record.pickUpDate),
          takeOffDate: new Date(record.takeOffDate),
          dateAdded: new Date(record.dateAdded)
        }));
        
        this.filteredRecords = this.records;
        this.dataSource.data = this.filteredRecords;
        this.totalItems = this.filteredRecords.length;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching records:', error);
      }
    );
  }
  
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  }

  showEdit(action: string){

  }

  showDelete(action: string){

  }


  resolveCellValue(column: string, element: any): string {
    switch (column) {
      case 'status':
        return `<span class="badge status-${element.status.toLowerCase()}">${element.status}</span>`;
      case 'receivedDate':
      case 'sendingDate':
      case 'dateAdded':
        return new Date(element[column]).toLocaleDateString();
      default:
        return element[column] || '-';
    }
  }
  
}
