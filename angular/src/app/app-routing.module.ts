import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MyGuard } from './my.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonEditComponent } from './Person/person-edit/person-edit.component';
import { PersonListComponent } from './Person/person-list/person-list.component';
import { SeminarEditComponent } from './Seminar/seminar-edit/seminar-edit.component';
import { SeminarListComponent } from './Seminar/seminar-list/seminar-list.component';

const routes: Routes = [
  { path: 'person', component: PersonListComponent, canActivate: [MyGuard] },
  { path: 'person/:id', component: PersonEditComponent, canActivate: [MyGuard] },
  { path: 'seminar', component: SeminarListComponent, canActivate: [MyGuard] },
  { path: 'seminar/:id', component: SeminarEditComponent, canActivate: [MyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: 'person', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
