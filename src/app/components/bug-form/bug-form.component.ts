import { Component } from '@angular/core';
import { BugService } from './bug.service';
import { Bug } from './bug.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/services.service';
// import { AuthService } from '../../../services.service';
 
@Component({
  selector: 'app-bug-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent {
  selectedFile: File | null = null;
  selectedPdfFile: File | null = null;

  // selectedTechStack: string[] = [];
 
  bugForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    difficulty: new FormControl('easy', Validators.required),
    techStack: new FormControl('java', Validators.required),
    reward: new FormControl(1000, [Validators.required, Validators.min(1000)]),
    deadline: new FormControl('', Validators.required),
    gitRepo: new FormControl('', Validators.required),
    zipFilePath: new FormControl<File | null>(null, Validators.required),
    pdfFilePath: new FormControl<File | null>(null, Validators.required)
    });
 
  constructor(private bugService: BugService, private http: HttpClient, private authService: AuthService) {}
 
  // addTech(input: HTMLInputElement) {
  //   const tech = input.value.trim();
  //   if (tech && !this.selectedTechStack.includes(tech)) {
  //     this.selectedTechStack.push(tech);
  //     this.bugForm.get('techStack')?.setValue([...this.selectedTechStack]);
  //     input.value = ''; // Clear input field after adding
  //   }
  // }
 
  // removeTech(tech: string) {
  //   this.selectedTechStack = this.selectedTechStack.filter(t => t !== tech);
  //   this.bugForm.get('techStack')?.setValue([...this.selectedTechStack]); 
  // }
 
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log("selectedFile",this.selectedFile)
      this.bugForm.get('zipFilePath')?.setValue(this.selectedFile); // ✅ Ensure zipFile updates
      this.bugForm.get('zipFilePath')?.updateValueAndValidity();
    }
  }

  onPdfSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedPdfFile = event.target.files[0];
      console.log("selectedPdfFile", this.selectedPdfFile);
      this.bugForm.get('pdfFilePath')?.setValue(this.selectedPdfFile); // ✅ Ensure pdfFile updates
      this.bugForm.get('pdfFilePath')?.updateValueAndValidity();
    }
  }
 
  submitBug() {
    if (this.bugForm.valid && this.selectedFile && this.selectedPdfFile) {
      // Create a bug object
      const bugData = {
        createdBy: this.authService.currentUserValue.id,
        title: this.bugForm.value.title!,
        description: this.bugForm.value.description!,
        difficulty: this.bugForm.value.difficulty!,
        techStack: this.bugForm.value.techStack!, // Use the selectedTechStack array
        reward: this.bugForm.value.reward!,
        deadline: this.bugForm.value.deadline!,
        gitRepo: this.bugForm.value.gitRepo!,
      };
      // Convert bug data to a JSON string
      const bugJson = JSON.stringify(bugData);
      // Create FormData and append the JSON string + file
      const formData = new FormData();
      formData.append('bug', bugJson); // Send JSON as string
      formData.append('zipFile', this.selectedFile); // Send file
      formData.append('pdfFile', this.selectedPdfFile);
      // Debugging output
      console.log("Bug JSON:", bugJson);
      console.log("Zip File:", this.selectedFile.name);
      console.log("Pdf File:", this.selectedPdfFile.name);
      console.log("Submitting FormData:", formData);
      // Send request
      this.bugService.submitBug(formData).subscribe({
        next: () => {
          alert('Bug submitted successfully!');
          this.bugForm.reset({ difficulty: 'easy', reward: 1000, techStack:'java' });
          // this.selectedTechStack = [];
          this.selectedFile = null;
          this.selectedPdfFile = null;
        },
        error: (err) => {
          console.error('Submission error:', err);
          alert('Submission failed: ' + (err.error?.message || JSON.stringify(err.error)));
        }
      });
    } else {
      alert('Please fill all required fields and select a ZIP file and PDF file.');
    }
  }
}