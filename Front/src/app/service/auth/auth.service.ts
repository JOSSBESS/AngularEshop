import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL
  public userSubject: BehaviorSubject<string>
  public user: Observable<string>
  public userRoleSubject: BehaviorSubject<string>
  public userRole: Observable<string>

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
    this.user = this.userSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || '');
    this.userRole = this.userRoleSubject.asObservable();
  }
  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.API_URL}/login`, {username:username, password:password })
  }
  
  register(username: string,email: string, password: string, confirmpassword: string): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/register`, {username:username,email:email, password:password, confirmpassword:confirmpassword })
  }

  logout()  {
    localStorage.clear()
    this.userSubject.next('');
    this.userRoleSubject.next('');
    this.router.navigate(['/login']);
  }
}
