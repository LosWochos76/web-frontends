import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../shared/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonService } from '../../shared/firebase/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: Person;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id === 'new') {
      this.person = new Person('', '', '', '', '');
    } else {
      this.person = await this.personService.byId(id);
    }
  }

  onSubmit(form: NgForm) {
    this.person.salutation = form.value.salutation;
    this.person.firstname = form.value.firstname;
    this.person.lastname = form.value.lastname;
    this.person.email = form.value.email;
    this.personService.save(this.person);
    this.router.navigate(['/person']);
  }

  onCancel() {
    this.router.navigate(['/person']);
  }
}
