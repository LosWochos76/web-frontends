import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/authorization.service';
import { LoggingService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_error:boolean = false;
  @ViewChild('email') emailElement:ElementRef;
  @ViewChild('password') passwordElement:ElementRef;

  constructor(
    private logger:LoggingService,
    private auth:AuthorizationService,
    private router:Router) { 
      this.auth.changed.subscribe((result) => {
        if (result)
          this.router.navigate(['/person']);
      });
    }

  ngOnInit(): void {
  }

  async onSubmit() {
    let email = this.emailElement.nativeElement.value;
    let password = this.passwordElement.nativeElement.value;
    let result = await this.auth.login(email, password);

    if (!result) {
      this.logger.debug("Wrong credentials!");
      this.login_error = true;
    }
  }
}
