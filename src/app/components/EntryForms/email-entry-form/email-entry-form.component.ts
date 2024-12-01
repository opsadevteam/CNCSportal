import { Component, inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Constant } from '../../../constant/Constants';
import { TransactionService } from '../../../services/transaction.service';
import { ProductVendorService } from '../../../services/product-vendor.service';
import { DescriptionService } from '../../../services/description.service';
import { UserAccountService } from '../../../services/user-account.service';
import {
  IDescription,
  IEmailEntryFormTransaction,
  IProductVendor,
  IUserAccount,
} from '../../../Models/interface/phoneEntryForm.model';
import { CommonModule } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-email-entry-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './email-entry-form.component.html',
  styleUrl: './email-entry-form.component.css',
})
export class EmailEntryFormComponent implements OnInit {
  message = Constant.MESSAGES.EMAIL_ENTRY_FORM;
  filteredDescriptions: IDescription[] = [];
  emailEntryForm: FormGroup = new FormGroup({});
  transactionService = inject(TransactionService);
  productVendorService = inject(ProductVendorService);
  descrptionService = inject(DescriptionService);
  userAccountService = inject(UserAccountService);
  productVendorList: IProductVendor[] = [];
  descriptionList: IDescription[] = [];
  userAccountList: IUserAccount[] = [];

  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<EmailEntryFormComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllProductVendors();
    this.getAllDescriptions();
    this.getAllUserAccounts();
  }

  initForm() {
    this.emailEntryForm = this.fb.group({
      emailId: ['', [Validators.required]],
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

  getAllProductVendors() {
    this.productVendorService.getAllProductVendors().subscribe((res: any) => {
      this.productVendorList = res;
    });
  }

  getAllDescriptions() {
    this.descrptionService.getAllDescriptions().subscribe((res: any) => {
      this.descriptionList = res;
    });
  }

  onProductVendorSelect(id: number) {
    this.filteredDescriptions = this.descriptionList.filter(
      (desc) => desc.productVendorId === id
    );
  }

  getAllUserAccounts() {
    this.userAccountService.getUsers().subscribe((res: any) => {
      this.userAccountList = res;
    });
  }

  onSubmit() {
    //create mock data for transaction
    let myMilliseconds =
      this.emailEntryForm.value.takeOffDate -
      this.emailEntryForm.value.pickUpDate;
    let myDays = myMilliseconds / (1000 * 3600 * 24);
    let myDateNow = '2024-11-19T16:00:00.000Z';
    let myUserNow = 'Robert M. Verano';
    let myShift = 'Morning';
    let myTransactionType = 'Email';
    let myLogId = 'JXFP20241120005';
    //JXF20241120WEH10
    //xxxzhueng10
    let mockTransaction: IEmailEntryFormTransaction = {
      transactionId: this.emailEntryForm.value.emailId,
      customerId: this.emailEntryForm.value.customerId,
      pickUpDate: this.emailEntryForm.value.pickUpDate,
      takeOffDate: this.emailEntryForm.value.takeOffDate,
      duration: myDays,
      productVendorId: parseInt(this.emailEntryForm.value.productVendor),
      descriptionId: parseInt(this.emailEntryForm.value.description),
      remark: this.emailEntryForm.value.remark,
      repliedBy: this.emailEntryForm.value.repliedBy,
      status: this.emailEntryForm.value.status,
      addedBy: myUserNow,
      dateAdded: myDateNow,
      shift: myShift,
      transactionType: myTransactionType,
      logId: myLogId,
      isDeleted: false,
    };
    console.log(mockTransaction);
    const isSave = confirm(
      'Confirmaton for Saving Email Entry Form Transaction'
    );
    if (isSave) {
      this.transactionService.addTransaction(mockTransaction).subscribe(
        (res: IEmailEntryFormTransaction) => {
          alert('Create Transaction Success!');
          this.initForm();
          this.dialogRef.close();
        },
        (error) => {
          alert('Something Went wrong in Transaction!');
        }
      );
    }
  }
}
