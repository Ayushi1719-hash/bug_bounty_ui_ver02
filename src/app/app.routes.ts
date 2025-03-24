import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent, pathMatch: "full"
    },
    {
        path: 'signup', component: SignupComponent, pathMatch: "full"
    },
    {
        path: 'home', component: HomeComponent, pathMatch: 'full'
    }, 
    {
        path: 'contact', component: ContactPageComponent, pathMatch: 'full'
    },{
        path: 'about-us', component: AboutUsComponent, pathMatch: 'full'
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
