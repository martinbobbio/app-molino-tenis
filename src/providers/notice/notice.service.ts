import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams  } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class NoticeService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getNotices(){

    return this.http.get(`${this.backUrl}/api/notice/get-notice/`).map(
      (response) => response.json()
    )
  }

  deleteNotice(id){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/notice/delete-notice/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  createNote(data){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', data.title);
    urlSearchParams.append('description', data.description);
    urlSearchParams.append('user_id', localStorage.getItem("user_id"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/notice/create-notice/`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  

}
