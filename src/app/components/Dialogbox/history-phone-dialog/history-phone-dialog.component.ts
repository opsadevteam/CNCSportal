import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
export class HistoryPhoneDialogComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'LOG ID',
    'STATUS',
    'EMAIL ID',
    'REPLIED BY',
    'RECEIVED DATE',
    'SENDING DATE',
    'VENDOR',
    'DESCRIPTION',
    'DATE ADDED',
  ];
  constructor() {}
}
