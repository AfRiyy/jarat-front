/*
* File: vehicles.component.ts
* Author: Madarász Dávid
* Copyright: 2022, Madarász Dávid
* Group: Szoft II/N
* Date: 2022-02-24
* Github: https://github.com/afriyy/
* Licenc: GNU GPL
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/interfaces/vehicle';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicleForm !: FormGroup;
  vehicleList:Vehicle[] = [];
  token !: string|null;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private auth: AuthService) 
    { }

  ngOnInit(): void {
    this.fetchData();
    this.vehicleForm = this.formBuilder.group({
      plate: [''],
      brand: [''],
      year: [''],
      price: [''],
      sold: [''],
    });
  }
  fetchData(){
    let url = "http://localhost:8000/api/vehicles"
    this.http.get<any>(url).subscribe(
      res => {
        this.vehicleList = res;
      });
  }
  newCar(){
    let url = "http://localhost:8000/api/vehicles";
    let carData = {
      plate: this.vehicleForm.value.plate,
      brand: this.vehicleForm.value.brand,
      year: this.vehicleForm.value.year,
      price: this.vehicleForm.value.price,
      sold: this.vehicleForm.value.sold,
    }
    console.log(
      carData.brand+
      carData.plate
      );
    
    let token = this.auth.isLoggedIn();
    console.log(token);
    
    let data = JSON.stringify(carData);
    let headerObj = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    let header = {
      headers: headerObj
    }
    this.http.post<any>(url,data,header).subscribe(res=>{
      console.log(res);
    });
  }
}
