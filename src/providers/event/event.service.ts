import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getEvents(){

    return this.http.get(`${this.backUrl}/api/events/get-events/`).map(
      (response) => response.json()
    )
  }

  getTypeEvents(){

    return this.http.get(`${this.backUrl}/api/type-event/get-type-events/`).map(
      (response) => response.json()
    )
  }

  createEvent(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('type', data.type);
    urlSearchParams.append('date', data.date);
    urlSearchParams.append('hour', data.hour);
    urlSearchParams.append('hours', data.hours);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/events/create-event/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  editEvent(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', data.id);
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('type', data.type);
    urlSearchParams.append('date', data.date);
    urlSearchParams.append('hour', data.hour);
    urlSearchParams.append('hours', data.hours);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/events/edit-event/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  deleteEvent(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/events/delete-event/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getEvent(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/events/get-event/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  suspendEvent(id,is_suspended){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('is_suspended', is_suspended);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/events/suspend-event/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  

 

}