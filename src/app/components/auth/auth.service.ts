import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';  // Import for DI in non-module setup
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Keep provided in root, as we're using DI manually
})
export class AuthService {
  // Use inject to get Firebase Auth instance
  private auth = inject(Auth);  // Inject Firebase Auth service directly into the service

  // Google Sign-In
  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return new Observable((observer) => {
      signInWithPopup(this.auth, provider)
        .then((result) => {
          observer.next(result.user);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // GitHub Sign-In
  signInWithGitHub(): Observable<any> {
    const provider = new GithubAuthProvider();
    return new Observable((observer) => {
      signInWithPopup(this.auth, provider)
        .then((result) => {
          observer.next(result.user);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Sign Out
  signOut(): Observable<void> {
    return new Observable((observer) => {
      this.auth.signOut()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
