import { Component, inject, ViewChild } from "@angular/core";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { ProdAndDescListModel } from "../../../Models/interface/product-vendor.model";
import { ProductVendorService } from "../../../services/product-vendor.service";
import { ProductDescriptionModel } from "../../../Models/interface/product-description.model";

@Component({
  selector: "app-product-and-vendor",
  standalone: true,
  imports: [
    MatCard,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
  ],
  templateUrl: "./product-and-vendor.component.html",
  styleUrl: "./product-and-vendor.component.css",
})
export class ProductAndVendorComponent {
  prodVendorService = inject(ProductVendorService);
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  prodAndDescList: ProdAndDescListModel[] = [];
  selectedDescriptions: ProductDescriptionModel[] = [];
  selectedRow: ProdAndDescListModel | null = null;

  productColumns = ["name", "view", "edit", "delete"];
  descriptionColumns = ["description", "view", "edit", "delete"];

  dataSource = new MatTableDataSource<ProdAndDescListModel>(
    this.prodAndDescList
  );

  descriptionDataSource = new MatTableDataSource<ProductDescriptionModel>(
    this.selectedDescriptions
  );

  ngOnInit(): void {
    this.loadProdAndDescList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProdAndDescList(): void {
    this.prodVendorService.getProdAndDescList().subscribe({
      next: (prodList) => {
        this.dataSource.data = prodList;
      },
      error: (err) => console.error("Failed to load data", err),
    });
  }

  //extract the descriptions[] from ProdAndDescListModel[]
  onProductClick(element: ProdAndDescListModel): void {
    this.selectedDescriptions = element.descriptions || [];
    this.descriptionDataSource.data = this.selectedDescriptions;
    this.selectedRow = element;
  }
}
