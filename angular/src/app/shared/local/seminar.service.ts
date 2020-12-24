import { Output, EventEmitter, Injectable } from '@angular/core';
import { Seminar } from './../seminar.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LocalPersonService } from './person.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalSeminarService {
  private url = 'http://localhost:5000/Api/Seminar/';
  @Output() changed = new EventEmitter();

  constructor(
    private http: Http,
    private personService: LocalPersonService,
    private authenticationService: AuthenticationService
  ) { }

  private getRequestOptions(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    return new RequestOptions({ headers: headers });
  }

  async getAll() {
    const seminars: Seminar[] = [];

    try {
      const result = await this.http.get(this.url, this.getRequestOptions()).toPromise();
      for (const obj of result.json()) {
        seminars.push(new Seminar(obj.id, obj.name, obj.description));
      }
    } catch (err) {
      console.log(err);
    }

    return seminars;
  }

  async delete(obj: Seminar) {
    try {
      const result = await this.http.delete(this.url + obj.id, this.getRequestOptions()).toPromise();
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }

  private async loadAssociation(obj: any, seminar: Seminar) {
    if (obj.teacherID != null) {
      seminar.teacher = await this.personService.byId(obj.teacherID);
    }

    for (const id of obj.attendeeIDs) {
      const attendee = await this.personService.byId(id);
      seminar.attendees.push(attendee);
    }

    return seminar;
  }

  async ById(id: string) {
    try {
      const result = await this.http.get(this.url + id, this.getRequestOptions()).toPromise();
      const obj = result.json();
      const seminar = new Seminar(obj.id, obj.name, obj.description);
      return await this.loadAssociation(obj, seminar);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  save(obj: Seminar) {
    if (obj.id === '') {
      this.saveNew(obj);
    } else {
      this.saveExisting(obj);
    }
  }

  private async saveNew(obj: Seminar) {
    const attendeeIDs = Array();
    for (const attendee of obj.attendees) {
      attendeeIDs.push(attendee.id);
    }

    const data = JSON.stringify({
      'name' : obj.name,
      'teacherID': obj.teacher.id,
      'attendeeIDs': attendeeIDs
    });

    console.log(data);

    try {
      const result = await this.http.post(this.url, data, this.getRequestOptions()).toPromise();
      obj.id = result.json().id;
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }

  private async saveExisting(obj: Seminar) {
    const attendeeIDs = Array();
    for (const attendee of obj.attendees) {
      attendeeIDs.push(attendee.id);
    }

    const data = JSON.stringify({
      'id': obj.id,
      'name': obj.name,
      'teacherID': obj.teacher.id,
      'attendeeIDs': attendeeIDs
    });

    try {
      const result = await this.http.put(this.url + obj.id, data, this.getRequestOptions()).toPromise();
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }
}