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
import { SelectionModel } from "@angular/cdk/collections";
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
    "password",
    "dateadded",
    "usergroup",
    "status",
    "action",
  ];

  dataSource = new MatTableDataSource<UserAccountModel>(this.users);

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMembers() {
    this.userAccountService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = this.users;
        console.log(users);
      },
      error: (err) => console.error("Failed to load users:", err),
    });
  }

  openDialog(action: string, user?: UserAccountModel): void {
    console.log("User data:", user); // Verify user data
    this.dialog.open(AddUserDialogComponent, {
      data: { action, user }, // Pass the action and user as data to the dialog
      width: "750px",
    });
  }

  showDeleteActionDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
