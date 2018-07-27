import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams  } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendData(username,password){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/auth/login`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_firstname');
    localStorage.removeItem('user_lastname');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_photo');
    window.location.href = "/";
  }


}
