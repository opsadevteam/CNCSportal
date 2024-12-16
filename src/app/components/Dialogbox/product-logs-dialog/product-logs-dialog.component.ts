import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { NumberPaddingPipe } from "../../../pipes/number-padding.pipe";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { ProductVendorService } from "../../../services/product-vendor.service";
import { ProductLog } from "../../../Models/interface/product-log.model";

@Component({
  selector: "app-product-logs-dialog",
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
  templateUrl: "./product-logs-dialog.component.html",
  styleUrl: "./product-logs-dialog.component.css",
})
export class ProductLogsDialogComponent implements OnInit {
  productId = signal<number>(0);
  productService = inject(ProductVendorService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    "id",
    "details",
    "activity",
    "addedBy",
    "dateAdded",
  ];

  dataSource = new MatTableDataSource<ProductLog>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productId?: number;
    }
  ) {
    this.productId.set(data.productId ?? 0);
  }

  ngOnInit(): void {
    this.loadProductLogs(this.productId());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProductLogs(productId: number): void {
    this.productService.getProductWithLogs(productId).subscribe({
      next: (product) => {
        this.dataSource.data = product.productLogs;
        console.log(this.dataSource.data);
      },
      error: (error) => console.error("Failed to load logs", error),
    });
  }
}
