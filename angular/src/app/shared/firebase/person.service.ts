import { Output, EventEmitter, Injectable } from '@angular/core';
import { Person } from './../person.model';
import * as firebase from 'firebase';

export class PersonService {
	@Output() changed = new EventEmitter<Person[]>();
	private people:Person[] = [];
	private database;

	constructor() {
	  this.database = firebase.database();
      let result = this.database.ref("people").once("value").then(
      	(snapshot) => {
          snapshot.forEach((childSnapshot) => {
	        let p = new Person(childSnapshot.key, 
	        	childSnapshot.val().salutation, 
	        	childSnapshot.val().firstname, 
	        	childSnapshot.val().lastname,
	        	childSnapshot.val().email);

	        this.people.push(p);
          });

          this.changed.emit(this.getAll());
        }
      );
	}

	getAll() {
		return this.people.slice();
	}

	save(person:Person) {
		let obj = { 
				'salutation':person.salutation, 
				'firstname':person.firstname, 
				'lastname':person.lastname,
				'email':person.email
		};

		if (person.id == "") {
			this.people.push(person);
			let newPerson = this.database.ref("people/").push();
			person.id = newPerson.key;
			newPerson.set(obj);
		} else {
			this.database.ref("people/" + person.id).set(obj);
		}

		this.changed.emit(this.getAll());
	}

	delete(id:string) {
		this.database.ref("people/" + id).remove();
		
		let i = this.posById(id);
		this.people.splice(i, 1);
		this.changed.emit(this.getAll());
	}

	byId(id:string) {
		for (let i=0; i<this.people.length; i++)
			if (this.people[i].id == id)
				return this.people[i];

		return null;
	}

	private posById(id:string) {
		for (let i=0; i<this.people.length; i++)
			if (this.people[i].id == id)
				return i;

		return -1;
	}
}