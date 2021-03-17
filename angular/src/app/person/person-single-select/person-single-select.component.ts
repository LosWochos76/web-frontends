import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/shared/person.service';

@Component({
  selector: 'app-person-single-select',
  templateUrl: './person-single-select.component.html',
  styleUrls: ['./person-single-select.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => PersonSingleSelectComponent),
       multi: true
    }
 ]
})
export class PersonSingleSelectComponent implements OnInit, ControlValueAccessor {
  selected:Person = null;
  all:Person[] = [];

  onChanged: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  constructor(private service:PersonService) { }

  writeValue(element: Person): void {
    this.selected = element;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async ngOnInit() {
    this.all = await this.service.getAll();
  }

  isSelected(obj:Person):boolean {
    return this.selected != null && obj.id == this.selected.id;
  }

  onSelectChanged(id:string) {
    let index = this.all.findIndex(x => x.id == id);
    this.selected = this.all[index];
    this.onChanged(this.selected);
  }
}