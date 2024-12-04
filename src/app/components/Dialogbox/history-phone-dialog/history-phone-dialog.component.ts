import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
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
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/transaction.service';
import { IPhoneEntryFormTransaction } from '../../../Models/interface/phoneEntryForm.model';

@Component({
  selector: 'app-history-phone-dialog',
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
  templateUrl: './history-phone-dialog.component.html',
  styleUrl: './history-phone-dialog.component.css',
})
export class HistoryPhoneDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'PHONE ID',
    'STATUS',
    'REPLIED BY',
    'RECEIVED DATE',
    'SENDING DATE',
    'VENDOR',
    'DESCRIPTION',
    'DATE ADDED',
  ];
  transactionList!: IPhoneEntryFormTransaction[];
  @ViewChild(MatPaginator) myPaginator!: MatPaginator;

  constructor(private transactionSevice: TransactionService) {}
  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionSevice.getAllTransactions().subscribe((res: any) => {
      this.transactionList = res;
      this.dataSource = new MatTableDataSource<IPhoneEntryFormTransaction>(
        this.transactionList
      );
      this.dataSource.paginator = this.myPaginator;
    });
  }
}
