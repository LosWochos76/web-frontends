import { EventEmitter, Injectable, Output } from '@angular/core';
import { Seminar } from '../model/seminar';
import { LoggingService } from './logging.service';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class SeminarService {
  @Output() changed = new EventEmitter();
  objects:Seminar[] = null;

  constructor(
    private logger: LoggingService,
    private person_service: PersonService) { }

  async getAll() {
    if (this.objects == null)
      await this.createTestData();

    this.logger.debug("Loading all seminar objects");
    return this.objects.slice();
  }

  private async createTestData() {
    let persons = await this.person_service.getAll();

    let sem1 = new Seminar("1", "Objectoriented Programming", "HSHL", new Date('2021-04-01'));
    sem1.teacher = persons[0];
    sem1.attendees.push(persons[1], persons[2]);

    let sem2 = new Seminar("2", "Algorithms and Data Structures", "HSHL", new Date('2021-04-17'));
    sem2.teacher = persons[1];
    sem2.attendees.push(persons[0], persons[2]);

    let sem3 = new Seminar("3", "Web-Frontends", "HSHL", new Date('2021-04-22'));
    sem3.teacher = persons[2];
    sem3.attendees.push(persons[0], persons[1]);

    this.objects = [sem1, sem2, sem3];
  }

  async remove(obj:Seminar) {
    this.logger.debug("Removing seminar " + obj);
    let index = this.objects.findIndex(x => x.id == obj.id);
    this.objects.splice(index, 1);
    this.changed.emit();
  }

  async get(id:string) {
    this.logger.debug("Getting single seminar object by id " + id);
    let index = this.objects.findIndex(x => x.id == id);

    if (index != -1) {
      return this.objects[index];
    } else {
      throw "Object with that ID not found!";
    }
  }

  async save(obj:Seminar) {
    let index = this.objects.findIndex(x => x.id == obj.id);

    if (index >= 0) {
      this.logger.debug("Storing changes of an existing seminar object");
      this.objects[index] = obj;
    } else {
      this.logger.debug("Adding a new seminar object to the repository");
      let new_id = Math.max.apply(Math, this.objects.map(function(o) { return o.id; })) + 1;
      obj.id = new_id;
      this.objects.push(obj);
    }

    this.changed.emit();
  }
}
