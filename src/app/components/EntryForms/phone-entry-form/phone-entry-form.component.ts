import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Constant } from '../../../constant/Constants';
import { IPhoneEntryFormTransaction } from '../../../Models/interface/phoneEntryForm.model';
import { TransactionService } from '../../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phone-entry-form',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './phone-entry-form.component.html',
  styleUrl: './phone-entry-form.component.css',
})
export class PhoneEntryFormComponent implements OnInit {
  message = Constant.MESSAGES.PHONE_ENTRY_FORM;
  phoneEntryForm: FormGroup = new FormGroup({});
  transactionService = inject(TransactionService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.phoneEntryForm = this.fb.group({
      phoneId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      pickUpDate: ['', [Validators.required]],
      takeOffDate: ['', [Validators.required]],
      productVendor: ['', [Validators.required]],
      description: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      repliedBy: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  onSubmit() {
    //create mock data for transaction
    let myMilliseconds =
      this.phoneEntryForm.value.takeOffDate -
      this.phoneEntryForm.value.pickUpDate;
    let myDays = myMilliseconds / (1000 * 3600 * 24);
    let myDateNow = '2024-11-19T16:00:00.000Z';
    let myUserNow = 'Robert M. Verano';
    let myShift = 'Morning';
    let myTransactionType = 'Phone';
    let myLogId = 'JXFP20241120005';
    //JXF20241120WEH653
    //xxxzhueng332
    let mockTransaction: IPhoneEntryFormTransaction = {
      transactionId: this.phoneEntryForm.value.phoneId,
      customerId: this.phoneEntryForm.value.customerId,
      pickUpDate: this.phoneEntryForm.value.pickUpDate,
      takeOffDate: this.phoneEntryForm.value.takeOffDate,
      duration: myDays,
      productVenderId: parseInt(this.phoneEntryForm.value.productVendor),
      descriptionId: parseInt(this.phoneEntryForm.value.description),
      remark: this.phoneEntryForm.value.remark,
      repliedBy: this.phoneEntryForm.value.description,
      status: this.phoneEntryForm.value.status,
      addedBy: myUserNow,
      dateAdded: myDateNow,
      shift: myShift,
      transactionType: myTransactionType,
      logId: myLogId,
      isDeleted: false,
    };

    console.log(mockTransaction);

    const isSave = confirm('Confirmaton for Saving data');
    if (isSave) {
      this.transactionService
        .addTransaction(mockTransaction)
        .subscribe((res: any) => {
          alert('Create Transaction Success!');
        });
    }
  }
}
