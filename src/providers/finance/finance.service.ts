import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class FinanceService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getFinances(){

    return this.http.get(`${this.backUrl}/api/finance/get-finances/`).map(
      (response) => response.json()
    )
  }

  deleteFinance(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/finance/delete-finance`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  createFinance(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('count', data.count);
    urlSearchParams.append('total', data.total);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/finance/create-finance`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  changeFinance(id,value){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('value', value);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/finance/change-finance`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}