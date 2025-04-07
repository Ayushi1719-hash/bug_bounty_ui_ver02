import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    console.log("canActivate called");

    if (!token) {
      // No token? Block access and redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
