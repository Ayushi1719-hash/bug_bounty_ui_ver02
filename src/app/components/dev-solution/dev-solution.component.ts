import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarDevComponent } from "../navbar-dev/navbar-dev.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-dev-solution',
  imports: [CommonModule, NavbarDevComponent, ReactiveFormsModule, NavbarAdminComponent],
  templateUrl: './dev-solution.component.html',
  styleUrl: './dev-solution.component.scss'
})
export class DevSolutionComponent implements OnInit {
  userId: number = localStorage.getItem('userId') as unknown as number;
  bugId: number | null = null;
  createdBy: number | null = null;
  solutionForm: FormGroup;
  submissionMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private http: HttpClient) {
    this.solutionForm = this.fb.group({
      gitRepo: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    // console.log('Current User',this.userId);
  }

  ngOnInit(): void {
    this.bugId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Bug ID received:', this.bugId);
    console.log('Current User',this.userId);
    this.route.queryParams.subscribe(params => {
      this.createdBy = Number(params['createdBy']);
      console.log('Bug ID:', this.bugId, 'Created By:', this.createdBy);
    });
  }

  onSubmit(): void {
    if (this.solutionForm.valid) {
      const submittedData = {
        gitRepoSubmitted: this.solutionForm.value.gitRepo,
        bugId: this.bugId,
        solutionSubmittedBy: this.userId,
        bugPostedBy: this.createdBy
      };
  
      this.http.post('http://localhost:8081/api/submitted-bugs/submit', submittedData).subscribe({
        next: (response: any) => {
          this.submissionMessage = 'Your solution has been successfully submitted! Admin will review it soon.';
          console.log('Response:', response);
          setTimeout(() => {
            this.router.navigate(['/developer']);  // Change to desired route
          }, 5000);
        },
        error: (error: any) => {
          console.error('Error submitting solution:', error);
        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
  

}
