import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = localStorage.getItem('userRole');
    console.log(userRole);
    console.log(expectedRole);
    console.log("canActivate called from role guard");

    if (userRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
