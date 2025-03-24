import { Component, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  auth = inject(Auth); // Using Angular's inject() instead of constructor

  // ✅ Google Login (Popup)
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      console.log("✅ Google Login Success:", result.user);
    } catch (error) {
      console.error("❌ Google Login Error:", error);
    }
  }

  // ✅ GitHub Login (Popup)
  async loginWithGitHub() {
    try {
      const result = await signInWithPopup(this.auth, new GithubAuthProvider());
      console.log("✅ GitHub Login Success:", result.user);
    } catch (error) {
      console.error("❌ GitHub Login Error:", error);
    }
  }
}
