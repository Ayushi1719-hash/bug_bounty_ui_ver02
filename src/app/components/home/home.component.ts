import { Component } from '@angular/core';
import { TopBannerComponent } from "../top-banner/top-banner.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";

@Component({
  selector: 'app-home',
  imports: [TopBannerComponent, NavbarComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
