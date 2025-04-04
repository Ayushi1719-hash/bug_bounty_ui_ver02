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
import { DevSolutionComponent } from './components/dev-solution/dev-solution.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CompanyEditBugComponent } from './components/company-edit-bug/company-edit-bug.component';
import { BugDetailsCompanyComponent } from './components/bug-details-company/bug-details-company.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyForgotPasswordOtpComponent } from './components/verify-forgot-password-otp/verify-forgot-password-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GithubComponent } from './components/github/github.component';

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
    { path: 'bug/:id', component: BugDetailsComponent },
    { path: 'bugCompany/:id', component: BugDetailsCompanyComponent },
   {
    path:'leaderboard',component:LeaderboardComponent,pathMatch:'full'
    },
    {
    path:'bug-form',component:BugFormComponent,pathMatch:'full'
    },
    {
    path:'dev-sol/:id',component:DevSolutionComponent,pathMatch:'full'
    },
    {
    path:'company-edit-bug/:id',component:CompanyEditBugComponent,pathMatch:'full'
    },
    {
    path:'admin',component:AdminDashboardComponent,pathMatch:'full'
    },
{ path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-forgot-password-otp', component: VerifyForgotPasswordOtpComponent },
  { path: 'github/:bugId/:gitRepoSubmitted/:id', component: GithubComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
