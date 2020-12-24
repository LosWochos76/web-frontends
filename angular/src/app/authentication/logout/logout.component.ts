import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/firebase/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService:AuthenticationService) { 
    this.authService.logout();
  }

  ngOnInit() {
  }
}