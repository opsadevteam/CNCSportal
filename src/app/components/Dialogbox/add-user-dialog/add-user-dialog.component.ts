import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { UserAccountService } from "../../../services/user-account.service";
import { NgIf } from "@angular/common";
import { EntryUserAccount } from "../../../Models/interface/userAccount.model";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-add-user-dialog",
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.css"],
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  hidePassword = true;
  id: number = 0;
  isSubmitting: boolean = false; //to disable button while submitting data

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddUserDialogComponent>,
    private readonly accountService: UserAccountService
  ) {
    this.id = data.id;
    this.userForm = this.createUserForm();
    if (data.id) {
      this.loadUserData(data.id);
    }
  }

  private createUserForm(): FormGroup {
    return this.fb.group({
      id: [0],
      username: ["", [Validators.required]],
      fullName: ["", Validators.required],
      password: ["", [Validators.required]],
      userGroup: ["", Validators.required],
      status: ["Active"],
    });
  }

  togglePasswordVisibility(event: MouseEvent): void {
    this.hidePassword = !this.hidePassword;
  }

  submit(): void {
    if (this.userForm.invalid || this.isSubmitting) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    if (this.data.id) {
      this.editUser();
    } else {
      this.addUser();
    }
  }

  loadUserData(id: number): void {
    this.accountService.getUser(id).subscribe({
      next: (userData: EntryUserAccount) => {
        this.userForm.patchValue({
          id: userData.id,
          username: userData.username,
          fullName: userData.fullName,
          password: userData.password,
          userGroup: userData.userGroup,
          status: userData.status,
        });
        console.log(this.userForm.value);
      },
      error: (err) => this.handleErrors(err),
    });
  }

  private addUser(): void {
    const user: EntryUserAccount = {
      ...this.userForm.value, // This will copy the values entered in the form
      addedBy: "admin", // to be set soon
      dateAdded: new Date(), // Set current date
      isDeleted: false, // Set default value
      logId: "log123", // to be set soon
    };

    this.accountService.addUser(user).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.dialogRef.close("refresh");
        alert("User successfully added");
        console.log(user);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.userForm.get("username")?.setErrors({ UsernameTaken: true });
        } else {
          this.handleErrors(err);
        }
      },
    });
  }

  private editUser(): void {
    const user: EntryUserAccount = {
      ...this.userForm.value,
      addedBy: "admin",
      dateAdded: new Date(),
      isDeleted: false,
      logId: "log123", // to be set soon
    };

    this.accountService.updateUser(this.id, user).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.dialogRef.close("refresh");
        console.log(user);
        alert("User successfully updated");
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.userForm.get("username")?.setErrors({ UsernameTaken: true });
        } else {
          this.handleErrors(err);
        }
      },
    });
  }

  private handleErrors(err: any): void {
    console.error("An error occurred:", err);
    // Handle error logic or display error messages
  }
}
