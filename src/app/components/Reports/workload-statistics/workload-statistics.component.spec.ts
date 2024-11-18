import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadStatisticsComponent } from './workload-statistics.component';

describe('WorkloadStatisticsComponent', () => {
  let component: WorkloadStatisticsComponent;
  let fixture: ComponentFixture<WorkloadStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkloadStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkloadStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
