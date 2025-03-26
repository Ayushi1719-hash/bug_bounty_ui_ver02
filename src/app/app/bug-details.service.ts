import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BugDetails {
  id: number;
  title: string;
  description: string;
  techStack: string;
  githubLink: string;
  rewards: number;
  youtubeLink: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class BugDetailsService {
  private apiUrl = 'http://localhost:8080/api/bugsDetails';

  constructor(private http: HttpClient) {}

  getBugDetails(): Observable<BugDetails[]> {
    return this.http.get<BugDetails[]>(this.apiUrl);
  }
}
