import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL

  optionrequest = {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    }), responseType: 'text' as 'json'
  }

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {username:username, password:password },this.optionrequest)
  }
}
