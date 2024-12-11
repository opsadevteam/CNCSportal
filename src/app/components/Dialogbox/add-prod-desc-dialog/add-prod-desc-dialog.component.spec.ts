import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdDescDialogComponent } from './add-prod-desc-dialog.component';

describe('AddProdDescDialogComponent', () => {
  let component: AddProdDescDialogComponent;
  let fixture: ComponentFixture<AddProdDescDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProdDescDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdDescDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
