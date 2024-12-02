import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import { ActivityLogService } from "../../../services/activity-log.service";
import { ActivitylogGet } from "../../../Models/interface/activitylog.model";

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./activity-logs.component.html",
  styleUrl: "./activity-logs.component.css",
})
export class ActivityLogsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  activityLogs: ActivitylogGet[] = [];
  displayedColumns: string[] = [
    "id",
    "activity",
    "user",
    "usergroup",
    "datetime",
    "details",
  ];

  dataSource = new MatTableDataSource<ActivitylogGet>(this.activityLogs);

  constructor(private readonly activityLogService: ActivityLogService) {}

  ngOnInit(): void {
    this.loadActivityLogs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadActivityLogs(): void {
    this.activityLogService.getActivityLogs().subscribe({
      next: (_activitylogs) => {
        this.activityLogs = _activitylogs;
        this.dataSource.data = _activitylogs;
      },
      error: (error) => console.error("Failed to load activity logs", error),
    });
  }
}
