import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { TopBannerComponent } from "./components/top-banner/top-banner.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServicesComponent } from './components/services/services.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, TopBannerComponent, NavbarComponent, LoginComponent,SignupComponent,ServicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bug-bounty-ui';
}
