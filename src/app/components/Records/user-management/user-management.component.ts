import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { NumberPaddingPipe } from "../../../pipes/number-padding.pipe";
import { AddUserDialogComponent } from "../../Dialogbox/add-user-dialog/add-user-dialog.component";
import { DeleteDialogComponent } from "../../Dialogbox/delete-dialog/delete-dialog.component";
import { UserAccountService } from "../../../services/user-account.service";
import { UserAccountModel } from "../../../Models/interface/user-account.model";

@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    NumberPaddingPipe,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  ACTIVE = "Active";
  INACTIVE = "Inactive";

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);
  private userAccountService = inject(UserAccountService);

  users: UserAccountModel[] = [];
  displayedColumns: string[] = [
    "id",
    "username",
    "fullname",
    "password",
    "dateadded",
    "usergroup",
    "status",
    "action",
  ];

  dataSource = new MatTableDataSource<UserAccountModel>(this.users);

  /**
   * Lifecycle hook that initializes the component by loading user data.
   */
  ngOnInit(): void {
    this.loadMembers();
  }

  /**
   * Lifecycle hook that sets the paginator for the table after the view initializes.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Loads the list of users from the backend and populates the table data source.
   */
  loadMembers(): void {
    this.userAccountService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = this.users;
      },
      error: (err) => console.error("Failed to load users:", err),
    });
  }

  /**
   * Opens a dialog for adding or editing a user.
   * @param action The action to perform ('Add' or 'Edit').
   * @param user The user data to prepopulate in the dialog (optional).
   */
  openDialog(action: string, user?: UserAccountModel): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: { action, user },
      width: "750px",
    });

    // Refresh data after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "refresh") {
        this.loadMembers();
      }
    });
  }

  /**
   * Opens a dialog to confirm the deletion of a user and restores focus to the menu trigger after closing.
   */
  showDeleteActionDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userAccountService.deleteUser(id).subscribe({
          next: () => {
            console.log(`User with ID ${id} deleted successfully.`);
            this.loadMembers();
          },
          error: (err) => {
            console.error(`Failed to delete user with ID ${id}:`, err);
          },
        });
      }
    });
  }
}
