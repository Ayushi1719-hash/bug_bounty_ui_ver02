import { Component, OnInit } from '@angular/core';
import { BugService } from './bug.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCompComponent } from "../navbar-comp/navbar-comp.component";
import { NavbarDevComponent } from "../navbar-dev/navbar-dev.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-company-edit-bug',
  templateUrl: './company-edit-bug.component.html',
  styleUrls: ['./company-edit-bug.component.scss'],
  imports: [FormsModule, NavbarCompComponent, NavbarDevComponent, CommonModule, NavbarAdminComponent]
})
export class CompanyEditBugComponent implements OnInit {
  bugId: number = 0;
  bugData: any = {
    title: '',
    description: '',
    difficulty: '',
    reward: null,
    deadline: '',
    gitRepo: '',
    techStack: '',
    zipFilePath: null,
    pdfFilePath: null,
    zipFile: null,
    pdfFile: null,
    status:'',
  };
  zipFileName: string = '';

  constructor(
    private route: ActivatedRoute,
    private bugService: BugService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.bugId = this.route.snapshot.params['id'];
    this.loadBugDetails();
  }

  loadBugDetails(): void {
    this.bugService.getBugById(this.bugId).subscribe(
      data => {
        this.bugData = data;
        console.log("Bug data",data);
        if (data.zipFilePath) {
          this.bugData.zipFilePath = data.zipFilePath;
        }
        if (data.pdfFilePath) {
          this.bugData.pdfFilePath = data.pdfFilePath;
        }
      }, // Load data into form fields
      error => {
        alert('Error loading bug details');
      }
    );
  }

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'zipFilePath' && file.name.endsWith('.zip')) {
        this.bugData.zipFilePath = null; // Clear old file path
        this.bugData.zipFile = file;
        return;
      } 
      if (fileType === 'pdfFilePath' && file.name.endsWith('.pdf')) {
        this.bugData.pdfFilePath = null; // Clear old file path
        this.bugData.pdfFile = file;
        return;
      }
      
      // alert('Invalid file type. Please select a valid ZIP or PDF file.');
    }
  }

  

  onSubmit(): void {
    const formData = new FormData();
    console.log("this.bugData",this.bugData);
    formData.append('bug', JSON.stringify(this.bugData));

    if (this.bugData.zipFile) {
      formData.append('zipFile', this.bugData.zipFile);
    }
    if (this.bugData.pdfFile) {
      formData.append('pdfFile', this.bugData.pdfFile);
    }

    this.bugService.updateBug(this.bugId, formData).subscribe(
      response => {
        alert('Bug updated successfully!');
        this.router.navigate(['/company']);  // Redirect to the company dashboard
      },
      error => {
        alert('Error updating bug!');
      }
    );
  }

  getFileName(filePath: string): string {
    return filePath ? filePath.split('/').pop() || 'Download File' : '';
  }

  // downloadZip(): void {
  //   const url = `http://localhost:8081/api/bugsEntry/zip/${this.bugId}`;
  //   this.http.get(url, { responseType: 'blob' }).subscribe((zipBlob) => {
  //     const zipUrl = window.URL.createObjectURL(zipBlob);
  //     const a = document.createElement('a');
  //     a.href = zipUrl;
  //     a.download = this.zipFileName || `bug-${this.bugId}.zip`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   });
  // }
 
  // downloadPdf(): void {
  //   const url = `http://localhost:8081/api/bugsEntry/pdf/${this.bugId}`;
  //   this.http.get(url, { responseType: 'blob' }).subscribe((pdfBlob) => {
  //     const pdfUrl = window.URL.createObjectURL(pdfBlob);
  //     const a = document.createElement('a');
  //     a.href = pdfUrl;
  //     a.download = `bug-${this.bugId}.pdf`; // You can modify this if the name is dynamic
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   });
  // }

  goBack(): void {
    window.history.back();
  }
  
}