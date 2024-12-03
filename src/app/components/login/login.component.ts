import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({}); // Init
  hide: boolean = true;
  loginObj: any = {
    username: '',
    password: '',
  };
  constructor() {}

  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (
      this.loginObj.username == 'admin' &&
      this.loginObj.password == 'admin'
    ) {
      this.router.navigateByUrl('/phonerecords');
      localStorage.setItem('empErpUser', this.loginObj.username);
      //this.isLoading = false;
    } else {
      alert('Invalid Account!');
      //this.isLoading = false;
    }
  }
}
