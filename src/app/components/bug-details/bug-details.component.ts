import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BugService } from '../bug-form/bug.service';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppPdfViewerComponent } from "../pdf-viewer/pdf-viewer.component";
import { NavbarDevComponent } from "../navbar-dev/navbar-dev.component";
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

interface Bug {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  techStack: string;
  deadline: string;
  reward: number;
  status: string;
  gitRepo: string;
  createdBy:number;
}

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    AppPdfViewerComponent,
    RouterModule,
    NavbarDevComponent,
    NavbarAdminComponent
]
})
export class BugDetailsComponent implements OnInit {
  bug: Bug | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private bugService: BugService
  ) {}

  ngOnInit(): void {
    const bugId = this.route.snapshot.paramMap.get('id');
    if (bugId) {
      this.loading = true;
      this.bugService.getBugById(+bugId).subscribe({
        next: (data) => {
          console.log(data);
          this.bug = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load bug details';
          this.loading = false;
          console.error('Error fetching bug details', err);
        }
      });
    }
  }

  getDifficultyColor(difficulty: string): string {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  }

  getStatusColor(status: string): string {
    switch(status.toLowerCase()) {
      case 'open': return 'bg-blue-500';
      case 'reviewed': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }
}
