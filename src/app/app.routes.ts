import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoleSelectionComponent } from './components/role-selection/role-selection.component';
import { DeveloperBugSelectionComponent } from './components/developer-bug-selection/developer-bug-selection.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ServicesComponent } from './components/services/services.component';
import { CompanyComponent } from './components/company/company.component';
import { BugDetailsComponent } from './components/bug-details/bug-details.component';
import { BugFormComponent } from './components/bug-form/bug-form.component';

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
        path: 'services', component: ServicesComponent, pathMatch: 'full'
    },
    {
         path: 'select-role', component: RoleSelectionComponent, pathMatch: 'full'
    },
    {
        path: 'company', component: CompanyComponent, pathMatch: 'full'
   },
   {
    path: 'developer', component:DeveloperBugSelectionComponent, pathMatch: 'full'
},
{
    path: 'bug-details', component:BugDetailsComponent, pathMatch: 'full'
},
    
    {
        path: 'developer-bugs', component: DeveloperBugSelectionComponent, pathMatch: 'full'
   },
   {
    path:'leaderboard',component:LeaderboardComponent,pathMatch:'full'
},
{
    path:'bug-form',component:BugFormComponent,pathMatch:'full'
},
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
