import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonService } from './shared/firebase/person.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeminarListComponent } from './seminar/seminar-list/seminar-list.component';
import { SeminarEditComponent } from './seminar/seminar-edit/seminar-edit.component';
import { SeminarService } from './shared/firebase/seminar.service';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './shared/firebase/authentication.service';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RouteGuard } from './shared/route.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'person', pathMatch: 'full' },
  { path: 'person', component: PersonListComponent, canActivate: [RouteGuard] },
  { path: 'person/:id', component: PersonEditComponent, canActivate: [RouteGuard] },
  { path: 'seminar', component: SeminarListComponent, canActivate: [RouteGuard] },
  { path: 'seminar/:id', component: SeminarEditComponent, canActivate: [RouteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonEditComponent,
    PageNotFoundComponent,
    SeminarListComponent,
    SeminarEditComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
   PersonService, SeminarService, AuthenticationService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    var config = {
      apiKey: "AIzaSyCZa-_P2I05C8A8LlJbBVT0Ow0PG-6YPtI",
      authDomain: "seminarmanager-772fe.firebaseapp.com",
      databaseURL: "https://seminarmanager-772fe.firebaseio.com",
      projectId: "seminarmanager-772fe",
      storageBucket: "seminarmanager-772fe.appspot.com",
      messagingSenderId: "613230523441",
      appId: "1:613230523441:web:9f4ba8aa64694b5ac1d110"
    };
      
    firebase.initializeApp(config);
    console.log("Firebase is initialized!");
  }
}