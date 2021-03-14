import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validator } from '@angular/forms';

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

    teacher = teacher[0];
    if (attendees.findIndex(x => (x != null && x.id == teacher.id)) == -1)
      return null;

    return { teacherIsAttendee: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
  }
}