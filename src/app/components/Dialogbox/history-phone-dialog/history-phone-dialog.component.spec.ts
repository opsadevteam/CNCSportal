import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPhoneDialogComponent } from './history-phone-dialog.component';

describe('HistoryPhoneDialogComponent', () => {
  let component: HistoryPhoneDialogComponent;
  let fixture: ComponentFixture<HistoryPhoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPhoneDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPhoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
