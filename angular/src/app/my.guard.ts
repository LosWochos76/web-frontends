import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './shared/authorization.service';
import { LoggingService } from './shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuard implements CanActivate {
  constructor(
    private service:AuthorizationService,
    private logger:LoggingService,
    private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.service.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}