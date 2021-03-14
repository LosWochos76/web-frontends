import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './shared/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  is_logged_in:boolean = false;

  constructor(private auth:AuthorizationService) { }

  ngOnInit() {
    this.is_logged_in = this.auth.isLoggedIn();
    this.auth.changed.subscribe(result => this.is_logged_in = result);
  }
}
