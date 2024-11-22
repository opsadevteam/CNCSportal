import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneEntryFormComponent } from './phone-entry-form.component';

describe('PhoneEntryFormComponent', () => {
  let component: PhoneEntryFormComponent;
  let fixture: ComponentFixture<PhoneEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
