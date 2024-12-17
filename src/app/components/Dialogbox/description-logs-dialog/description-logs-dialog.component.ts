import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { NumberPaddingPipe } from "../../../pipes/number-padding.pipe";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { DescriptionService } from "../../../services/description.service";
import { DescriptionLog } from "../../../Models/interface/description-log.model";

@Component({
  selector: "app-description-logs-dialog",
  standalone: true,
  imports: [
    MatTableModule,
    NumberPaddingPipe,
    TitleCasePipe,
    DatePipe,
    MatPaginator,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./description-logs-dialog.component.html",
  styleUrl: "./description-logs-dialog.component.css",
})
export class DescriptionLogsDialogComponent implements OnInit {
  descriptionId = signal<number>(0);
  descriptionService = inject(DescriptionService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    "id",
    "details",
    "activity",
    "addedBy",
    "dateAdded",
  ];

  dataSource = new MatTableDataSource<DescriptionLog>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      descriptionId?: number;
    }
  ) {
    this.descriptionId.set(data.descriptionId ?? 0);
    console.log(this.descriptionId());
  }

  ngOnInit(): void {
    this.loadDescriptionLogs(this.descriptionId());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDescriptionLogs(descriptionId: number): void {
    this.descriptionService.getDescriptionWithLogs(descriptionId).subscribe({
      next: (description) => {
        this.dataSource.data = description.descriptionLogs;
      },
      error: (error) => console.error("Failed to load logs", error),
    });
  }
}
