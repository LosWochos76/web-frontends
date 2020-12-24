import { Injectable, Output, EventEmitter } from '@angular/core';
import { Person } from './../person.model';
import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService {
  private currentUser:Person;
  @Output() stateChanged = new EventEmitter<boolean>();

  constructor() { 
  	this.currentUser = null;

	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	  	console.log("logged in!");
	  	this.currentUser = user;
	  	this.stateChanged.emit(true);
	  } else {
	    console.log("logged out!");
	    this.stateChanged.emit(false);
	    this.currentUser = null;
	  }
	});
  }

  login(email:string, password:string) {
  	return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
  	return firebase.auth().signOut();
  }

  getCurrentUser():Person {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  passwortReset(email:string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}