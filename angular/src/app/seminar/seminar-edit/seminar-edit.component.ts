import { Component, OnInit } from '@angular/core';
import { Seminar } from '../../shared/seminar.model';
import { Person } from '../../shared/person.model';
import { PersonService } from '../../shared/firebase/person.service';
import { SeminarService } from '../../shared/firebase/seminar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seminar-edit',
  templateUrl: './seminar-edit.component.html',
  styleUrls: ['./seminar-edit.component.css']
})
export class SeminarEditComponent implements OnInit {
  seminar: Seminar;
  people: Person[];

  constructor(
    private seminarService: SeminarService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id === 'new') {
      this.seminar = new Seminar('', '', '');
    } else {
      this.seminar = await this.seminarService.byId(id);
    }

    this.people = await this.personService.getAll();
    this.personService.changed.subscribe(async () => {
      this.people = await this.personService.getAll(); }
    );
  }

  onSubmit(form) {
    this.seminar.name = form.value.name;
    this.seminar.description = form.value.description;
    this.seminar.teacher = form.value.teacher;
    this.seminar.attendees = form.value.attendees;

    this.seminarService.save(this.seminar);
    this.router.navigate(['/seminar']);
  }

  onCancel() {
    this.router.navigate(['/seminar']);
  }

  isAttending(person: Person) {
    return this.seminar.attendees.indexOf(person) >= 0;
  }

  compareByID(itemOne: Person, itemTwo: Person) {
    return itemOne && itemTwo && itemOne.id === itemTwo.id;
  }
}