import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  viewChild,
} from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { NumberPaddingPipe } from "../_pipes/number-padding.pipe";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { DeleteActionModalComponent } from "./delete-action-modal/delete-action-modal.component";

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
  styleUrl: "./user-management.component.css",
})
export class UserManagementComponent {
  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
    "select",
    "id",
    "username",
    "password",
    "dateadded",
    "usergroup",
    "status",
    "action",
  ];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<PeriodicElement>(
    this.allowMultiSelect,
    this.initialSelection
  );

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  openDialog(action: string): void {
    this.dialog.open(AddUserModalComponent, {
      data: { action }, // Pass the action as data to the dialog
      width: "750px",
    });
  }

  showDeleteActionDialog() {
    const dialogRef = this.dialog.open(DeleteActionModalComponent, {
      restoreFocus: false,
    });
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}

export interface PeriodicElement {
  id: number;
  username: string;
  password: string;
  dateadded: Date;
  usergroup: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    username: "jdoe",
    password: "pass123",
    dateadded: new Date("2024-01-15"),
    usergroup: "admin",
    status: "active",
  },
  {
    id: 2,
    username: "asmith",
    password: "secure456",
    dateadded: new Date("2024-02-20"),
    usergroup: "user",
    status: "inactive",
  },
  {
    id: 3,
    username: "mjones",
    password: "mypass789",
    dateadded: new Date("2024-03-10"),
    usergroup: "moderator",
    status: "active",
  },
  {
    id: 4,
    username: "bwhite",
    password: "whitepass987",
    dateadded: new Date("2024-04-05"),
    usergroup: "admin",
    status: "inactive",
  },
  {
    id: 5,
    username: "kharris",
    password: "kh@1234",
    dateadded: new Date("2024-05-15"),
    usergroup: "user",
    status: "active",
  },
  {
    id: 6,
    username: "lwilson",
    password: "wilson321",
    dateadded: new Date("2024-06-20"),
    usergroup: "moderator",
    status: "inactive",
  },
  {
    id: 7,
    username: "tgonzalez",
    password: "tgonz789",
    dateadded: new Date("2024-07-11"),
    usergroup: "user",
    status: "active",
  },
  {
    id: 8,
    username: "rlee",
    password: "rlee@456",
    dateadded: new Date("2024-08-03"),
    usergroup: "admin",
    status: "active",
  },
  {
    id: 9,
    username: "cjackson",
    password: "jackson000",
    dateadded: new Date("2024-09-09"),
    usergroup: "user",
    status: "inactive",
  },
  {
    id: 10,
    username: "mclark",
    password: "clark7890",
    dateadded: new Date("2024-10-10"),
    usergroup: "moderator",
    status: "active",
  },
];
