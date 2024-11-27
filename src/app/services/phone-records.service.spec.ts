import { TestBed } from '@angular/core/testing';

import { PhoneRecordsService } from './phone-records.service';

describe('PhoneRecordsService', () => {
  let service: PhoneRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
