import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecordsComponent } from './email-records.component';

describe('EmailRecordsComponent', () => {
  let component: EmailRecordsComponent;
  let fixture: ComponentFixture<EmailRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
