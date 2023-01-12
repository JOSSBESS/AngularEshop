import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getMeInfo(): Observable<User> {
    return this.http.get<User>(this.API_URL+`/me`)
  };

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL+'/users')
  };

  getUserInfo(productid:string) {
    return this.http.get<User>(this.API_URL+'/user/')
  };

  deleteUser(id: number): Observable<string> { 
    return this.http.delete<string>(this.API_URL+`/user/${id}`)
  }; 
};
 