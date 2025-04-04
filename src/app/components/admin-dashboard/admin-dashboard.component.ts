import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, NavbarAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userBugs: any[] = [];
  companyUsers: any[] = []; // Store company users
  selectedTab: string = 'manageDeveloper';
  expandedDeveloper: number | null = null; // Track which developer's row is expanded
  developerBugs: { [key: number]: any[] } = {};

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  reviewSolution(bugId: number,gitRepoSubmitted:string,id:number) {
    this.router.navigate(['/github', bugId,gitRepoSubmitted,id]); // Navigate to GitHub component with bugId
  }

  ngOnInit(): void {
    this.fetchDevelopers();
    this.fetchCompanies();
  }

  fetchDevelopers() {
    this.http.get<any[]>('http://localhost:8081/api/users/developers')
      .subscribe(data => {
        this.userBugs = data;
        this.cdr.detectChanges(); 
      }, error => {
        console.error("Error fetching developers", error);
      });
  }

  fetchCompanies() {
    this.http.get<any[]>('http://localhost:8081/api/users/companies')
      .subscribe(data => {
        this.companyUsers = data;
        this.cdr.detectChanges();
      }, error => {
        console.error("Error fetching companies", error);
      });
  }
  

  removeUser(userId: number) {
    if (confirm("Are you sure you want to remove this user?")) {
      this.http.delete(`http://localhost:8081/api/users/${userId}`, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.userBugs = this.userBugs.filter(user => user.id !== userId);
            this.companyUsers = this.companyUsers.filter(user => user.id !== userId);
            this.cdr.detectChanges(); // Fetch updated user list
          },
          error: (error) => {
            console.error("Error deleting user", error);
          }
        });
    }
  } 
  
  toggleBugs(developerId: number) {
    if (this.expandedDeveloper === developerId) {
      this.expandedDeveloper = null; // Collapse if already expanded
    } else {
      this.expandedDeveloper = developerId;

      // Fetch bugs only if not already loaded
      if (!this.developerBugs[developerId]) {
        this.http.get<any[]>(`http://localhost:8081/api/submitted-bugs/developer/${developerId}`)
          .subscribe(bugs => {
            this.developerBugs[developerId] = bugs.map(bug => ({
              bugId: bug.bugId,
              bugTitle: bug.bugTitle,
              bugPostedBy: bug.bugPostedBy,
              gitRepoSubmitted:bug.gitRepoSubmitted
            }));
            this.cdr.detectChanges();
          }, error => {
            console.error("Error fetching bugs for developer", error);
          });
      }
    }
  }

  

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}