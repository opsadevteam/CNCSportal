import { TestBed } from '@angular/core/testing';

import { ProductVendorService } from './product-vendor.service';

describe('ProductVendorService', () => {
  let service: ProductVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
