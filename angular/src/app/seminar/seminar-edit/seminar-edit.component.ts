import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { Seminar } from 'src/app/model/seminar';
import { LoggingService } from 'src/app/shared/logging.service';
import { PersonService } from 'src/app/shared/person.service';
import { SeminarService } from 'src/app/shared/seminar.service';
import { TeacherIsNoAttendeeValidator } from '../teacher-is-no-attendee-validator.service';

@Component({
  selector: 'app-seminar-edit',
  templateUrl: './seminar-edit.component.html',
  styleUrls: ['./seminar-edit.component.css']
})
export class SeminarEditComponent implements OnInit {
  id:string = "";
  obj:Seminar = null;
  form:FormGroup;
  persons:Person[] = [];

  constructor(
    private logger:LoggingService, 
    private route:ActivatedRoute,
    private router:Router,
    private service:SeminarService,
    private person_service:PersonService,
    private tinav:TeacherIsNoAttendeeValidator) { 
      this.form = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3)]),
        venue: new FormControl("", [Validators.required, Validators.minLength(3)]),
        date: new FormControl("", [Validators.required]),
        teacher: new FormControl(null, [Validators.required]),
        attendees: new FormControl([], [Validators.required])
      }, 
      {
        validators: this.tinav.validate
      });
    }

    async ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.persons = await this.person_service.getAll();
      
      if (this.id != "0") {
        this.obj = await this.service.get(this.id);
      } else {
        this.obj = new Seminar("", "", "", new Date());
      }

      this.form.setValue({
        name: this.obj.name,
        venue: this.obj.venue,
        date: this.obj.date,
        teacher: this.obj.teacher,
        attendees: this.obj.attendees
      });
    }

    onSubmit() {
      if (this.form.invalid) {
        this.logger.debug("Validation shows invalid data!");
        return;
      }
  
      this.obj.name = this.form.controls.name.value;
      this.obj.venue = this.form.controls.venue.value;
      this.obj.date = this.form.controls.date.value;
      this.obj.teacher = this.form.controls.teacher.value;
      this.obj.attendees = this.form.controls.attendees.value;

      this.service.save(this.obj);
      this.router.navigate(["seminar"]);
    }

    onCancel() {
      this.router.navigate(["seminar"]);
    }
}