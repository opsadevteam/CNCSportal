import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField } from '@angular/material/form-field';
import { ProductVendorService } from '../../../services/product-vendor.service';
import { DescriptionService } from '../../../services/description.service';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductCreate } from '../../../Models/interface/product-vendor.model';

@Component({
  selector: 'app-add-prod-desc-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatError,
    MatDialogActions,
    MatDialogTitle,
    MatInputModule,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './add-prod-desc-dialog.component.html',
  styleUrl: './add-prod-desc-dialog.component.css',
})
export class AddProdDescDialogComponent implements OnInit {
  // DI
  dialogRef = inject(MatDialogRef<AddProdDescDialogComponent>);
  productService = inject(ProductVendorService);
  descriptionService = inject(DescriptionService);
  fb = inject(FormBuilder);

  // PROPS
  form: FormGroup;
  objType: string = '';
  id: number = 0;
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { objType: string; id: number }
  ) {
    this.objType = data.objType;
    this.id = data.id;
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    if (this.objType === 'Product' && this.id) {
      this.loadProduct(this.id);
    } else if (this.objType === 'Description' && this.id) {
      this.loadDescription(this.id);
    }
  }

  private addProduct(): void {
    const product: ProductCreate = {
      ...this.form.value,
      addedBy: 'Admin',
      dateAdded: new Date(),
      isDeleted: false,
    };
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error adding product', err);
      },
    });
  }

  loadProduct(obj: any): void {
    console.log(obj);
  }

  loadDescription(obj: any): void {
    console.log(obj);
  }

  submit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    if (this.objType === 'Product') this.addProduct();
  }
}
