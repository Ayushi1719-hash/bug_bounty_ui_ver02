import { Component, OnInit } from '@angular/core';
import { BugDetailsService, BugDetails } from '../../app/bug-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css'],
  imports: [CommonModule]
})
export class BugDetailsComponent implements OnInit {
  bugs: BugDetails[] = [];

  constructor(private bugDetailsService: BugDetailsService) {}

  ngOnInit(): void {
    this.bugDetailsService.getBugDetails().subscribe((data) => {
      this.bugs = data;
    });
  }
}
