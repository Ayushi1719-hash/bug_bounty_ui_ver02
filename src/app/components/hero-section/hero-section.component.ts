import { Component } from '@angular/core';
import { ServicesComponent } from "../services/services.component";

@Component({
  selector: 'app-hero-section',
  imports: [ServicesComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
