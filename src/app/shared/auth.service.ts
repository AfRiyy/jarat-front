/*
* File: auth.service.ts
* Author: Madarász Dávid
* Copyright: 2022, Madarász Dávid
* Group: Szoft II/N
* Date: 2022-02-24
* Github: https://github.com/afriyy/
* Licenc: GNU GPL
*/

import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = 'http://localhost:8000/api/'
  constructor(private http: HttpClient) {}
  login(user:string,pass:string){
    let endpoint = 'login';
    let url = this.host + endpoint;
    let authData = {
      name: user,
      password: pass
    }
    let data = JSON.stringify(authData);
    let headerObj = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let header = {
      headers: headerObj
    }
      return this.http.post<any>(url,data,header);
  }
  register(user:string,email:string,pass:string){
    let endpoint = 'register';
    let url = this.host + endpoint;
    let authData = {
      name: user,
      email: email,
      password: pass,
      password_confirmation: pass
    }
    let data = JSON.stringify(authData);
    let headerObj = new HttpHeaders({
      'Content-Type':'application/json'
    })
    let header = {
      headers: headerObj
    }
      return this.http.post<any>(url,data,header);
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser') === null) {
      return false;
    }    
    let data:any = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(data);
    let token = currentUser.token;
    return token;
  }
}
