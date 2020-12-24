import { Injectable, Output, EventEmitter } from '@angular/core';
import { Person } from './../person.model';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {
  private url = 'http://localhost:5000/Api/Authentication/';
  private token = '';
  @Output() stateChanged = new EventEmitter<boolean>();

  constructor(private http: Http) {
  }

  async login(email:string, password:string) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    const body = 'email=' + email + '&password=' + password;

    try {
      const result = await this.http.post(this.url, body, options).toPromise();
      const json = result.json();

      if (json === 'Not found') {
        return false;
      } else {
        this.token = json['token'];
        this.stateChanged.emit(true);
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  logout() {
    this.token = '';
    this.stateChanged.emit(false);
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn() {
    return this.token != '';
  }

  passwortReset(email:string) {
    return false;
  }
}