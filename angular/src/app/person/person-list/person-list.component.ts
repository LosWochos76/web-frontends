import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Person } from '../../shared/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../shared/firebase/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  all: Person[];
  current: Person;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.all = await this.personService.getAll();

    this.personService.changed.subscribe(async () => {
      this.all = await this.personService.getAll();
    });
  }

  onSelect(person: Person) {
    this.current = person;
  }

  onEdit() {
    this.router.navigate(['/person', this.current.id]);
  }

  onDelete() {
    this.personService.delete(this.current.id);
  }
}