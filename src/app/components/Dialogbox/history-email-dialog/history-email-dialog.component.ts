import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/transaction.service';
import {
  IEmailEntryFormTransactionDetailed,
  IPhoneEntryFormTransaction,
  IPhoneEntryFormTransactionDetailed,
} from '../../../Models/interface/phoneEntryForm.model';

@Component({
  selector: 'app-history-email-dialog',
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
  templateUrl: './history-email-dialog.component.html',
  styleUrl: './history-email-dialog.component.css',
})
export class HistoryEmailDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'LOG ID',
    'STATUS',
    'EMAIL ID',
    'CUSTOMER ID',
    'REPLIED BY',
    'RECEIVED DATE',
    'SENDING DATE',
    'VENDOR',
    'DESCRIPTION',
    'DATE ADDED',
  ];
  transactionList!: IPhoneEntryFormTransaction[];
  @ViewChild(MatPaginator) myPaginator!: MatPaginator;
  @ViewChild(MatSort) mySort!: MatSort;
  @Input() customerId: string = '';

  constructor(private transactionSevice: TransactionService) {}
  ngOnInit(): void {
    this.getTransactionsByCustomerId(this.customerId);
  }

  getTransactionsByCustomerId(customerId: string) {
    this.transactionSevice
      .getTransactionsByCustomerId(customerId)
      .subscribe((res: any) => {
        this.transactionList = res.filter(
          (transaction: any) => transaction.transactionType === 'Email'
        );
        this.dataSource =
          new MatTableDataSource<IEmailEntryFormTransactionDetailed>(
            this.transactionList
          );
        this.dataSource.paginator = this.myPaginator;
        this.dataSource.sort = this.mySort;
        console.log(this.transactionList);
      });
  }
}