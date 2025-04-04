import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../app/services.service';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-verify-forgot-password-otp',
  templateUrl: './verify-forgot-password-otp.component.html',
  imports:[FormsModule],
  styleUrls: ['./verify-forgot-password-otp.component.scss']
})
export class VerifyForgotPasswordOtpComponent {
  email = '';
  otp = '';
  message = '';
  error = '';
 
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
 
  verifyOtp() {
    if (!this.otp) {
      this.error = 'Please enter the OTP!';
      return;
    }
 
    this.authService.verifyForgotPasswordOtp(this.email, this.otp).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = '';
        this.router.navigate(['/reset-password'], { queryParams: { email: this.email, otp: this.otp } });
      },
      error: (err) => {
        this.error = err.error.message || 'Invalid OTP!';
      }
    });
  }
 
  resendOtp(event: Event) {
    event.preventDefault(); // Prevent page reload
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = 'OTP Resent Successfully!';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to resend OTP!';
      }
    });
  }
}