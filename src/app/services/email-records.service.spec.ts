import { TestBed } from '@angular/core/testing';

import { EmailRecordsService } from './email-records.service';

describe('EmailRecordsService', () => {
  let service: EmailRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
