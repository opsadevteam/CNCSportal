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
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { NumberPaddingPipe } from "../../../pipes/number-padding.pipe";
import { AddUserDialogComponent } from "../../Dialogbox/add-user-dialog/add-user-dialog.component";
import { DeleteDialogComponent } from "../../Dialogbox/delete-dialog/delete-dialog.component";

@Component({
  selector: "app-activity-logs",
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
    AddUserDialogComponent,
    DeleteDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./activity-logs.component.html",
  styleUrl: "./activity-logs.component.css",
})
export class ActivityLogsComponent {
  displayedColumns: string[] = [
    "id",
    "activity",
    "user",
    "usergroup",
    "datetime",
    "details",
  ];
  dataSource = new MatTableDataSource<DataActivityLogs>(Data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface DataActivityLogs {
  id: number;
  activity: string;
  user: string;
  usergroup: string;
  datetime: Date;
  details: string;
}

const Data: DataActivityLogs[] = [
  {
    id: 1,
    activity: "Logged In",
    user: "jdoe",
    usergroup: "admin",
    datetime: new Date("2024-01-15T08:30:00"),
    details: "User logged in from IP 192.168.0.1",
  },
  {
    id: 2,
    activity: "Password Changed",
    user: "asmith",
    usergroup: "user",
    datetime: new Date("2024-02-20T14:45:00"),
    details: "Password updated successfully",
  },
  {
    id: 3,
    activity: "Created Post",
    user: "mjones",
    usergroup: "moderator",
    datetime: new Date("2024-03-10T10:15:00"),
    details: "Posted in General Discussion",
  },
  {
    id: 4,
    activity: "Logged Out",
    user: "bwhite",
    usergroup: "admin",
    datetime: new Date("2024-04-05T18:05:00"),
    details: "User logged out",
  },
  {
    id: 5,
    activity: "Commented",
    user: "kharris",
    usergroup: "user",
    datetime: new Date("2024-05-15T11:20:00"),
    details: "Commented on Post ID 123",
  },
];
