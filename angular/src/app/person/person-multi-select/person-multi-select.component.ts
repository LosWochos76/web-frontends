import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/shared/person.service';

@Component({
  selector: 'app-person-multi-select',
  templateUrl: './person-multi-select.component.html',
  styleUrls: ['./person-multi-select.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => PersonMultiSelectComponent),
       multi: true
    }
 ]
})
export class PersonMultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input() selected:Person[] = [];
  all:Person[] = [];

  onChanged: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  constructor(private service:PersonService) { }

  writeValue(elements: Person[]): void {
    for (let obj of elements)
      if (obj != null)
        this.selected.push(obj);
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

  isChecked(obj:Person):boolean {
    return this.selected.findIndex(x => x.id == obj.id) > -1;
  }

  onCheckboxChanged(obj:Person, event) {
    if (event.target.checked) {
      this.selected.push(obj);
      this.onChanged(this.selected);
    } else {
      let index = this.selected.findIndex(x => x.id == obj.id);
      this.selected.splice(index, 1);
      this.onChanged(this.selected);
    }
  }
}