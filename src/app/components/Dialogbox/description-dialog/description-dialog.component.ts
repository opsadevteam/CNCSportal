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
  Product,
  ProductCreate,
  ProductUpdate,
} from "../../../Models/interface/product-vendor.model";
import { NgIf } from "@angular/common";
import {
  Description,
  DescriptionCreate,
} from "../../../Models/interface/product-description.model";

@Component({
  selector: "app-description-dialog",
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
  templateUrl: "./description-dialog.component.html",
  styleUrl: "./description-dialog.component.css",
})
export class DescriptionDialogComponent {
  //#region SIGNAL
  protected readonly value = signal("");
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  //#endregion

  //#region DI
  dialogRef = inject(MatDialogRef<DescriptionDialogComponent>);
  descriptionService = inject(DescriptionService);
  fb = inject(FormBuilder);
  //#endregion

  //#region PROPS
  form: FormGroup;
  product: Product = null!;
  description?: Description;
  isSubmitting: boolean = false;
  //#endregion

  //#region CTOR
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; description?: Description }
  ) {
    this.product = data.product;
    this.description = data.description;
    this.form = this.fb.group({
      id: [null],
      Description: ["", [Validators.required]],
    });
  }
  //#endregion

  //#region HOOK
  ngOnInit(): void {
    this.initializeObj();
  }

  //#region METHODS
  private initializeObj(): void {
    if (this.description != null) {
      this.form.patchValue({
        id: this.description.id,
        Description: this.description.description,
      });
    }
  }

  private addDescription(): void {
    const description: DescriptionCreate = {
      ...this.form.value,
      addedBy: "Admin",
      dateAdded: new Date(),
      isDeleted: false,
      productVendorId: this.product?.id,
    };
    this.descriptionService.addDescription(description).subscribe({
      next: () => {
        this.dialogRef.close(true);
        alert("Description successfully added");
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.form.get("Description")?.setErrors({ DescriptionTaken: true });
        } else {
          console.error("Error adding of description", err);
        }
      },
    });
  }

  private updateDescription(): void {
    const description: Description = this.form.value as Description;
    this.descriptionService
      .updateDescription(description.id, description)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          alert("Description successfully updated");
        },
        error: (err) => {
          this.isSubmitting = false;
          if (err.status === 409) {
            this.form.get("Description")?.setErrors({ DescriptionTaken: true });
          } else {
            console.error("Error updating of description", err);
          }
        },
      });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    if (this.description) {
      this.updateDescription();
    } else {
      this.addDescription();
    }
  }
  //#endregion
}
