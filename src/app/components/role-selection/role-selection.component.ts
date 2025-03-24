import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss']
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}
 
  selectRole(role: string) {
    if (role === 'developer') {
      this.router.navigate(['/developer-bugs']);
    } else {
      this.router.navigate(['/company-dashboard']);
    }
  }
}
 