import { Component, Inject, inject, OnInit, signal } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatError, MatFormField, MatHint } from "@angular/material/form-field";
import { ProductVendorService } from "../../../services/product-vendor.service";
import { DescriptionService } from "../../../services/description.service";
import { MatInputModule } from "@angular/material/input";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  ProductCreate,
  ProductUpdate,
} from "../../../Models/interface/product-vendor.model";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-product-dialog",
  standalone: true,
  imports: [
    MatFormField,
    MatError,
    MatDialogActions,
    MatDialogTitle,
    MatInputModule,
    MatDialogClose,
    ReactiveFormsModule,
    MatHint,
    NgIf,
  ],
  templateUrl: "./product-dialog.component.html",
  styleUrl: "./product-dialog.component.css",
})
export class ProductDialogComponent implements OnInit {
  //#region SIGNAL
  protected readonly value = signal("");
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  //#endregion

  //#region DI
  dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  productService = inject(ProductVendorService);
  fb = inject(FormBuilder);
  //#endregion

  //#region PROPS
  form: FormGroup;
  product?: any;
  isSubmitting: boolean = false;
  //#endregion

  //#region CTOR
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { product?: any }
  ) {
    this.product = data.product;
    this.form = this.fb.group({
      Name: ["", [Validators.required]],
    });
  }
  //#endregion

  //#region HOOK
  ngOnInit(): void {
    this.initializeObj();
  }
  //#endregion

  //#region METHODS
  private initializeObj(): void {
    if (this.product != null) {
      this.form.patchValue({
        Name: this.product.name,
      });
    }
  }

  private addProduct(): void {
    const product: ProductCreate = {
      ...this.form.value,
      addedBy: "Admin",
      dateAdded: new Date(),
      isDeleted: false,
    };
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.dialogRef.close(true);
        alert("Product successfully added");
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.form.get("Name")?.setErrors({ ProductTaken: true });
        } else {
          console.error("Error adding of product", err);
        }
      },
    });
  }

  private updateProduct(): void {
    const product: ProductUpdate = this.form.value as ProductUpdate;
    this.productService.updateProduct(this.product.id, product).subscribe({
      next: () => {
        this.dialogRef.close(true);
        alert("Product successfully updated");
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.form.get("Name")?.setErrors({ ProductTaken: true });
        } else {
          console.error("Error updating of product", err);
        }
      },
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    if (this.product) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }
  //#endregion
}
