import { Component, Inject, inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatOption, MatSelect } from "@angular/material/select";
import { ProductVendorService } from "../../../services/product-vendor.service";
import { DescriptionService } from "../../../services/description.service";
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-add-prod-desc-dialog",
  standalone: true,
  imports: [
    MatFormField,
    MatError,
    MatDialogActions,
    MatDialogTitle,
    MatInputModule,
    MatDialogClose,
  ],
  templateUrl: "./add-prod-desc-dialog.component.html",
  styleUrl: "./add-prod-desc-dialog.component.css",
})
export class AddProdDescDialogComponent implements OnInit {
  // DI
  dialogRef = inject(MatDialogRef<AddProdDescDialogComponent>);
  productService = inject(ProductVendorService);
  descriptionService = inject(DescriptionService);

  // PROPS
  objType: string = "";
  id: number = 0;
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { objType: string; id: number }
  ) {
    this.objType = data.objType;
    this.id = data.id;
  }
  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    if (this.objType === "Product" && this.id) {
      this.loadProduct(this.id);
    } else if (this.objType === "Description" && this.id) {
      this.loadDescription(this.id);
    }
  }

  loadProduct(obj: any): void {
    console.log(obj);
  }

  loadDescription(obj: any): void {
    console.log(obj);
  }
}
