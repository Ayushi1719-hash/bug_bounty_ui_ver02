import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent, pathMatch: 'full'
    }, {
        path: 'contact', component: ContactPageComponent, pathMatch: 'full'
    },{
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
