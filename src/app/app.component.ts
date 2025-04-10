import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { TopBannerComponent } from "./components/top-banner/top-banner.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ServicesComponent } from './components/services/services.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, TopBannerComponent, LeaderboardComponent, NavbarComponent, LoginComponent,SignupComponent,ServicesComponent,PdfViewerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bug-bounty-ui';
}
