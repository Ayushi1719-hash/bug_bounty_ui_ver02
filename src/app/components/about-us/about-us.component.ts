import { Component } from '@angular/core';
import { ContactPageComponent } from "../contact-page/contact-page.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-about-us',
  imports: [ContactPageComponent, NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
