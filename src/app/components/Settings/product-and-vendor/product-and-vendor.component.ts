import { Component, ViewChild } from "@angular/core";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ProductAndVendorModel } from "../../../Models/interface/product-and-vendor.model";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";

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
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productAndVendorList: ProductAndVendorModel[] = [];
  dataSource = new MatTableDataSource<ProductAndVendorModel>(
    this.productAndVendorList
  );
  displayedColumns = ["productName", "view", "edit", "delete"];
}
