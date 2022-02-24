/*
* File: login.component.ts
* Author: Madarász Dávid
* Copyright: 2022, Madarász Dávid
* Group: Szoft II/N
* Date: 2022-02-24
* Github: https://github.com/afriyy/
* Licenc: GNU GPL
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
this.loginForm = this.formBuilder.group({
  user: [''],
  pass: ['']
});
  }
  login(){
    let user = this.loginForm.value.user;
    let pass = this.loginForm.value.pass;
    console.log(user,pass);
    this.auth.login(user,pass)
    .subscribe(res =>{
      console.log(res.token);
      
        localStorage.setItem('currentUser', 
        JSON.stringify({token: res.token, name: res.name})
        );
        this.router.navigate(['vehicles']);
      }
    );
  }
}