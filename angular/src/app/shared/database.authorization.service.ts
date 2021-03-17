import { ThisReceiver } from '@angular/compiler';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private user:any = null;
  changed:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private auth:AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.changed.emit(true);
      } else {
        this.user = null;
        this.changed.emit(false);
      }
    });
  }

  async login(email:string, password:string):Promise<boolean> {
    try {
      let result = await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch  {
      return false;
    }
  }

  async logout() {
    let result = await this.auth.signOut();
  }
  
  isLoggedIn() {
    return this.user != null;
  }
}