import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAndVendorComponent } from './product-and-vendor.component';

describe('ProductAndVendorComponent', () => {
  let component: ProductAndVendorComponent;
  let fixture: ComponentFixture<ProductAndVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAndVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAndVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
