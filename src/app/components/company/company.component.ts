import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarCompComponent } from "../navbar-comp/navbar-comp.component";

interface Bug {
  reward: number;
  status: string;
    id: number;
    title: string;
    description: string;
    difficulty: string;
    techStack: string;
    pdfFilePath?: string;
    zipFilePath?: string;
    createdBy: number;
  }
 
@Component({
  selector: 'app-company',
  standalone: true,
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  imports: [CommonModule, NavbarCompComponent, RouterModule],
})
export class CompanyComponent implements OnInit {
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  noBugsFound: boolean = false;
  userId: number = localStorage.getItem('userId') as unknown as number;  // Replace with actual logged-in user ID

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserBugs(this.userId);
  }

  fetchUserBugs(userId: number) {
    console.log(userId);
    this.http.get<Bug[]>('http://localhost:8081/api/bugsEntry/user/' + userId).subscribe({
      next: (data) => {
        console.log(data);
        this.bugs = data;
        this.filteredBugs = [...this.bugs];
        this.noBugsFound = this.filteredBugs.length === 0;
      },
      error: (err) => {
        console.error('Error fetching user-specific bugs:', err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
}

fetchResolvedUserBugs(userId: number) {
  console.log(userId);
  this.http.get<Bug[]>(`http://localhost:8081/api/bugsEntry/user/${userId}/resolved`).subscribe({
    next: (data) => {
      console.log(data);
      this.bugs = data;
      this.filteredBugs = [...this.bugs];
      this.noBugsFound = this.filteredBugs.length === 0;
    },
    error: (err) => {
      console.error('Error fetching user-specific bugs:', err);
      this.filteredBugs = [];
      this.noBugsFound = true;
    }
  });
}

fetchReviewedUserBugs(userId: number) {
  console.log(userId);
  this.http.get<Bug[]>(`http://localhost:8081/api/bugsEntry/user/${userId}/reviewed`).subscribe({
    next: (data) => {
      console.log(data);
      this.bugs = data;
      this.filteredBugs = [...this.bugs];
      this.noBugsFound = this.filteredBugs.length === 0;
    },
    error: (err) => {
      console.error('Error fetching user-specific bugs:', err);
      this.filteredBugs = [];
      this.noBugsFound = true;
    }
  });
}
  
}