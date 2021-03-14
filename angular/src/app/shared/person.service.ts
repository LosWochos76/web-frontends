import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Output, EventEmitter } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  @Output() changed = new EventEmitter<Person[]>();
  objects:Person[] = null;

  constructor(private logger: LoggingService) { }

  async getAll():Promise<Person[]> {
    if (this.objects == null)
      await this.createTestData();

    this.logger.debug("Loading all person objects");
    return this.objects.slice();
  }

  private async createTestData() {
    let p1 = new Person("1", "Alex", "Stuckenholz", "alexander.stuckenholz@hshl.de");
    let p2 = new Person("2", "Max", "Mustermann", "max@hshl.de");
    let p3 = new Person("3", "Kinga", "Karecki", "kinga@hshl.de");
    this.objects = [p1, p2, p3];
  }

  async remove(obj:Person):Promise<void> {
    this.logger.debug("Removing person " + obj);
    let index = this.objects.findIndex(x => x.id == obj.id);
    this.objects.splice(index, 1);
    this.changed.emit(await this.getAll());
  }

  async get(id:string):Promise<Person> {
    this.logger.debug("Getting sigle Person object by id " + id);
    let index = this.objects.findIndex(x => x.id == id);

    if (index != -1) {
      return this.objects[index];
    } else {
      throw "Object with that ID not found!";
    }
  }

  async save(obj:Person):Promise<void> {
    let index = this.objects.findIndex(x => x.id == obj.id);

    if (index >= 0) {
      this.logger.debug("Storing changes of an existing person object");
      this.objects[index] = obj;
    } else {
      this.logger.debug("Adding a new person object to the repository");
      let new_id = Math.max.apply(Math, this.objects.map(function(o) { return o.id; })) + 1;
      obj.id = new_id;
      this.objects.push(obj);
    }

    this.changed.emit(await this.getAll());
  }
}
