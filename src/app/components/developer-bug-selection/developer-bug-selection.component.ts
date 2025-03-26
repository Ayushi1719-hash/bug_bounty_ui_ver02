import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BugService } from '../../app/bug.service';
import { Bug } from './bug.model';
 
@Component({
  selector: 'app-developer-bug-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'developer-bug-selection.component.html',
  styleUrls: ['developer-bug-selection.component.scss']
})
export class DeveloperBugSelectionComponent implements OnInit {
  difficulties = ['Easy', 'Medium', 'Hard'];
  techStacks = ['Java', 'Python', 'C++'];
 
  selectedDifficulty = '';
  selectedTechStack = '';
 
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  noBugsFound = false;
 
  constructor(private bugService: BugService, private http: HttpClient) {}
 
  ngOnInit() {
    this.fetchBugs();
  }
 
  fetchBugs() {
    this.bugService.getBugs().subscribe({
      next: (data: Bug[]) => {
        console.log('Fetched bugs:', data);
        this.bugs = data;
        this.filteredBugs = [...this.bugs]; // Ensure all bugs are displayed initially
        this.noBugsFound = this.bugs.length === 0;
      },
      error: (err: any) => {
        console.error('Error fetching bugs:', err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
  }
 
  applyFilters() {
    if (!this.selectedDifficulty && !this.selectedTechStack) {
      console.log("No filters applied, showing all bugs");
      this.filteredBugs = [...this.bugs];
      this.noBugsFound = this.filteredBugs.length === 0;
      return;
    }
 
    const apiUrl = 'http://localhost:8081/api/bugs/filter';
    let params = new HttpParams();
 
    if (this.selectedDifficulty) {
      params = params.set('difficulty', this.selectedDifficulty);
    }
    if (this.selectedTechStack) {
      params = params.set('techStack', this.selectedTechStack);
    }
 
    this.http.get<Bug[]>(apiUrl, { params }).subscribe({
      next: (data: Bug[]) => {
        console.log('Filtered bugs:', data);
        if (data.length === 0) {
          this.fetchRelatedBugs();
        } else {
          this.filteredBugs = data;
          this.noBugsFound = false;
        }
      },
      error: (err: any) => {
        console.error('Error fetching filtered bugs:', err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
  }
 
  fetchRelatedBugs() {
    let params = new HttpParams();
    if (this.selectedDifficulty) {
      params = params.set('difficulty', this.selectedDifficulty);
    }
    if (this.selectedTechStack) {
      params = params.set('techStack', this.selectedTechStack);
    }
 
    const apiUrl = 'http://localhost:8081/api/bugs/related';
 
    this.http.get<Bug[]>(apiUrl, { params }).subscribe({
      next: (relatedBugs: Bug[]) => {
        if (relatedBugs.length > 0) {
          this.filteredBugs = relatedBugs;
          alert('No exact match found, but here are some related bugs.');
        } else {
          this.filteredBugs = [];
          this.noBugsFound = true;
          alert('No bugs found. Try different filters or check back later.');
        }
      },
      error: (err: any) => {
        console.error('Error fetching related bugs:', err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
  }
}
 
 