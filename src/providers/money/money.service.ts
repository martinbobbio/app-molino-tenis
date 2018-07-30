import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class MoneyService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getSpendByMonth(month){

    return this.http.get(`${this.backUrl}/api/spend/get-spend-by-month/${month}`).map(
      (response) => response.json()
    )
  }

  getSpendByMonthAll(month){

    return this.http.get(`${this.backUrl}/api/spend/get-spend-by-month-all/${month}`).map(
      (response) => response.json()
    )
  }

  getPrices(){

    return this.http.get(`${this.backUrl}/api/prices/get-prices/`).map(
      (response) => response.json()
    )
  }

  setPrice(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('price', data.price);
    urlSearchParams.append('type', data.type);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/prices/set-price`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  editPrice(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('price', data.price);
    urlSearchParams.append('type', data.type);
    urlSearchParams.append('id', data.id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/prices/edit-price`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  deletePrice(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/prices/delete-price`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  setSpend(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('price', data.price);
    urlSearchParams.append('type', data.type);
    urlSearchParams.append('count', data.count);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/spend/set-spend`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  deleteSpend(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/spend/delete-spend`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }


 

}