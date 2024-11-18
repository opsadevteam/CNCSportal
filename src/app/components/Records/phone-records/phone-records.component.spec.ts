import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRecordsComponent } from './phone-records.component';

describe('PhoneRecordsComponent', () => {
  let component: PhoneRecordsComponent;
  let fixture: ComponentFixture<PhoneRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
