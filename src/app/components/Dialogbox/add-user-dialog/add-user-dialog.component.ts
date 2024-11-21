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
  hide = signal(true);
  action: string;
  userForm: FormGroup;
  validationErrors: string[] | undefined;

  private accountService = inject(UserAccountService);
  private router = inject(Router);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.action = data.action;

    this.userForm = this.fb.group({
      username: [
        data.user?.username || "",
        [Validators.required, Validators.minLength(3)],
      ],
      fullName: [data.user?.fullName || "", Validators.required],
      password: [
        data.user?.password || "",
        [Validators.required, Validators.minLength(6)],
      ],
      userGroup: [data.user?.userGroup || "", Validators.required],
      status: ["Active"], // Default to "active"
      dateAdded: [new Date()], // Replace "xxx" with the actual user or value
      addedBy: "Admin",
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  upsert(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.action === "Edit") {
        console.log("User updated:", userData);
        // Implement update logic here
      } else if (this.action === "Add") {
        this.accountService.addUser(userData).subscribe({
          next: () => {
            this.router.navigateByUrl("usermanagement");
          },
          error: (error) => {
            console.error("Error adding user:", error);
            this.validationErrors = error.errors || [
              "An unexpected error occurred.",
            ];
          },
        });
      }
    } else {
      console.log("Form is invalid", this.userForm.errors);
      this.userForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
}
