import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Output, EventEmitter } from '@angular/core';
import { LoggingService } from './logging.service';
import { AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  @Output() changed = new EventEmitter();

  constructor(
    private db: AngularFireDatabase,
    private logger: LoggingService) { }

  async getAll():Promise<Person[]> {
    let result:Person[] = [];
    let reference = this.db.database.ref("people").orderByChild("lastname");
    let snapshot = await reference.once("value");

    snapshot.forEach((snapshot) => {
      let val = snapshot.val();
      let p = new Person(snapshot.key, val.firstname, val.lastname, val.email);
      result.push(p);
    });

    return result;
  }

  async remove(obj:Person) {
    this.db.database.ref().child("people").child(obj.id).remove();
    this.changed.emit();
  }

  async get(id:string):Promise<Person> {
    let reference = this.db.database.ref().child("people").child(id);
    let snapshot = await reference.get();

    if (snapshot.exists()) {
        let val = snapshot.val();
        return new Person(snapshot.key, val.firstname, val.lastname, val.email);
    }

    return null;
  }

  async save(obj:Person) {
    let tmp = { 
      'firstname': obj.firstname, 
      'lastname': obj.lastname,
      'email': obj.email
    };

    if (obj.id == "") {
      let ref = this.db.database.ref("people").push();
			obj.id = ref.key;
			ref.set(tmp);
    } else {
      this.db.database.ref("people").child(obj.id).set(tmp);
    }

    this.changed.emit();
  }
}