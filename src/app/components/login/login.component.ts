import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../app/services.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Auth } from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NavbarComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth=inject(Auth);
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
          next: (response) => {
            // Store token & role in localStorage or a service
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.roles[0]);
            localStorage.setItem('userId',response.id);
            
  
            // Redirect based on 
            if(response.id==12){
              this.router.navigate(['/admin']);
            }
            else if (response.roles[0]==='company') {
              this.router.navigate(['/company']);
            } else if (response.roles[0]==='developer') {
              this.router.navigate(['/developer']);
            } else {
              this.router.navigate(['/select-role']);  // Default fallback
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            this.errorMessage =
              err.error?.message || 'Failed to login. Please check your credentials.';
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

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  async loginWithGoogle() {

    try {

      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());

      console.log("✅ Google Login Success:", result.user);

      localStorage.setItem('token',await result.user.getIdToken());

      this.router.navigate(['/select-role']);

    } catch (error) {

      console.error("❌ Google Login Error:", error);

    }

  }

  async loginWithGitHub() {

    try {

      const result = await signInWithPopup(this.auth, new GithubAuthProvider());

      console.log("✅ GitHub Login Success:", result.user);

      localStorage.setItem('token',await result.user.getIdToken());

      this.router.navigate(['/select-role']);

    } catch (error) {

      console.error("❌ GitHub Login Error:", error);

    }

  }
 

}
 