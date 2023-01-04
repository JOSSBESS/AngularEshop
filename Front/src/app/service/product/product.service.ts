import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/model/Product';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
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

  getProducts() {
    return this.http.get<Product[]>(this.API_URL + '/api/products')
  }
}