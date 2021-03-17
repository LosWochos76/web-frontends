import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seminar } from 'src/app/model/seminar';
import { LoggingService } from 'src/app/shared/logging.service';
import { SeminarService } from 'src/app/shared/seminar.service';

@Component({
  selector: 'app-seminar-list',
  templateUrl: './seminar-list.component.html',
  styleUrls: ['./seminar-list.component.css']
})
export class SeminarListComponent implements OnInit {
  objects:Seminar[] = [];
  selected:Seminar = null;

  constructor(
    private logger: LoggingService, 
    private service:SeminarService,
    private router:Router) { }

  async ngOnInit() {
    this.objects = await this.service.getAll();
    this.service.changed.subscribe(async () => {
      this.objects = await this.service.getAll();
    });
  }

  onSelect(obj:Seminar) {
    this.logger.debug("User selected a Seminar " + obj);
    this.selected = obj;
  }

  isSelected() {
    return this.selected != null;
  }

  onDelete() {
    if (!this.isSelected())
      return;

    this.logger.debug("User wants to delete a Seminar");
    this.service.remove(this.selected);
    this.selected = null;
  }

  onEdit() {
    this.logger.debug("User wants to edit a Seminar");
    this.router.navigate(['/seminar', this.selected.id]);
  }

  onAdd() {
    this.logger.debug("User wants to add a Seminar");
    this.router.navigate(['/seminar/0']);
  }
}