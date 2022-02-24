/*
* File: auth.guard.ts
* Author: Madarász Dávid
* Copyright: 2022, Madarász Dávid
* Group: Szoft II/N
* Date: 2022-02-24
* Github: https://github.com/afriyy/
* Licenc: GNU GPL
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
    ) {}
  canActivate(){
    if( this.auth.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
