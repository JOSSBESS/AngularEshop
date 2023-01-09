import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.API_URL+`/me`)
  }
}; 