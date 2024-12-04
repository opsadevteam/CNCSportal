import { NgStyle } from "@angular/common";
import { Component, inject, Inject, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatDialogActions } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatActionList } from "@angular/material/list";
import { UserAccountService } from "../../../services/user-account.service";

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
export class ChangePasswordComponent implements OnInit {
  userAccountService = inject(UserAccountService)
  id: number = 86;
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

  }

  // loadUserData(): void {
  //   this.userAccountService.getUser(id).subscribe({
  //     next: (userData: UserAcc)
  //   })
  // }

  togglePasswordVisibility(
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ): void {
    this.hidePassword[field] = !this.hidePassword[field];
  }
}
