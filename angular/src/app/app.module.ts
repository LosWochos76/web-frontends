import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonListComponent } from './Person/person-list/person-list.component';
import { PersonService } from './shared/person.service';
import { SeminarListComponent } from './Seminar/seminar-list/seminar-list.component';
import { SeminarService } from './shared/seminar.service';
import { PersonEditComponent } from './Person/person-edit/person-edit.component';
import { SeminarEditComponent } from './Seminar/seminar-edit/seminar-edit.component';
import { LoggingService } from './shared/logging.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthorizationService } from './shared/authorization.service';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PersonSelectComponent } from './person/person-select/person-select.component';
import { TeacherIsNoAttendeeValidator } from './Seminar/teacher-is-no-attendee-validator.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    SeminarListComponent,
    PersonEditComponent,
    SeminarEditComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    PersonSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    LoggingService, 
    AuthorizationService,
    PersonService,
    SeminarService,
    TeacherIsNoAttendeeValidator  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
