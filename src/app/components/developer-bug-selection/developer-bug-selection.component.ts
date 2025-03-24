import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';
 
@Component({

  selector: 'app-developer-bug-selection',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './developer-bug-selection.component.html',

  styleUrls: ['./developer-bug-selection.component.scss']

})

export class DeveloperBugSelectionComponent implements OnInit {

  difficulties = ['Easy', 'Medium', 'Hard'];

  techStacks = ['Java', 'Spring Boot', 'OAuth', 'Node.js', 'Express', 'MongoDB', 'React', 'CSS', 'MySQL', 'Stripe'];
 
  selectedDifficulty = '';

  selectedTechStack = '';

  bugs: any[] = [];

  filteredBugs: any[] = [];

  noBugsFound = false;
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {

    this.fetchBugs(); // Fetch bugs initially

  }
 
  fetchBugs() {

    const apiUrl = 'http://localhost:8081/api/bugs'; // Change to your actual backend URL

    this.http.get<any[]>(apiUrl).subscribe({

      next: (data) => {

        this.bugs = data;

        this.filteredBugs = data; // Set filteredBugs initially

      },

      error: (err) => {

        console.error('Error fetching bugs:', err);

      }

    });

  }
 
  applyFilters() {

    const apiUrl = 'http://localhost:8081/api/bugs/filter'; // Change based on your backend

    let params = new HttpParams();
 
    if (this.selectedDifficulty) {

      params = params.set('difficulty', this.selectedDifficulty);

    }

    if (this.selectedTechStack) {

      params = params.set('techStack', this.selectedTechStack);

    }
 
    this.http.get<any[]>(apiUrl, { params }).subscribe({

      next: (data) => {

        this.filteredBugs = data;

        this.noBugsFound = this.filteredBugs.length === 0;

      },

      error: (err) => {

        console.error('Error fetching filtered bugs:', err);

        this.filteredBugs = [];

        this.noBugsFound = true;

      }

    });

  }
 
  getTechStackIcon(techStack: string): string {

    const iconMap: { [key: string]: string } = {

      'Java': 'https://cdn-icons-png.flaticon.com/512/226/226777.png',

      'Spring Boot': 'https://cdn-icons-png.flaticon.com/512/919/919841.png',

      'Node.js': 'https://cdn-icons-png.flaticon.com/512/919/919825.png',

      'React': 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png',

      'Angular': 'https://cdn-icons-png.flaticon.com/512/919/919831.png',

      'Python': 'https://cdn-icons-png.flaticon.com/512/1822/1822899.png'

    };
 
    return iconMap[techStack] || 'https://cdn-icons-png.flaticon.com/512/1051/1051277.png';

  }

}

 