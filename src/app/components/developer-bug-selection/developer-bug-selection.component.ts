import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-developer-bug-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './developer-bug-selection.component.html',
  styleUrls: ['./developer-bug-selection.component.scss']
})
export class DeveloperBugSelectionComponent implements OnInit {
  difficulties = ['Easy', 'Medium', 'Hard'];
  techStacks = ['Angular', 'React', 'Spring Boot', 'Node.js', 'Python'];
 
  selectedDifficulty = '';
  selectedTechStack = '';
  bugs: any[] = [];
  filteredBugs: any[] = [];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.fetchBugs();
  }
 
  fetchBugs() {
    this.http.get<any[]>('http://localhost:8081/api/bugs/filter').subscribe({
      next: (data) => {
        this.bugs = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching bugs:', err);
      }
    });
  }
 
  applyFilters() {
    this.filteredBugs = this.bugs.filter(bug =>
      (!this.selectedDifficulty || bug.difficulty === this.selectedDifficulty) &&
      (!this.selectedTechStack || bug.techStack.includes(this.selectedTechStack))
    );
  }
}
 