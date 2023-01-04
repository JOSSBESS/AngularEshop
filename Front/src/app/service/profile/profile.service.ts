import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
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

  getUserInfo() {
    return this.http.get<string>(this.API_URL+`/me`,this.optionrequest)
  }; 
  
}; 