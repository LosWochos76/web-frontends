import { ThisReceiver } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private is_logged_in:boolean = false;
  changed:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  async login(email:string, password:string):Promise<boolean> {
    if (email == 'alexander.stuckenholz@hshl.de' && password == 'test') {
      this.is_logged_in = true;
      this.changed.emit(true);
      return true;
    } else {
      return false;
    }
  }

  async logout() {
    this.is_logged_in = false;
    this.changed.emit(false);
  }
  
  isLoggedIn() {
    return this.is_logged_in;
  }
}