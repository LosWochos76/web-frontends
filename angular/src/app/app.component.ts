import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from './shared/firebase/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public isLoggedIn:boolean = false;

	constructor(private authService:AuthenticationService) {
		authService.stateChanged.subscribe((state) => { this.isLoggedIn = state; });
	}

	ngOnInit() {
    }
}