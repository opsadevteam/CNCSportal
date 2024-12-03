import { TestBed } from '@angular/core/testing';

import { TransactionLogsService } from './transaction-logs.service';

describe('TransactionLogsService', () => {
  let service: TransactionLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
