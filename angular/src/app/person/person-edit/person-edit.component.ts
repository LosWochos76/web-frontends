import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { LoggingService } from 'src/app/shared/logging.service';
import { PersonService } from 'src/app/shared/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  id:string = "";
  obj:Person = null;
  form:FormGroup;

  constructor(
    private logger:LoggingService, 
    private route:ActivatedRoute,
    private router:Router,
    private service:PersonService) { 
      this.form = new FormGroup({
        firstname: new FormControl("", [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email])
      });
    };

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    if (this.id != "0") {
      this.obj = await this.service.get(this.id);
    } else {
      this.obj = new Person("", "", "", "");
    }

    this.form.setValue({
      firstname: this.obj.firstname,
      lastname: this.obj.lastname,
      email: this.obj.email
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.logger.debug("Validation shows invalid data!");
      return;
    }

    this.obj.firstname = this.form.controls.firstname.value;
    this.obj.lastname = this.form.controls.lastname.value;
    this.obj.email = this.form.controls.email.value;
    this.service.save(this.obj);
    this.router.navigate(["person"]);
  }

  onCancel() {
    this.router.navigate(['/person']);
  }
}
