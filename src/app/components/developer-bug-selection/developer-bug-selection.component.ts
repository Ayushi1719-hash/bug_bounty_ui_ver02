import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BugEntry } from './bug-entry.model';
import { Router, RouterModule } from '@angular/router';
import { NavbarDevComponent } from "../navbar-dev/navbar-dev.component";

interface Bug {
  id: number;
  bugId: number;
  title: string;
  description: string;
  difficulty: string;
  techStack: string;
  reward: number;
  status: string;
  gitRepoSubmitted: string;
  pdfFilePath?: string;
  zipFilePath?: string;
}

@Component({
  selector: 'app-developer-bug-selection',
  templateUrl: 'developer-bug-selection.component.html',
  styleUrls: ['developer-bug-selection.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule, NavbarDevComponent]
})
export class DeveloperBugSelectionComponent implements OnInit {
  showFilters: boolean = true; // Default: show filters
  difficulties = ['easy', 'medium', 'hard'];
  techStacks = ['java', 'python', 'c++'];

  selectedDifficulty = '';
  selectedTechStack = '';
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  noBugsFound = false;
  userId: number = localStorage.getItem('userId') as unknown as number;
  

  private apiUrl = 'http://localhost:8081/api/bugsEntry';

  constructor(private http: HttpClient,private router: Router) {
    console.log("Current User",this.userId);
  }

  viewBugDetails(bugId: number) {
    this.router.navigate(['/bug-details', bugId]);
    console.log("BugId",bugId);
  }

  ngOnInit() {
    this.fetchBugs();
  }

  getBugs(difficulty: string | null, techStack: string | null) {
    const params: any = {};
    if (difficulty) params['difficulty'] = difficulty;
    if (techStack) params['techStack'] = techStack;
  
    return this.http.get<BugEntry[]>(this.apiUrl, { params });
  }
  

  fetchBugs() {
    this.http.get<Bug[]>('http://localhost:8081/api/bugsEntry/all').subscribe({
      next: (data) => {
        console.log(data);
        this.bugs = data;
        this.filteredBugs = [...this.bugs];
        this.noBugsFound = this.filteredBugs.length === 0;
        this.showFilters = true;
      },
      error: (err) => {
        console.error('Error fetching bugs:', err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
  }

  applyFilters() {
    let params = new HttpParams();
    
    if (this.selectedDifficulty && this.selectedDifficulty !== '') {
      params = params.set('difficulty', this.selectedDifficulty);
    }
    if (this.selectedTechStack && this.selectedTechStack !== '') {
      params = params.set('techStack', this.selectedTechStack);
    }
  
    this.http.get<Bug[]>('http://localhost:8081/api/bugsEntry/filter', { params }).subscribe({
      next: (data) => {
        console.log(params);
        console.log("Filtered bugs:", data);
        this.filteredBugs = data;

        this.noBugsFound = this.filteredBugs.length === 0;
      },
      error: (err) => {
        console.error("Error fetching filtered bugs:", err);
        this.filteredBugs = [];
        this.noBugsFound = true;
      }
    });
  }

  

  showSolvedBugs() {
    if (!this.userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    const url = `http://localhost:8081/api/submitted-bugs/submitted/details/${this.userId}`;
  
    this.http.get<any[]>(url).subscribe({
      next: (submittedBugs) => {
        console.log("Submitted bugs:", submittedBugs);
  
        // Fetch bug titles for each bugId
        const bugDetailsRequests = submittedBugs.map(bug =>
          this.http.get<any>(`http://localhost:8081/api/bugsEntry/${bug.bugId}`)
        );
  
        Promise.all(bugDetailsRequests.map(req => req.toPromise()))
          .then(bugDetails => {
            this.filteredBugs = submittedBugs.map((bug, index) => ({
              id: bug.id,
              bugId: bug.bugId,
              title: bugDetails[index]?.title || `Bug #${bug.bugId}`, // Fetch title
              description: bug.description,
              difficulty: bug.difficulty,
              techStack: bug.techStack,
              reward: bug.reward,
              status: "Solved",
              gitRepoSubmitted: bug.gitRepoSubmitted
            }));
  
            this.noBugsFound = this.filteredBugs.length === 0;
            this.showFilters = false;
          })
          .catch(error => {
            console.error("Error fetching bug details:", error);
            this.noBugsFound = true;
            
          });
      },
      error: (err) => {
        console.error("Error fetching solved bugs:", err);
        this.filteredBugs = [];
        this.noBugsFound = true;
        this.showFilters = true;
      }
    });
  }


  showAcceptedBugs() {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    const url = `http://localhost:8081/api/leaderboard/accepted/${userId}`;
  
    this.http.get<any[]>(url).subscribe({
      next: (acceptedBugs) => {
        console.log("Accepted bugs:", acceptedBugs);
  
        // Fetch bug details for each accepted bug
        const bugDetailsRequests = acceptedBugs.map(bug =>
          this.http.get<any>(`http://localhost:8081/api/bugsEntry/${bug.bugId}`)
        );
  
        // Fetch all details and map them to our bug list
        Promise.all(bugDetailsRequests.map(req => req.toPromise()))
          .then(bugDetails => {
            this.filteredBugs = acceptedBugs.map((bug, index) => ({
              id: bug.bugId,
              bugId: bug.bugId,
              title: bugDetails[index]?.title || `Bug #${bug.bugId}`,
              description: bugDetails[index]?.description || "No description available",
              difficulty: bugDetails[index]?.difficulty || "N/A",
              techStack: bugDetails[index]?.techStack || "N/A",
              reward: bug.reward,
              status: "Accepted",
              gitRepoSubmitted: bug.gitRepoSubmitted || ""
            }));
  
            this.noBugsFound = this.filteredBugs.length === 0;
            this.showFilters = false;
          })
          .catch(error => {
            console.error("Error fetching bug details:", error);
            this.noBugsFound = true;
          });
      },
      error: (err) => {
        console.error("Error fetching accepted bugs:", err);
        this.filteredBugs = [];
        this.noBugsFound = true;
        this.showFilters = true;
      }
    });
  }

  showRejectedBugs() {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    const url = `http://localhost:8081/api/rejected/developer/${userId}`;
  
    this.http.get<any[]>(url).subscribe({
      next: (rejectedBugs) => {
        console.log("Rejected bugs:", rejectedBugs);
  
        // Fetch bug details for each rejected bug
        const bugDetailsRequests = rejectedBugs.map(bug =>
          this.http.get<any>(`http://localhost:8081/api/bugsEntry/${bug.bugId}`)
        );
  
        // Fetch all details and map them to our bug list
        Promise.all(bugDetailsRequests.map(req => req.toPromise()))
          .then(bugDetails => {
            this.filteredBugs = rejectedBugs.map((bug, index) => ({
              id: bug.bugId,
              bugId: bug.bugId,
              title: bugDetails[index]?.title || `Bug #${bug.bugId}`,
              description: bugDetails[index]?.description || "No description available",
              difficulty: bugDetails[index]?.difficulty || "N/A",
              techStack: bugDetails[index]?.techStack || "N/A",
              reward: bug.reward,
              status: "Rejected",
              gitRepoSubmitted: bug.gitRepoSubmitted || ""
            }));
  
            this.noBugsFound = this.filteredBugs.length === 0;
            this.showFilters = false;
          })
          .catch(error => {
            console.error("Error fetching bug details:", error);
            this.noBugsFound = true;
          });
      },
      error: (err) => {
        console.error("Error fetching rejected bugs:", err);
        this.filteredBugs = [];
        this.noBugsFound = true;
        this.showFilters = true;
      }
    });
  }
  
  
  
  
  
  
}

 
 