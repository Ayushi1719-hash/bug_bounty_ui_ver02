import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../components/developer-bug-selection/bug.model';
 
@Injectable({
  providedIn: 'root'
})
export class BugService {
  private API_URL = 'http://localhost:8081/api/bugs';
 
  constructor(private http: HttpClient) {}
 
  getBugs(difficulty?: string, techStack?: string): Observable<Bug[]> {
    let params = new HttpParams();
 
    if (difficulty) params = params.set('difficulty', difficulty);
    if (techStack) params = params.set('techStack', techStack);
 
    // If no filters are applied, fetch all bugs
    const endpoint = difficulty || techStack ? `${this.API_URL}/filter` : this.API_URL;
 
    return this.http.get<Bug[]>(endpoint, { params });
   
  }
}