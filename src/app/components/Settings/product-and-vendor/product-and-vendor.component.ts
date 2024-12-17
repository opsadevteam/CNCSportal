import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProductVendorService } from "../../../services/product-vendor.service";

import { MatDialog } from "@angular/material/dialog";
import { Description } from "../../../Models/interface/product-description.model";
import {
  Product,
  ProductWithDescription as ProductWithDescription,
} from "../../../Models/interface/product-vendor.model";
import { ProductDialogComponent } from "../../Dialogbox/product-dialog/product-dialog.component";
import { DescriptionDialogComponent } from "../../Dialogbox/description-dialog/description-dialog.component";
import { DeleteDialogComponent } from "../../Dialogbox/delete-dialog/delete-dialog.component";
import { NgClass } from "@angular/common";
import { DescriptionService } from "../../../services/description.service";
import { ProductLogsDialogComponent } from "../../Dialogbox/product-logs-dialog/product-logs-dialog.component";
import { DescriptionLogsDialogComponent } from "../../Dialogbox/description-logs-dialog/description-logs-dialog.component";

@Component({
  selector: "app-product-and-vendor",
  standalone: true,
  imports: [
    MatCard,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./product-and-vendor.component.html",
  styleUrl: "./product-and-vendor.component.css",
})
export class ProductAndVendorComponent implements OnInit {
  //#region "DI"
  prodVendorService = inject(ProductVendorService);
  descriptionService = inject(DescriptionService);
  productUpsertDialog = inject(MatDialog);
  descriptionUpsertDialog = inject(MatDialog);
  productLogsDialog = inject(MatDialog);
  descriptionLogsDialog = inject(MatDialog);
  //#endregion

  //#region ViewChild
  @ViewChild("productPaginator") productPaginator!: MatPaginator;
  @ViewChild("descriptionPaginator") descriptionPaginator!: MatPaginator;
  //#endregion

  //#region Properties
  selectedProduct: Product = null!;
  selectedProdWithDesc: ProductWithDescription = null!;
  descriptions: Description[] = [];
  productColumns = ["name", "view", "edit", "delete"];
  descriptionColumns = ["description", "view", "edit", "delete"];
  productDS = new MatTableDataSource<ProductWithDescription>([]);
  descriptionDS = new MatTableDataSource<Description>([]);
  //#endregion

  //#region Hooks
  ngOnInit(): void {
    this.loadProductWithDescriptions();
  }

  ngAfterViewInit(): void {
    this.productDS.paginator = this.productPaginator;
    this.descriptionDS.paginator = this.descriptionPaginator;
  }
  //#endregion

  //#region Data initialization
  loadProductWithDescriptions(): void {
    const selectedProductId = this.selectedProdWithDesc?.id || null;
    this.prodVendorService.getProductDescriptions().subscribe({
      next: (prodList: ProductWithDescription[]) => {
        this.productDS.data = prodList;

        // If there was previous selected product, reselect it to update the description list
        if (selectedProductId) {
          const selectedProduct = prodList.find(
            (prod) => prod.id === selectedProductId
          );
          if (selectedProduct) {
            this.onProductClick(selectedProduct);
          }
        }
      },
      error: (err) => console.error("Failed to load data", err),
    });
  }

  //extract the descriptions[] from ProdAndDescListModel[] upon selection
  onProductClick(prodWithDesc: ProductWithDescription): void {
    this.descriptionDS.data = prodWithDesc.descriptions || [];
    //this code is for selection highlight only
    this.selectedProdWithDesc = prodWithDesc;
    //extract product to pass to description dialog
    this.selectedProduct = {
      id: this.selectedProdWithDesc.id,
      name: this.selectedProdWithDesc.name,
    };
  }
  //#endregion

  //#region History Modal
  openProductLogsDialog(productId: number): void {
    this.productLogsDialog.open(ProductLogsDialogComponent, {
      data: { productId: productId ?? null },
      width: "100vw",
      maxWidth: "60vw",
      height: "670px",
    });
  }

  openDescriptionLogsDialog(descriptionId: number): void {
    this.descriptionLogsDialog.open(DescriptionLogsDialogComponent, {
      data: { descriptionId: descriptionId ?? null },
      width: "100vw",
      maxWidth: "60vw",
      height: "670px",
    });
  }
  //#endregion

  //#region Upsert Modal
  openUpsertProductDialog(prodDesc?: any): void {
    const dialogRef = this.productUpsertDialog.open(ProductDialogComponent, {
      data: { prodDesc: prodDesc ?? null },
      width: "750px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProductWithDescriptions();
      }
    });
  }

  openUpsertDescriptionDialog(
    product: Product,
    description?: Description
  ): void {
    const dialogRef = this.descriptionUpsertDialog.open(
      DescriptionDialogComponent,
      {
        data: { product: product, description: description },
        width: "500px",
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProductWithDescriptions();
      }
    });
  }
  //#endregion

  //#region Delete method
  private DeleteProduct(id: number): void {
    this.prodVendorService.deleteProduct(id).subscribe({
      next: () => {
        alert(`Product with ID ${id} deleted successfully.`);

        // If the deleted product is currently selected, clear the descriptions
        if (this.selectedProdWithDesc?.id === id) {
          this.descriptionDS.data = [];
          this.selectedProdWithDesc = null!;
        }

        this.loadProductWithDescriptions();
      },
      error: (err) =>
        console.error(`Failed to delete product with Id: ${id}:`, err),
    });
  }

  private DeleteDescription(id: number): void {
    this.descriptionService.deleteDescription(id).subscribe({
      next: () => {
        console.log(id);
        alert(`Description with ID ${id} deleted successfully.`);

        this.loadProductWithDescriptions();
      },
      error: (err) =>
        console.error(`Failed to delete product with Id: ${id}:`, err),
    });
  }

  confirmDelete(id: number, objType: string): void {
    const dialogRef = this.productUpsertDialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (objType === "product") {
          // Delete product
          this.DeleteProduct(id);
        } else if (objType === "description") {
          // Delete description
          this.DeleteDescription(id);
        }

        // If the deleted product is currently selected, clear the descriptions
        if (this.selectedProdWithDesc?.id === id) {
          this.descriptionDS.data = [];
          this.selectedProdWithDesc = null!;
        }
      }
    });
  }
  //#endregion
}
