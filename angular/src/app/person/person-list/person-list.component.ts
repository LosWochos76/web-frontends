import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/shared/logging.service';
import { Person } from '../../model/person';
import { PersonService } from '../../shared/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  objects:Person[] = [];
  selected:Person = null;

  constructor(
    private logger:LoggingService, 
    private service:PersonService,
    private router:Router) { }

  async ngOnInit() {
    this.objects = await this.service.getAll();
    this.service.changed.subscribe(async () => {
      this.objects = await this.service.getAll();
    });
  }
  
  onSelect(obj:Person) {
    this.logger.debug("User selected a Person");
    this.selected = obj;
  }

  isSelected() {
    return this.selected != null;
  }

  onDelete() {
    if (!this.isSelected())
      return;
    
    this.logger.debug("User wants to delete a Person");
    this.service.remove(this.selected);
    this.selected = null;
  }

  onEdit() {
    this.logger.debug("User wants to edit a Person");
    this.router.navigate(['/person', this.selected.id]);
  }

  onAdd() {
    this.logger.debug("User wants to add a Person");
    this.router.navigate(['/person/0']);
  }
}