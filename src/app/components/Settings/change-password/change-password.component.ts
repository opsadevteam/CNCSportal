import { NgStyle } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatDialogActions } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatActionList } from "@angular/material/list";

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
  ],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.css",
})
export class ChangePasswordComponent {
  isSubmitting: boolean = false;
  hidePassword: Record<
    "currentPassword" | "newPassword" | "confirmPassword",
    boolean
  > = {
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  };

  togglePasswordVisibility(
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ): void {
    this.hidePassword[field] = !this.hidePassword[field];
  }
}
