import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


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
  public user: Observable<string>
  public userSubject: BehaviorSubject<string>

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
    this.user = this.userSubject.asObservable();
   }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {username:username, password:password },this.optionrequest)
  }
  register(username: string,email: string, password: string, confirmpassword: string) {
    return this.http.post(`${this.API_URL}/register`, {username:username,email:email, password:password, confirmpassword:confirmpassword },this.optionrequest)
  }
}
