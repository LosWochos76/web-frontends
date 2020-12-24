import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../shared/firebase/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	user_email:string;
	user_password:string;
	error_message:string;
  other_message:string;

  constructor(
  	private authService: AuthenticationService,
  	private route: ActivatedRoute,
    private router: Router) {
      this.authService = authService;
      this.user_email = "";
      this.user_password = "";
      this.error_message = "";
      this.other_message = "";
  }

  async onSubmit(form: NgForm) {
    const success = await this.authService.login(form.value.username, form.value.password);

    if (success) {
      this.router.navigate(['/person']);
    } else {
      this.error_message = 'Could not find user with that email or password!';
      this.other_message = '';
    }
  }

  async onPasswordForgotten(form: NgForm) {
    const success = await this.authService.passwortReset(form.value.username);
    if (success) {
      this.error_message = "";
      this.other_message = "We have sent you an e-mail to reset your password. Please check you inbox!";
    } else {
      this.error_message = "Sorry! This function is not yet implemented!";
      this.other_message = "";
    }
  }
}