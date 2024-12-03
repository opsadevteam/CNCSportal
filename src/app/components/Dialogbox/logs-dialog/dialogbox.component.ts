import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
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

@Component({
  selector: 'app-dialogbox',
  standalone: true,
  imports: [MatDialogModule, MatTableModule,FormsModule, CommonModule ],
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css'],
})
export class DialogboxComponent {
  ngStringTitle: string = ''; 

  logsData: any[] = [];
  displayedColumns: string[] = [
    'id',
    'logType',
    'status',
    'transactionId',
    'customerId',
    'repliedBy',
    'pickUpDate',
    'takeOffDate',
    'productVendorId',
    'descriptionId',
    'dateAdded',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA to access passed data
    public dialogRef: MatDialogRef<DialogboxComponent>
  ) {
    //console.log('Dialog data:', data);
    // Ensure data is passed and handle undefined or missing data safely
    if (data) {
      // console.log('Parsed data:', data);
      // Check if logs are available and assign it to logsData
      this.logsData = data.transactionLogs || []; // Use transactionLogs as per your previous method
      this.ngStringTitle = data.emailStringParams || ''; // Set a default title if not provided
    } else {
      //console.warn('No data passed to the dialog!');
    }
  }
}
