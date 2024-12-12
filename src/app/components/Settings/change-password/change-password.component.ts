import { NgIf, NgStyle } from "@angular/common";
import { Component, inject, Inject, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatDialogActions } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatActionList } from "@angular/material/list";
import { UserAccountService } from "../../../services/user-account.service";
import {
  UserAccountChangePassword,
  UserAccountGetAndUpdate,
} from "../../../Models/interface/userAccount.model";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatDialogActions,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.css",
})
export class ChangePasswordComponent implements OnInit {
  userAccountService = inject(UserAccountService);
  formBuilder = inject(FormBuilder);
  userForm!: FormGroup;
  passwordForm!: FormGroup;
  id: number = 94;
  isSubmitting: boolean = false;
  hidePassword: Record<
    "currentPassword" | "newPassword" | "confirmPassword",
    boolean
  > = {
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  };

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: [""],
      username: [""],
      userGroup: [""],
      status: [""],
      password: [""],
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });

    this.loadUserData(this.id);
  }

  loadUserData(id: number): void {
    this.userAccountService.getUser(id).subscribe({
      next: (userData: UserAccountGetAndUpdate) => {
        this.userForm.patchValue({
          username: userData.username,
          fullName: userData.fullName,
          password: userData.password,
          userGroup: userData.userGroup,
          status: userData.status,
        });
      },
      error: (err) => this.handleErrors(err),
    });
  }

  togglePasswordVisibility(
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ): void {
    this.hidePassword[field] = !this.hidePassword[field];
  }

  private handleErrors(err: any): void {
    console.error("An error occurred:", err);
    // Handle error logic or display error messages
  }

  saveChanges(): void {
    if (this.isPasswordMatch()) {
      const newPasswordPayload: UserAccountChangePassword = {
        newPassword: this.passwordForm.get("newPassword")?.value,
      };
      this.isSubmitting = true;
      this.userAccountService
        .updateUserPassword(this.id, newPasswordPayload)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.passwordForm.reset();
            this.passwordForm.markAsPristine();
            alert("password successfully updated");
            this.loadUserData(this.id);
          },
          error: (err) => {
            this.handleErrors(err);
            this.isSubmitting = false;
          },
        });
    } else {
      this.passwordForm
        .get("confirmPassword")
        ?.setErrors(!this.isPasswordMatch() ? { mismatch: true } : null);
    }
  }

  isPasswordMatch(): boolean {
    return (
      this.passwordForm.get("newPassword")?.value ===
      this.passwordForm.get("confirmPassword")?.value
    );
  }
}
