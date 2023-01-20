import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, Userboard } from 'src/app/model/User';
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
  UpdateUser(name: string, email: string,oldpassword:string, newpassword: string, confirmpassword: string, id:number):Observable<string> {
    return this.http.put<string>(this.API_URL+'/user/',{name:name, email:email, oldpassword:oldpassword, newpassword:newpassword, confirmpassword:confirmpassword,id:id })
  }
  getUserInfo(id:number): Observable<Userboard>{
    return this.http.get<Userboard>(this.API_URL+`/user/${id}`)
  };

  deleteUser(id: number): Observable<string> { 
    return this.http.delete<string>(this.API_URL+`/user/${id}`)
  }; 
};
 