import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SchoolComponent } from './components/school/school.component';
import { PersonComponent } from './components/register/person/person.component';
import { EnterpriseComponent } from './components/register/enterprise/enterprise.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'register/person', component: PersonComponent },
  { path: 'register/enterprise', component: EnterpriseComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
