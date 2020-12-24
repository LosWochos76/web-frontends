import { Component, OnInit } from '@angular/core';
import { Seminar } from '../../shared/seminar.model';
import { SeminarService } from '../../shared/firebase/seminar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seminar-list',
  templateUrl: './seminar-list.component.html',
  styleUrls: ['./seminar-list.component.css']
})
export class SeminarListComponent implements OnInit {
  all: Seminar[] = [];
  current: Seminar;

  constructor(
    private seminarService: SeminarService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.all = await this.seminarService.getAll();
    this.seminarService.changed.subscribe(async () => {
      this.all = await this.seminarService.getAll();
    });
  }

  onSelect(seminar: Seminar) {
    this.current = seminar;
  }

  onEdit() {
    this.router.navigate(['/seminar', this.current.id]);
  }

  onDelete() {
    this.seminarService.delete(this.current.id);
  }
}