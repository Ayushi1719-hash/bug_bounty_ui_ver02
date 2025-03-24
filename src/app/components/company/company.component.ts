import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
interface Bug {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  techStack: string;
  reward: number;
  status: string;
  createdAt: string;
  developerCount?: number;
  image?: string;
  tags?: string[];
}
 
@Component({
  selector: 'app-company',
  standalone: true,
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  imports: [CommonModule],
})
export class CompanyComponent implements OnInit {
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
 
  constructor(private http: HttpClient, private router: Router) {}
 
  ngOnInit() {
    this.fetchBugs();
  }
 
  fetchBugs() {
    this.http.get<Bug[]>('http://localhost:8081/api/bugs').subscribe((data) => {
      this.bugs = data.map((bug) => ({
        ...bug,
        image: bug.image || 'assets/default-bug.png',
        tags: bug.tags || [],
      }));
      this.filteredBugs = [...this.bugs];
      this.fetchDeveloperCounts();
    });
  }
 
  fetchDeveloperCounts() {
    this.http
      .get<{ bugId: number; developerCount: number }[]>('http://localhost:8081/api/bugs/developers-count')
      .subscribe((data) => {
        this.bugs = this.bugs.map((bug) => ({
          ...bug,
          developerCount: data.find((d) => d.bugId === bug.id)?.developerCount || 0,
        }));
        this.filteredBugs = [...this.bugs];
      });
  }
 
  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: 'status-pending',
      reviewed: 'status-reviewed',
      resolved: 'status-resolved',
    };
    return statusClasses[status.toLowerCase()] || 'status-default';
  }
 
  filterBugs(status: string) {
    if (status.toLowerCase() === 'all') {
      this.filteredBugs = this.bugs;
    } else {
      this.filteredBugs = this.bugs.filter((bug) => bug.status.toLowerCase() === status.toLowerCase());
 
      // If no data exists in the backend, add sample bugs
      if (this.filteredBugs.length === 0) {
        this.filteredBugs = [
          {
            id: 999,
            title: 'Sample Bug',
            description: 'This is a sample reviewed bug.',
            difficulty: 'Medium',
            techStack: 'JavaScript',
            reward: 200,
            status: status,
            createdAt: new Date().toISOString(),
            developerCount: 2,
            image: 'assets/default-bug.png',
            tags: ['frontend', 'bugfix'],
          },
        ];
      }
    }
  }
 
  getTechStackIcon(techStack: string): string {
    const icons: { [key: string]: string } = {
      javascript: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg',
      java: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/java.svg',
      python: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/python.svg',
      react: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg',
      angular: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/angular.svg',
      nodejs: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/nodedotjs.svg',
    };
    return icons[techStack.toLowerCase()] || 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/unknown.svg';
  }
 
  getRelativeTime(timestamp: string): string {
    const now = new Date();
    const postedTime = new Date(timestamp);
    const diff = Math.floor((now.getTime() - postedTime.getTime()) / 1000);
 
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
 
  navigateToPostBugs() {
    this.router.navigate(['/post-bugs']);
  }
}