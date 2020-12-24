import { Output, EventEmitter, Injectable } from '@angular/core';
import { Person } from './../person.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalPersonService {
  private url = 'http://localhost:5000/Api/Person/';
  @Output() changed = new EventEmitter();

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {}

  private getRequestOptions(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    return new RequestOptions({ headers: headers });
  }

  async getAll() {
    const people: Person[] = new Array();

    try {
      const result = await this.http.get(this.url, this.getRequestOptions()).toPromise();
      for (const obj of result.json()) {
        people.push(new Person(obj.id, 'mr', obj.firstname, obj.lastname, obj.eMail));
      }
    } catch (err) {
      console.log(err);
    }

    return people;
  }

  async delete(person: Person) {
    try {
      const result = await this.http.delete(this.url + person.id, this.getRequestOptions()).toPromise();
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }

  async byId(id: string) {
    try {
      const result = await this.http.get(this.url + id, this.getRequestOptions()).toPromise();
      const obj = result.json();
      return new Person(obj.id, 'mr', obj.firstname, obj.lastname, obj.eMail);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async save(person: Person) {
    if (person.id === '') {
      this.saveNew(person);
    } else {
      this.saveExisting(person);
    }
  }

  private async saveNew(person: Person) {
    const data = JSON.stringify(
    {
      'firstname' : person.firstname,
      'lastname' : person.lastname,
      'email' : person.email
    });

    try {
      const result = await this.http.post(this.url, data, this.getRequestOptions()).toPromise();
      person.id = result.json().id;
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }

  private async saveExisting(person: Person) {
    const data = JSON.stringify(
    {
      'id' : person.id,
      'firstname' : person.firstname,
      'lastname' : person.lastname,
      'email' : person.email
    });

    try {
      const result = await this.http.put(this.url + person.id, data, this.getRequestOptions()).toPromise();
      this.changed.emit();
    } catch (err) {
      console.log(err);
    }
  }
}