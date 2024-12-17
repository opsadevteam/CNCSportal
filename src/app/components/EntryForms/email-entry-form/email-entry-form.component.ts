import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
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
import { CommonModule, DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { filter, map, observable, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HistoryPhoneDialogComponent } from '../../Dialogbox/history-phone-dialog/history-phone-dialog.component';
import { HistoryEmailDialogComponent } from '../../Dialogbox/history-email-dialog/history-email-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-entry-form',
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
    MatSnackBarModule,
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
  descriptionSuggest: boolean = true;
  filteredOption: Observable<IDescription[]> = new Observable<IDescription[]>();
  filteredProductVendor: IProductVendor[] = [];
  autoGenerateEmailId: string = '';
  isEdit: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private readonly dialog: MatDialog,
    @Optional() private datePipe: DatePipe,
    @Optional() public dialogRef: MatDialogRef<EmailEntryFormComponent>,
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


  // auto gereate id for new transaction 
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
    this.autoGenerateEmailId =
      base + formattedDate + generateRandomString.toUpperCase();
    this.emailEntryForm.controls['emailId'].setValue(this.autoGenerateEmailId);
  }

  // formating date for auto generate id format
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
    this.editCase();
  }

  // initialize form
  initForm() {
    this.emailEntryForm = new FormGroup({     
      emailId: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      pickUpDate: new FormControl('', [Validators.required]),
      takeOffDate: new FormControl('', [Validators.required]),
      productVendor: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required]),
      repliedBy: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.filteredOption = this.emailEntryForm.valueChanges.pipe(
      startWith(this.emailEntryForm.value),
      map((value) => this._filter(value.description))
    );
  }

  // filtering data for description and product vendor
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
    this.emailEntryForm.controls['description'].setValue('');
  }

  onDescriptionSelect(id: number) {
    this.emailEntryForm.controls['productVendor'].setValue(id);
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
      this.emailEntryForm.value.takeOffDate -
      this.emailEntryForm.value.pickUpDate;
    let myDays = myMilliseconds / (1000 * 3600 * 24);
    let myDateNow = new Date().toISOString();
    let myUserNow = 'Robert M. Verano';
    let myShift = 'Morning';
    let myTransactionType = 'Email';
    let myLogId = 'JXFP20241120005';
    //JXF20241120WEH10
    //xxxzhueng10
    let mockTransaction: IEmailEntryFormTransaction = {
      id: this.emailEntryForm.value.id,
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

    // console.log(mockTransaction);
    // const isSave = confirm(
    //   'Confirmaton for Saving Email Entry Form Transaction'
    // );

    if (this.isEdit) {
      // Update case
      const isUpdate = confirm(
        'Confirm to update this Email Entry Form Transaction?'
      );
      if (isUpdate) {
        this.transactionService
          .updateTransaction(mockTransaction.id, mockTransaction)
          .subscribe(
            (res: IEmailEntryFormTransaction) => {
              this.openSnackbar('Update Transaction Success!', 'close');
              this.dialogRef.close('refresh');
            },
            (error) => {
              // console.error('Error updating transaction:', error);
              // alert('Something went wrong while updating the transaction.');
            }
          );
      }
    } else {
      // Create case
      const isSave = confirm(
        'Confirm to save this Email Entry Form Transaction?'
      );
      if (isSave) {
        this.transactionService.addTransaction(mockTransaction).subscribe(
          (res: IEmailEntryFormTransaction) => {
            alert('Create Transaction Success!');
            this.initForm();
            this.dialogRef.close();
          },
          (error) => {
            // alert('Something Went wrong in Transaction!');
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
            //console.log(`Editing record:`, transaction);

            // Find the description based on descriptionId
            const descriptionItem = this.descriptionList.find(
              (desc) => desc.id === transaction.descriptionId
            );

            // Populate the form with the fetched data
            this.emailEntryForm.patchValue({
              id: transaction.id ?? '',
              emailId: transaction.transactionId ?? '',
              customerId: transaction.customerId ?? '',
              pickUpDate: transaction.pickUpDate ?? '',
              takeOffDate: transaction.takeOffDate ?? '',
              productVendor: transaction.productVendorId ?? null,
              description: descriptionItem ? descriptionItem.description : null,
              remark: transaction.remark ?? '',
              repliedBy: transaction.repliedBy ?? '',
              status: transaction.status ?? '',
            });
          },
          (error) => {
            // console.error('Error fetching transaction details:', error);
            // alert('Failed to fetch transaction details.');
          }
        );
      }
    }
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(HistoryEmailDialogComponent, {
      width: '65%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    dialogRef.componentInstance.customerId =
      this.emailEntryForm.value.customerId;
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'custom-snackbar',
    });
  }
}
