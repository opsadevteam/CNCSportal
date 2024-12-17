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
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {
  ProductCreate,
  ProductUpdate,
} from "../../../Models/interface/product-vendor.model";
import { NgIf } from "@angular/common";
import { ProductLogService } from "../../../services/product-log.service";
import { ProductLog } from "../../../Models/interface/product-log.model";

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
  deleteDialogRef = inject(MatDialogRef<ProductDialogComponent>);
  productService = inject(ProductVendorService);
  productLogService = inject(ProductLogService);
  fb = inject(FormBuilder);
  //#endregion

  //#region PROPS
  form: FormGroup;
  prodDesc?: any;
  isSubmitting: boolean = false;
  //#endregion

  //#region CTOR
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { prodDesc?: any }
  ) {
    this.prodDesc = data.prodDesc;
    this.form = this.fb.group({
      Name: ["", [Validators.required, this.noBlankOrMultipleSpacesValidator]],
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
    if (this.prodDesc != null) {
      this.form.patchValue({
        Name: this.prodDesc.name,
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
      next: (createdId) => {
        this.deleteDialogRef.close(true);
        this.addProductLogs("CREATE", createdId.id);
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

  private addProductLogs(action: string, id: any): void {
    const productLog: ProductLog = {
      id: 0,
      details: this.form.value.Name,
      activity: action,
      addedBy: "admin",
      dateAdded: new Date(),
      productVendorId: id,
    };
    this.productLogService.addProductLogs(productLog).subscribe();
    console.log(productLog);
  }

  private updateProduct(): void {
    const product: ProductUpdate = this.form.value as ProductUpdate;
    this.productService.updateProduct(this.prodDesc.id, product).subscribe({
      next: () => {
        this.deleteDialogRef.close(true);
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

    if (this.prodDesc) {
      this.updateProduct();
      this.addProductLogs("UPDATE", this.prodDesc.id);
    } else {
      this.addProduct();
    }
  }

  // Custom Validator to check blank or multiple spaces
  noBlankOrMultipleSpacesValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value || "";
    const hasOnlySpaces = value.trim().length === 0;
    if (hasOnlySpaces) {
      return { invalidDescription: true };
    }
    return null;
  }
  //#endregion
}
