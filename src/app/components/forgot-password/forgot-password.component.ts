import { Component, NgModule } from '@angular/core';

import { AuthService } from '../../app/services.service';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
@Component({

  selector: 'app-forgot-password',

  templateUrl: './forgot-password.component.html',

  imports:[FormsModule],

  styleUrls: ['./forgot-password.component.scss']

})

export class ForgotPasswordComponent {

  email = '';

  message = '';

  error = '';
 
  constructor(private authService: AuthService, private router: Router, private http:HttpClient) {}
 
  requestOtp() {

    this.authService.forgotPassword(this.email).subscribe({

      next: (res) => {

        this.message = res.message;

        this.error = '';

        this.router.navigate(['/verify-forgot-password-otp'], { queryParams: { email: this.email } });

      },

      error: (err) => {

        this.error = err.error.message || 'Something went wrong!';

      }

    });

  }

}

 