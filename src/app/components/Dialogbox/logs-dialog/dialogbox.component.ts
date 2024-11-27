import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialogbox',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, CommonModule],
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css'], // Fixed typo here, it should be 'styleUrls'
})
export class DialogboxComponent {
  ngStringTitle: string = ''; // Initialize ngStringTitle as an empty string by default

  logsData: any[] = []; // Ensure logsData is an array, initialized to an empty array if no data is passed
  displayedColumns: string[] = [
    'id',
    'action',
    'status',
    'emailId',
    'customerId',
    'repliedBy',
    'receivedDate',
    'sendingDate',
    'vendor',
    'description',
    'dateAdded',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA to access passed data
    public dialogRef: MatDialogRef<DialogboxComponent>
  ) {   
    // Ensure data is passed and handle undefined or missing data safely
    if (data) {
      this.logsData = data.logs || []; // Use empty array if logs are not passed
      this.ngStringTitle = data.emailStringParams || 'Default Title'; // Set title to 'Default Title' if not provided
    }
  }

}
