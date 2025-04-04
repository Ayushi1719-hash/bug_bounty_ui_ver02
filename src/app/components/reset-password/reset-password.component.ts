import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../app/services.service';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
@Component({

  selector: 'app-reset-password',

  templateUrl: './reset-password.component.html',

  imports:[FormsModule],

  styleUrls: ['./reset-password.component.scss']

})

export class ResetPasswordComponent {

  email = '';

  otp = '';

  newPassword = '';

  message = '';

  error = '';
 
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router,private http: HttpClient) {

    this.route.queryParams.subscribe(params => {

      this.email = params['email'];

      this.otp = params['otp'];

    });

  }
 
  resetPassword() {

    this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe({

      next: (res) => {

        this.message = res.message;

        this.error = '';

        setTimeout(() => this.router.navigate(['/login']), 2000);

      },

      error: (err) => {

        this.error = err.error.message || 'Password reset failed!';

      }

    });

  }

}

 