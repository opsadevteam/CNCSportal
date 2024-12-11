import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from "@angular/core";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";

import { ProductVendorService } from "../../../services/product-vendor.service";

import { MatDialog } from "@angular/material/dialog";
import { AddProdDescDialogComponent } from "../../Dialogbox/add-prod-desc-dialog/add-prod-desc-dialog.component";
import { Product } from "../../../Models/interface/product-vendor.model";
import { Description } from "../../../Models/interface/product-description.model";
import { DescriptionService } from "../../../services/description.service";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-product-and-vendor",
  standalone: true,
  imports: [
    MatCard,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./product-and-vendor.component.html",
  styleUrl: "./product-and-vendor.component.css",
})
export class ProductAndVendorComponent {
  productService = inject(ProductVendorService);
  descriptionService = inject(DescriptionService);
  prodDescDialog = inject(MatDialog);
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedRow: number = 0;

  productColumns = ["name", "view", "edit", "delete"];
  descriptionColumns = ["description", "view", "edit", "delete"];

  productDS = new MatTableDataSource<Product>([]);
  descriptionDS = new MatTableDataSource<Description>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.productDS.paginator = this.paginator;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (prodList) => (this.productDS.data = prodList),
      error: (err) => console.error("Failed to load data", err),
    });
  }

  loadDescriptions(productId: number): void {
    this.descriptionService.getDescriptionsById(productId).subscribe({
      next: (prodList) => (this.descriptionDS.data = prodList),
      error: (err) => {
        console.error("Failed to load data", err);
        this.descriptionDS.data = [];
      },
    });
  }

  onProductClick(productId: number): void {
    this.loadDescriptions(productId);
    this.selectedRow = productId;
  }

  openDialog(objType: string, id?: number): void {
    const dialogRef = this.prodDescDialog.open(AddProdDescDialogComponent, {
      data: { objType: objType, id: id ?? null },
      width: "750px",
    });
  }
}
