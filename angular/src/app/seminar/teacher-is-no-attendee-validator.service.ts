import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeacherIsNoAttendeeValidator implements Validator {

  constructor() { }

  validate(form:FormGroup): ValidationErrors {
    let teacher = form.controls.teacher.value;
    let attendees = form.controls.attendees.value;

    if (teacher == null || attendees == null)
      return null;

    if (attendees.findIndex(x => (x != null && x.id == teacher.id)) == -1)
      return null;

    return { teacherIsAttendee: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
  }
}