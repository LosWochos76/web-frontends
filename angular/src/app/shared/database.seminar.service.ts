import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LoggingService } from './logging.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Seminar } from '../model/seminar';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class SeminarService {
  @Output() changed = new EventEmitter();

  constructor(
    private db: AngularFireDatabase,
    private person_service: PersonService,
    private logger: LoggingService) { }

  async getAll() {
    let result:Seminar[] = [];
    let snapshot = await this.db.database.ref("seminars").once("value");
    
    snapshot.forEach((snapshot) => {
      let val = snapshot.val();
      let p = new Seminar(snapshot.key, val.name, val.venue, val.date);
      result.push(p);
    });

    return result;
  }

  async remove(obj:Seminar) {
    this.db.database.ref("seminars").child(obj.id).remove();
    this.changed.emit();
  }

  async get(id:string) {
    let snapshot = await this.db.database.ref("seminars").child(id).get();

    if (snapshot.exists()) {
        let val = snapshot.val();
        let obj = new Seminar(snapshot.key, val.name, val.venue, val.date);
        obj.teacher = await this.person_service.get(val.teacher);

        for (let id of val.attendees)
          obj.attendees.push(await this.person_service.get(id));

        return obj;
    }

    return null;
  }

  async save(obj:Seminar) {
    let tmp = { 
      'name': obj.name, 
      'venue': obj.venue,
      'date': obj.date,
      'teacher': obj.teacher.id,
      'attendees': []
    };

    for (let a of obj.attendees)
      tmp.attendees.push(a.id);

    if (obj.id == "") {
        let ref = this.db.database.ref("seminars/").push();
        obj.id = ref.key;
        ref.set(tmp);
    } else {
      this.db.database.ref("seminars/" + obj.id).set(tmp);
    }

    this.changed.emit();
  }
}
