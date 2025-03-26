import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class BugService {
  private apiUrl = 'http://localhost:8081/api/bugsEntry';
 
  constructor(private http: HttpClient) {}
 
  submitBug(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, formData);
  }
}