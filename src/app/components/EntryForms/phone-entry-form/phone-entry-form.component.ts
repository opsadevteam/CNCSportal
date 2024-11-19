import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-phone-entry-form',
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
  templateUrl: './phone-entry-form.component.html',
  styleUrl: './phone-entry-form.component.css',
})
export class PhoneEntryFormComponent implements OnInit {
  phoneEntryForm: FormGroup = new FormGroup({});
  phoneEntryFormObj: any = {
    phoneId: '',
    customerId: '',
    productVendor: '',
    description: '',
    remark: '',
    repliedBy: '',
    status: '',
  };

  ngOnInit(): void {
    this.phoneEntryForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log('test submit');
  }
}
