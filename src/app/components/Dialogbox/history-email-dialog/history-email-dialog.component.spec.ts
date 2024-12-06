import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEmailDialogComponent } from './history-email-dialog.component';

describe('HistoryEmailDialogComponent', () => {
  let component: HistoryEmailDialogComponent;
  let fixture: ComponentFixture<HistoryEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryEmailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
