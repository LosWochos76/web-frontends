import { Output, EventEmitter, Injectable } from '@angular/core';
import { Seminar } from './../seminar.model';
import { PersonService } from './person.service';
import * as firebase from 'firebase';

@Injectable()
export class SeminarService {
	@Output() changed = new EventEmitter<Seminar[]>();
	private seminars:Seminar[] = [];
	
	constructor(private personService:PersonService) {
      firebase.database().ref("seminars").once("value").then(
      	(snapshot) => {
          snapshot.forEach((childSnapshot) => {
	        let s = new Seminar(childSnapshot.key, childSnapshot.val().name, childSnapshot.val().description);
	        s.teacher = this.personService.byId(childSnapshot.val().teacher);
	        if (childSnapshot.val().attendees != undefined) {
		        for (let id of childSnapshot.val().attendees) {
		        	s.attendees.push(this.personService.byId(id));
		        }
	        }
	        
	        this.seminars.push(s);
          });

          this.changed.emit(this.getAll());
        }
      );
	}

	getAll() {
		return this.seminars.slice();
	}

	byId(id:string) {
		for (let i=0; i<this.seminars.length; i++)
			if (this.seminars[i].id == id)
				return this.seminars[i];

		return undefined;
	}

    save(seminar:Seminar) {
    	let obj = {
          'name':seminar.name, 
          'description':seminar.description,
          'teacher': seminar.teacher != null ? seminar.teacher.id : "",
          'attendees':[]
    	};
    	
    	for (let person of seminar.attendees) {
    		obj.attendees.push(person.id);
    	}

		if (seminar.id == "") {
			this.seminars.push(seminar);
			let newSeminar = firebase.database().ref("seminars/").push();
			seminar.id = newSeminar.key;
			newSeminar.set(obj);
		} else {
			firebase.database().ref("seminars/" + seminar.id).set(obj);
		}

		this.changed.emit(this.getAll());
	}

	delete(id:string) {
		firebase.database().ref("seminars/" + id).remove();

		let i = this.posById(id);
		this.seminars.splice(i, 1);
		this.changed.emit(this.getAll());
	}

	private posById(id:string) {
		for (let i=0; i<this.seminars.length; i++)
			if (this.seminars[i].id == id)
				return i;

		return -1;
	}
}