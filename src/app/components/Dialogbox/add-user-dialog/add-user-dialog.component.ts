import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
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
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.css"],
})
export class AddUserDialogComponent {
  private accountService = inject(UserAccountService);
  private router = inject(Router);

  hide = signal(true);
  action: "Add" | "Edit";
  userForm: FormGroup;
  validationErrors: string[] | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {
    this.action = data.action;
    this.userForm = this.createUserForm(data.user);
  }

  /**
   * Creates and initializes the user form with default or provided values.
   * @param user The user data to prepopulate the form (optional).
   * @returns A FormGroup representing the user form.
   */
  private createUserForm(user: any): FormGroup {
    return this.fb.group({
      username: [
        user?.username || "",
        [Validators.required, Validators.minLength(3)],
      ],
      fullName: [user?.fullName || "", Validators.required],
      password: [
        user?.password || "",
        [Validators.required, Validators.minLength(6)],
      ],
      userGroup: [user?.userGroup || "", Validators.required],
      status: ["Active"],
      dateAdded: [new Date()],
      addedBy: "Admin",
    });
  }

  /**
   * Toggles the visibility of the password field in the form.
   * @param event The mouse event triggered by the user.
   */
  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation(); // Stop event bubbling
    this.hide.set(!this.hide());
  }

  /**
   * Validates the form and determines whether to add or edit the user.
   */
  upsert(): void {
    if (!this.userForm.valid) {
      console.warn("Form is invalid", this.userForm.errors);
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.action === "Add") {
      this.addUser();
    } else if (this.action === "Edit") {
      // this.editUser();
    }
  }

  /**
   * Sends a request to add a new user to the system.
   */
  private addUser(): void {
    const userData = this.userForm.value;

    this.accountService.addUser(userData).subscribe({
      next: () => {
        this.dialogRef.close("refresh"),
          this.showSuccessAlert();
      },
      error: (error) => {
        if (error.status === 400) {
          this.userForm.get("username")?.setErrors({ UsernameTaken: true });
        } else {
          this.handleError(error);
        }
      },
    });
  }

  /**
   * Sends a request to update an existing user in the system.
   */
  /** 
    private editUser(): void {
    const userData = this.userForm.value;

    this.accountService.updateUser(userData).subscribe({
      next: () => this.closeDialogWithRefresh(),
      error: (error) => this.handleError(error),
    });
  }
  */

  /**
   * Handles errors returned from the server during API calls.
   * @param error The error response from the server.
   */
  private handleError(error: any): void {
    console.error("Error occurred:", error);
    this.validationErrors = error.errors || ["An unexpected error occurred."];
  }

  /**
   * Closes the modal and displays an alert confirming successful user addition.
   */
  showSuccessAlert(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.action === "Add") {
        alert("User successfully added");
      } else if (this.action === "Edit") {
        alert("User successfully updated");
      }
    });
  }
}
