import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './firebase/authentication.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {
  }

  canActivate() {
    return this.authService.isLoggedIn();
  }
}