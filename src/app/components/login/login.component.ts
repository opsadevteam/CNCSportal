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
import { AccountLoginService } from '../../services/account-login.service';

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
  loginService = inject(AccountLoginService);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    this.loginService.logInAccountRequest(this.loginObj).subscribe(
      (res) => {
        this.router.navigateByUrl('/phonerecords');
        localStorage.setItem('username', this.loginObj.username);
        localStorage.setItem('jwtToken', res.accessToken);
        localStorage.setItem('fullName', res.fullName);
        localStorage.setItem('userGroup', res.userGroup);
        //this.isLoading = false;
      },
      (error) => {
        alert('Invalid Account!');
        //this.isLoading = false;
      }
    );
  }
}
