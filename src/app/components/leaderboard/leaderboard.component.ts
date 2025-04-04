// // File: leaderboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { NavbarComponent } from "../navbar/navbar.component";

// interface Hacker {
//   id: number;
//   name: string;
//   rating: number;
//   numberOfBugs: number;
//   score: number;
//   avatar: string;
//   change?: 'up' | 'down' | null;
// }

// @Component({
//   selector: 'app-leaderboard',
//   templateUrl: './leaderboard.component.html',
//   styleUrls: ['./leaderboard.component.scss'],
//   imports: [CommonModule, NavbarComponent]
// })
// export class LeaderboardComponent implements OnInit {
//   hackers: Hacker[] = [];
//   previousRanking: Map<number, number> = new Map();
//   loading = true;
//   error = false;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     // Load previous rankings from localStorage if available
//     const savedRankings = localStorage.getItem('hackerRankings');
//     if (savedRankings) {
//       this.previousRanking = new Map(JSON.parse(savedRankings));
//     }
    
//     this.fetchLeaderboard();
//   }

//   fetchLeaderboard(): void {
//     this.http.get<Hacker[]>('http://localhost:8081/api/leaderboard').subscribe({
//       next: (data) => {
//         this.hackers = data;
        
//         // Calculate rank changes based on previous rankings
//         this.hackers.forEach((hacker, index) => {
//           const currentRank = index + 1;
//           const previousRank = this.previousRanking.get(hacker.id);
          
//           if (previousRank) {
//             if (previousRank > currentRank) {
//               hacker.change = 'up';
//             } else if (previousRank < currentRank) {
//               hacker.change = 'down';
//             } else {
//               hacker.change = null;
//             }
//           }
          
//           // Update the rankings map
//           this.previousRanking.set(hacker.id, currentRank);
//         });
        
//         // Save current rankings to localStorage
//         localStorage.setItem('hackerRankings', 
//           JSON.stringify(Array.from(this.previousRanking.entries())));
        
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching leaderboard', err);
//         this.error = true;
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

interface Developer {
  id: number;
  name: string;
  rating: number; // Total rewards from backend
  avatar: string;
  change?: 'up' | 'down' | null;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  imports: [CommonModule, NavbarComponent]
})
export class LeaderboardComponent implements OnInit {
  developers: Developer[] = [];
  previousRanking: Map<number, number> = new Map();
  loading = true;
  error = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const savedRankings = localStorage.getItem('developerRankings');
    if (savedRankings) {
      this.previousRanking = new Map(JSON.parse(savedRankings));
    }
    
    this.fetchLeaderboard();
  }

  fetchLeaderboard(): void {
    this.http.get<Developer[]>('http://localhost:8081/api/leaderboard').subscribe({
      next: (data) => {
        this.developers = data;
        
        // Calculate rank changes based on previous rankings
        this.developers.forEach((developer, index) => {
          const currentRank = index + 1;
          const previousRank = this.previousRanking.get(developer.id);
          
          if (previousRank) {
            if (previousRank > currentRank) {
              developer.change = 'up';
            } else if (previousRank < currentRank) {
              developer.change = 'down';
            } else {
              developer.change = null;
            }
          }
          
          // Update the rankings map
          this.previousRanking.set(developer.id, currentRank);
        });
        
        // Save current rankings to localStorage
        localStorage.setItem('developerRankings', 
          JSON.stringify(Array.from(this.previousRanking.entries())));

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching leaderboard', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
