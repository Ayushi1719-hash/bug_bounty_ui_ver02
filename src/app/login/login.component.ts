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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      this.isSubmitting = true;

      this.AuthService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/select-role']);
          },
          error: (err) => {
            this.isSubmitting = false;
            this.errorMessage =
              err.error?.message ||
              'Failed to login. Please check your credentials.';
          },
        });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
 