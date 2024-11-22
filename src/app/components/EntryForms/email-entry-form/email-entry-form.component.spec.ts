import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEntryFormComponent } from './email-entry-form.component';

describe('EmailEntryFormComponent', () => {
  let component: EmailEntryFormComponent;
  let fixture: ComponentFixture<EmailEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
