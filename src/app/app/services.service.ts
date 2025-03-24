import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8081/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'login',
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem('auth-user', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        fullName,
        email,
        password,
      },
      httpOptions
    );
  }

  sendOtp(fullName: string, email: string, password: string, userRole: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        fullName,
        email,
        password,
        userRole,
      },
      httpOptions
    );
  }

  verifyOtp(
    fullName: string,
    email: string,
    password: string,
    otp: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify-otp',
      {
        fullName,
        email,
        password,
        otp,
      },
      httpOptions
    );
  }

  logout(): void {
    localStorage.removeItem('auth-user');
    this.currentUserSubject.next(null);
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}

 