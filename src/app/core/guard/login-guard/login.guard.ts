import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!!isToken) {
      role == 'admin' ? this.route.navigateByUrl("/admin") : this.route.navigateByUrl("/customer")
    }
    return true;
  }

}
