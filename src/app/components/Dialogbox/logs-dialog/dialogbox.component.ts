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
  imports: [MatDialogModule, 
  MatTableModule, 
  CommonModule],
  templateUrl: './dialogbox.component.html',
  styleUrl: './dialogbox.component.css',
})
export class DialogboxComponent {

  ngStringTitle: string = ""

  logsData: any[];
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogboxComponent>
  ) {
     this.logsData = data.logs;
     this.ngStringTitle = data.emailStringParams || 'Default Title'; 
  }
}
