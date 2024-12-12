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
import { ProductDialogComponent } from "../../Dialogbox/product-dialog/product-dialog.component";
import { Product } from "../../../Models/interface/product-vendor.model";
import { Description } from "../../../Models/interface/product-description.model";
import { DescriptionService } from "../../../services/description.service";
import { NgClass } from "@angular/common";
import { DeleteDialogComponent } from "../../Dialogbox/delete-dialog/delete-dialog.component";
import { DescriptionDialogComponent } from "../../Dialogbox/description-dialog/description-dialog.component";

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
    MatPaginator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./product-and-vendor.component.html",
  styleUrl: "./product-and-vendor.component.css",
})
export class ProductAndVendorComponent {
  //#region Dependency injections
  productService = inject(ProductVendorService);
  descriptionService = inject(DescriptionService);
  productDialog = inject(MatDialog);
  descriptionDialog = inject(MatDialog);
  //#endregion

  //#region ViewChilds
  @ViewChild('productPaginator') productPaginator!: MatPaginator;
  @ViewChild('descriptionPaginator') descriptionPaginator!: MatPaginator;
  //#endregion

  //#region Properties
  //USAGE: identify selected row, loadDescriptions' parameter, and data for openDescriptionDialog -LAUR
  product: Product = null!;
  productColumns = ["name", "view", "edit", "delete"];
  descriptionColumns = ["description", "view", "edit", "delete"];
  productDS = new MatTableDataSource<Product>([]);
  descriptionDS = new MatTableDataSource<Description>([]);
  //#endregion

  //#region Hooks
  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.productDS.paginator = this.productPaginator;
    this.descriptionDS.paginator = this.descriptionPaginator;
  }
  //#endregion

  //#region Products
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (prodList) => (this.productDS.data = prodList),
      error: (err) => console.error("Failed to load data", err),
    });
  }

  onProductClick(product: Product): void {
    this.product = product;
    this.loadDescriptions(this.product.id);
  }

  openProductDialog(product?: any): void {
    const dialogRef = this.productDialog.open(ProductDialogComponent, {
      data: { product: product ?? null },
      width: "750px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }
  //#endregion

  //#region Description
  loadDescriptions(productId: number): void {
    this.descriptionService.getDescriptionsById(productId).subscribe({
      next: (prodList) => (this.descriptionDS.data = prodList),
      error: (err) => {
        console.error("Failed to load data", err);
        this.descriptionDS.data = [];
      },
    });
  }

  openDescriptionDialog(product: Product, description?: Description): void {
    const dialogRef = this.descriptionDialog.open(DescriptionDialogComponent, {
      data: { product: product, description: description },
      width: "750px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDescriptions(this.product.id);
      }
    });
  }
  //#endregion

  confirmDelete(id: number): void {
    const dialogRef = this.productDialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            alert(`User with ID ${id} deleted successfully.`);
            this.loadProducts();
            this.loadDescriptions(0);
          },
          error: (err) =>
            console.error(`Failed to delete user with ID ${id}:`, err),
        });
      }
    });
  }
}
