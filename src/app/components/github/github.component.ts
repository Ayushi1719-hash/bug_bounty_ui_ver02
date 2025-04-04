import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule, DiffEditorModel, DiffEditorComponent } from 'ngx-monaco-editor-v2';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
//import { CodeEditorTaskbarComponent } from "../code-editor-taskbar/code-editor-taskbar.component";

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule, DiffEditorComponent, NavbarAdminComponent],
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  editor: any;
  repoUrl: string = '';
  userFullName:string='';
  gitRepoSubmitted:string='';
  bugId: number = 0;
  userId:number=0;
  submittedId: number = 0;
  branch: string = '';
  branches: any[] = [];
  selectedBranch: string = '';
  fileChanges: any[] = [];
  fileDiffs: { filename: string; originalModel: DiffEditorModel; modifiedModel: DiffEditorModel }[] = [];

  monacoOptions = { theme: 'vs-dark', readOnly: true, automaticLayout: true };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    console.log("Loding Github Component");
  }

  ngOnInit(): void {
    this.bugId = Number(this.route.snapshot.paramMap.get('bugId'));
    console.log("Bug ID: ", this.bugId);

    if (this.bugId) {
      this.fetchRepoUrl(this.bugId);
    }

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("User ID: ", this.userId);

    this.gitRepoSubmitted = String(this.route.snapshot.paramMap.get('gitRepoSubmitted'));
    console.log("Submitted repo: ", this.gitRepoSubmitted);

    
    console.log("Hello editor");
    this.fetchUserFullName();
  }

  fetchUserFullName() {
    this.http.get<{ fullName: string }>(`http://localhost:8081/api/users/${this.userId}/fullname`)
      .subscribe({
        next: (data) => {
          this.userFullName = data.fullName;
          console.log("User Full Name: ", this.userFullName);
        },
        error: (error) => {
          console.error("Error fetching user full name", error);
        }
      });
  }

  fetchRepoUrl(bugId: number) {
    this.http.get<{ gitRepo: string }>(`http://localhost:8081/api/bugsEntry/${bugId}/repo`)
      .subscribe({
        next: (data) => {
          this.repoUrl = data.gitRepo;
          console.log("Repo URL: ", this.repoUrl);
          this.fetchBranches(); // Automatically fetch branches
        },
        error: (error) => {
          console.error("Error fetching repo URL", error);
        }
      });
  }

  onInitDiffEditor(editor:any) {
   
    console.log("ngx editor");
  }

  
  fetchBranches(): void {
    const { owner, repo } = this.extractRepoDetails(this.repoUrl);
    console.log("owner and repo",owner, repo);
    console.log(this.repoUrl);
    if (!owner || !repo) {
      alert('Invalid GitHub repository URL!');
      return;
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/branches`;
    console.log("apiurl",apiUrl);

    const baseUrl=this.gitRepoSubmitted;
    console.log("baseurl",baseUrl);


    const baseUrlBranch=`https://api.github.com/repos/${owner}/${repo}/branches`;
    console.log("baseUrlBranch",baseUrlBranch);

    const branch=baseUrl.substring(baseUrl.lastIndexOf('/tree/') + 6);
    console.log("Branch",branch);

    const br=baseUrl.split('/tree/');
    const brNew=br.length > 1 ? br[1] : '';
    console.log("Branch new",brNew);
    this.selectedBranch=brNew;


    this.http.get(apiUrl).subscribe({
      next: (data: any) => {
        console.log("branches",data);
        this.branches = data;
      },
      error: (error) => {
        console.error('Error fetching branches:', error);
        alert('Failed to fetch branches. Ensure the repository link is correct.');
      }
    });
  }

  compareBranches(): void {
    // if (!this.selectedBranch || this.selectedBranch === 'main') {
    //   alert('Please select a valid branch to compare.');
    //   return;
    // }

    const { owner, repo } = this.extractRepoDetails(this.repoUrl);
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/compare/main...${this.selectedBranch}`;

    this.http.get(apiUrl).subscribe({
      next: (data: any) => {
        if (!data.files || data.files.length === 0) {
          alert('No file changes found between branches.');
          return;
        }
        this.fileChanges = data.files;
        this.loadAllFileDiffs();
      },
      error: (error) => {
        console.error('Error comparing branches:', error);
        alert('Failed to compare branches.');
      }
    });
  }

  loadAllFileDiffs(): void {
    this.fileDiffs = this.fileChanges
      .filter(file => file.patch)
      .map(file => {
        const language = this.getLanguageFromFileName(file.filename);
        return {
          filename: file.filename,
          originalModel: { language, code: this.extractOriginalCode(file.patch) },
          modifiedModel: { language, code: this.extractModifiedCode(file.patch) }
        };
      });
  }

  getLanguageFromFileName(filename: string): string {
    const extension = filename.split('.').pop() || ''; // Ensure extension is a string
    const langMap: { [key: string]: string } = {
      ts: 'typescript',
      js: 'javascript',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      md: 'markdown',
      java: 'java',
      py: 'python',
      cpp: 'cpp',
      c: 'c',
      cs: 'csharp',
      go: 'go',
      rb: 'ruby',
      php: 'php'
    };
    return langMap[extension] || 'plaintext';
  }

  extractOriginalCode(patch: string): string {
    return patch
      .split('\n')
      .filter(line => line.startsWith('-'))
      .map(line => line.substring(1))
      .join('\n');
  }

  extractModifiedCode(patch: string): string {
    return patch
      .split('\n')
      .filter(line => line.startsWith('+'))
      .map(line => line.substring(1))
      .join('\n');
  }

  extractRepoDetails(url: string): { owner: string; repo: string } {
    const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\.git)?\/?$/);
    console.log("extract repo details called",match);
    return match ? { owner: match[1], repo: match[2] } : { owner: '', repo: '' };
  }

  goBack(): void {
    window.history.back();
  }

  acceptBug() {
    const url = 'http://localhost:8081/api/bugsEntry/accept';
    const params = new HttpParams()
      .set('developerId', this.userId.toString())
      .set('bugId', this.bugId.toString())
      .set('gitRepoSubmitted', this.gitRepoSubmitted)
      .set('developerFullName', this.userFullName); // Ensure this is set before calling
    
    this.http.post(url, {}, { params }).subscribe({
      next: (response) => {
        console.log('Bug accepted:', response);
        alert('Bug accepted successfully!');

        setTimeout(() => {
          this.router.navigate(['/admin']); // Change '/dashboard' to your target route
        }, 1000);
      },
      error: (error) => {
        console.error('Error accepting bug:', error);
        alert('Error accepting bug');
      }
    });
  }

  rejectBug() {
    console.log("Rejecting bug with details:");
    console.log("Developer ID:", this.userId);
    console.log("Bug ID:", this.bugId);
    console.log("Git Repo Submitted:", this.gitRepoSubmitted);
    console.log("Developer Full Name:", this.userFullName);
  
    if (!this.userId || !this.bugId || !this.gitRepoSubmitted || !this.userFullName) {
      alert("Missing required data! Please check the bug details.");
      return;
    }
    
    const url = 'http://localhost:8081/api/bugsEntry/reject';
  
    const body = {
      developerId: this.userId,
      bugId: this.bugId,
      gitRepoSubmitted: this.gitRepoSubmitted,
      developerFullname: this.userFullName
    };
  
    console.log("Reject Request Body:", body);
  
    this.http.post(url, body).subscribe({
      next: (response) => {
        console.log('Bug rejected:', response);
        alert('Bug rejected successfully!');
  
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: (error) => {
        console.error('Error rejecting bug:', error);
        alert('Error rejecting bug: ' + error.message);
      }
    });
  }
  
  
  
  
}