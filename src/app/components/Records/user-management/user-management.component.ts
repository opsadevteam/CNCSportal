import {
  ChangeDetectionStrategy,
  Component,
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
import { UserAccountGet } from "../../../Models/interface/userAccount.model";
import { Constant } from "../../../constant/Constants";

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
  readonly ACTIVE = Constant.USER_STATUS.ACTIVE;
  readonly INACTIVE = Constant.USER_STATUS.INACTIVE;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: UserAccountGet[] = [];
  displayedColumns = [
    "id",
    "username",
    "fullname",
    "password",
    "dateadded",
    "usergroup",
    "status",
    "action",
  ];
  dataSource = new MatTableDataSource<UserAccountGet>(this.users);

  constructor(
    private readonly dialog: MatDialog,
    private readonly userAccountService: UserAccountService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadUsers(): void {
    this.userAccountService.getUsers().subscribe({
      next: (users) => (this.dataSource.data = users),
      error: (err) => console.error("Failed to load users:", err),
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: { id: id ?? null },
      width: "750px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "refresh") this.loadUsers();
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userAccountService.deleteUser(id).subscribe({
          next: () => {
            console.log(`User with ID ${id} deleted successfully.`);
            this.loadUsers();
          },
          error: (err) =>
            console.error(`Failed to delete user with ID ${id}:`, err),
        });
      }
    });
  }
}
