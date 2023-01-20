import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bucket } from 'src/app/model/Bucket';


@Injectable({
  providedIn: 'root'
})

export class BucketService {
  
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  GetBucket(id:number): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.API_URL + `/bucket/${id}`)
  }


  AddToBucket(productid:number): Observable<String> {
    return this.http.post<string>(this.API_URL + '/bucket', {productid:productid})
  }

  deleteBucket(id:number):Observable<string> {
    return this.http.delete<string>(this.API_URL + `/bucket/${id}`)
  }
}