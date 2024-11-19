import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Constant } from '../../../constant/Constants';

@Component({
  selector: 'app-email-entry-form',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './email-entry-form.component.html',
  styleUrl: './email-entry-form.component.css',
})
export class EmailEntryFormComponent implements OnInit {
  message = Constant.MESSAGES.EMAIL_ENTRY_FORM;
  emailEntryForm: FormGroup = new FormGroup({});
  emailEntryFormObj: any = {
    emailId: '',
    customerId: '',
    productVendor: '',
    description: '',
    remark: '',
    repliedBy: '',
    status: '',
  };

  ngOnInit(): void {
    this.emailEntryForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log('test submit');
  }
}
