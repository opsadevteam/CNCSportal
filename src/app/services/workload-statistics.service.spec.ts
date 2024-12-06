import { TestBed } from '@angular/core/testing';

import { WorkloadStatisticsService } from './workload-statistics.service';

describe('WorkloadStatisticsService', () => {
  let service: WorkloadStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkloadStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
