import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
 
@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class AppPdfViewerComponent implements OnChanges {
  @Input() bugId!: number;
  pdfSrc: string | ArrayBuffer = '';
  zipFileName: string = '';
 
  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bugId'] && this.bugId) {
      this.loadPdf(this.bugId);
      this.loadZipFileName(this.bugId);
    }
  }
 
  loadPdf(bugId: number) {
    const url = `http://localhost:8081/api/bugsEntry/pdf/${bugId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((pdfBlob) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.pdfSrc = fileReader.result as string;
      };
      fileReader.readAsDataURL(pdfBlob);
    });
  }

  loadZipFileName(bugId: number) {
    const url = `http://localhost:8081/api/bugsEntry/zip/${bugId}/filename`;
    this.http.get(url, { responseType: 'text' }).subscribe((fileName) => {
      this.zipFileName = fileName;
    });
  }
 
  downloadZip() {
    const url = `http://localhost:8081/api/bugsEntry/zip/${this.bugId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((zipBlob) => {
      const zipUrl = window.URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = this.zipFileName || `bug-${this.bugId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}