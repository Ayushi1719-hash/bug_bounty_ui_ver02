import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../app/services.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  otpForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  otpVisible = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      terms: [false, Validators.requiredTrue],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.valid && !this.otpVisible) {
      this.isSubmitting = true;

      this.authService
        .sendOtp(
          this.signupForm.value.fullName,
          this.signupForm.value.email,
          this.signupForm.value.password
        )
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.otpVisible = true;
            this.successMessage =
              response.message || 'OTP sent to your email. Please verify.';
          },
          error: (err) => {
            this.isSubmitting = false;
            this.errorMessage =
              err.error?.message || 'Failed to send OTP. Please try again.';
          },
        });
    } else if (this.signupForm.valid && this.otpVisible && this.otpForm.valid) {
      this.isSubmitting = true;

      this.authService
        .verifyOtp(
          this.signupForm.value.fullName,
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.otpForm.value.otp
        )
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.successMessage =
              response.message || 'Registration successful! You can now login.';
            this.signupForm.reset();
            this.otpForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            this.isSubmitting = false;
            this.errorMessage =
              err.error?.message ||
              'OTP verification failed. Please try again.';
          },
        });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach((key) => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });

      if (this.otpVisible) {
        Object.keys(this.otpForm.controls).forEach((key) => {
          const control = this.otpForm.get(key);
          control?.markAsTouched();
        });
      }
    }

    // if (this.signupForm.valid) {
    //   this.isSubmitting = true;

    //   this.authService
    //     .register(
    //       this.signupForm.value.fullName,
    //       this.signupForm.value.email,
    //       this.signupForm.value.password
    //     )
    //     .subscribe({
    //       next: (response) => {
    //         this.isSubmitting = false;
    //         this.successMessage =
    //           response.message || 'Registration successful! You can now login.';
    //         this.signupForm.reset();
    //         setTimeout(() => {
    //           this.router.navigate(['/login']);
    //         }, 2000);
    //       },
    //       error: (err) => {
    //         this.isSubmitting = false;
    //         this.errorMessage =
    //           err.error?.message || 'Registration failed. Please try again.';
    //       },
    //     });
    // } else {
    //   // Mark all fields as touched to trigger validation messages
    //   Object.keys(this.signupForm.controls).forEach((key) => {
    //     const control = this.signupForm.get(key);
    //     control?.markAsTouched();
    //   });
    // }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
 