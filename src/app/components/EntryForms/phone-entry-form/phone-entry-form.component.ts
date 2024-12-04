import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
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
import {
  IDescription,
  IPhoneEntryFormTransaction,
  IProductVendor,
  IUserAccount,
} from '../../../Models/interface/phoneEntryForm.model';
import { TransactionService } from '../../../services/transaction.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductVendorService } from '../../../services/product-vendor.service';
import { DescriptionService } from '../../../services/description.service';
import { UserAccountService } from '../../../services/user-account.service';
import {
  MatDialog,
  MatDialogActions,
  matDialogAnimations,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { filter, map, observable, Observable, startWith } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { HistoryPhoneDialogComponent } from '../../Dialogbox/history-phone-dialog/history-phone-dialog.component';

@Component({
  selector: 'app-phone-entry-form',
  standalone: true,
  imports: [
    MatAutocompleteModule,
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
  templateUrl: './phone-entry-form.component.html',
  styleUrl: './phone-entry-form.component.css',
})
export class PhoneEntryFormComponent implements OnInit {
  message = Constant.MESSAGES.PHONE_ENTRY_FORM;
  filteredDescriptions: IDescription[] = [];
  phoneEntryForm: FormGroup = new FormGroup({});
  transactionService = inject(TransactionService);
  productVendorService = inject(ProductVendorService);
  descrptionService = inject(DescriptionService);
  userAccountService = inject(UserAccountService);
  productVendorList: IProductVendor[] = [];
  descriptionList: IDescription[] = [];
  userAccountList: IUserAccount[] = [];
  descriptionSuggest: boolean = true;
  filteredOption: Observable<IDescription[]> = new Observable<IDescription[]>();
  filteredProductVendor: IProductVendor[] = [];
  autoGeneratePhoneId: string = '';
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly dialog: MatDialog,
    @Optional() private datePipe: DatePipe,
    @Optional() public dialogRef: MatDialogRef<PhoneEntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: number; isEdit: boolean }
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllProductVendors();
    this.getAllDescriptions();
    this.getAllUserAccounts();
    this.autoGenerateId();
    this.editCase();
  }

  autoGenerateId() {
    const base = 'JXF';
    const today = new Date();
    const formattedDate = this.formatDate(today);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomLetters = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomLetters += letters[randomIndex];
    }
    let randomNumbers = '';
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      randomNumbers += numbers[randomIndex];
    }
    const generateRandomString = randomLetters + randomNumbers;
    this.autoGeneratePhoneId =
      base + formattedDate + generateRandomString.toUpperCase();
    this.phoneEntryForm.controls['phoneId'].setValue(this.autoGeneratePhoneId);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  initForm() {
    this.phoneEntryForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      phoneId: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      pickUpDate: new FormControl('', [Validators.required]),
      takeOffDate: new FormControl('', [Validators.required]),
      productVendor: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required]),
      repliedBy: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.filteredOption = this.phoneEntryForm.valueChanges.pipe(
      startWith(this.phoneEntryForm.value),
      map((value) => this._filter(value.description))
    );
  }

  private _filter(value: string) {
    const filterValue =
      value && typeof value === 'string' ? value.toLowerCase() : '';
    return this.descriptionList.filter((option) =>
      option.description.toLowerCase().includes(filterValue)
    );
  }

  getAllProductVendors() {
    this.productVendorService.getAllProductVendors().subscribe((res: any) => {
      this.productVendorList = res;
    });
  }

  onProductVendorSelect(id: number) {
    this.filteredDescriptions = this.descriptionList.filter(
      (desc) => desc.productVendorId === id
    );
    this.descriptionSuggest = false;
    this.phoneEntryForm.controls['description'].setValue('');
  }

  onDescriptionSelect(id: number) {
    this.phoneEntryForm.controls['productVendor'].setValue(id);
  }

  getAllDescriptions() {
    this.descrptionService.getAllDescriptions().subscribe((res: any) => {
      this.descriptionList = res;
    });
  }

  getAllUserAccounts() {
    this.userAccountService.getUsers().subscribe((res: any) => {
      this.userAccountList = res;
    });
  }

  onSubmit() {
    //create mock data for transaction
    let myMilliseconds =
      this.phoneEntryForm.value.takeOffDate -
      this.phoneEntryForm.value.pickUpDate;
    let myDays = myMilliseconds / (1000 * 3600 * 24);
    let myDateNow = new Date().toISOString();
    let myUserNow = 'Robert M. Verano';
    let myShift = 'Morning';
    let myTransactionType = 'Phone';
    let myLogId = 'JXFP20241120005';
    //JXF20241120WEH10
    //xxxzhueng10
    let mockTransaction: IPhoneEntryFormTransaction = {
      id: this.phoneEntryForm.value.id,
      transactionId: this.phoneEntryForm.value.phoneId,
      customerId: this.phoneEntryForm.value.customerId,
      pickUpDate: this.phoneEntryForm.value.pickUpDate,
      takeOffDate: this.phoneEntryForm.value.takeOffDate,
      duration: myDays,
      productVendorId: parseInt(this.phoneEntryForm.value.productVendor),
      descriptionId: parseInt(this.phoneEntryForm.value.description),
      remark: this.phoneEntryForm.value.remark,
      repliedBy: this.phoneEntryForm.value.repliedBy,
      status: this.phoneEntryForm.value.status,
      addedBy: myUserNow,
      dateAdded: myDateNow,
      shift: myShift,
      transactionType: myTransactionType,
      logId: myLogId,
      isDeleted: false,
    };
    console.log(mockTransaction);
    const isSave = confirm(
      'Confirmaton for Saving Phone Entry Form Transaction'
    );

    if (this.isEdit) {
      // Update case
      const isUpdate = confirm(
        'Confirm to update this Phone Entry Form Transaction?'
      );
      if (isUpdate) {
        this.transactionService
          .updateTransaction(mockTransaction.id, mockTransaction)
          .subscribe(
            (res: IPhoneEntryFormTransaction) => {
              alert('Update Transaction Success!');
              this.dialogRef.close('refresh');
            },
            (error) => {
              console.error('Error updating transaction:', error);
              alert('Something went wrong while updating the transaction.');
            }
          );
      }
    } else {
      // Create case
      const isSave = confirm(
        'Confirm to save this Phone Entry Form Transaction?'
      );
      if (isSave) {
        this.transactionService.addTransaction(mockTransaction).subscribe(
          (res: IPhoneEntryFormTransaction) => {
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

  // Edit Case
  editCase(): void {
    if (this.data) {
      const { id, isEdit } = this.data;
      this.isEdit = isEdit;

      if (id) {
        // Fetch transaction details
        this.transactionService.getTransactionById(id).subscribe(
          (transaction) => {
            console.log(`Editing record:`, transaction);
            // Populate the form with the fetched data
            this.phoneEntryForm.patchValue({
              id: transaction.id ?? '',
              phoneId: transaction.transactionId ?? '',
              customerId: transaction.customerId ?? '',
              pickUpDate: transaction.pickUpDate ?? '',
              takeOffDate: transaction.takeOffDate ?? '',
              productVendor: transaction.productVendorId ?? null,
              description: transaction.descriptionId ?? null,
              remark: transaction.remark ?? '',
              repliedBy: transaction.repliedBy ?? '',
              status: transaction.status ?? '',
            });
          },
          (error) => {
            console.error('Error fetching transaction details:', error);
            alert('Failed to fetch transaction details.');
          }
        );
      }
    }
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(HistoryPhoneDialogComponent, {
      width: '75%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }
}
