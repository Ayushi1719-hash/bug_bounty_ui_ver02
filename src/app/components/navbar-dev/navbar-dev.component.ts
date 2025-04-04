import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-dev',
  imports: [],
  templateUrl: './navbar-dev.component.html',
  styleUrl: './navbar-dev.component.scss'
})
export class NavbarDevComponent {
  @Output() solvedBugsClicked = new EventEmitter<void>();

  showSolvedBugs() {
    this.solvedBugsClicked.emit(); // Notify the parent component
  }

  @Output() acceptedBugsClicked = new EventEmitter<void>();

  showAcceptedBugs() {
    this.acceptedBugsClicked.emit(); // Notify the parent component
  }

  @Output() rejectedBugsClicked = new EventEmitter<void>();

  showRejectedBugs() {
    this.rejectedBugsClicked.emit(); // Notify the parent component
  }

  totalReward: number = 0;
  userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTotalReward();
  }

  fetchTotalReward() {
    if (!this.userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const url = `http://localhost:8081/api/leaderboard/total-reward/${this.userId}`;

    this.http.get<number>(url).subscribe({
      next: (reward) => {
        this.totalReward = reward || 0; // If null, set to 0
      },
      error: (err) => {
        console.error("Error fetching total reward:", err);
      }
    });
  }


}
