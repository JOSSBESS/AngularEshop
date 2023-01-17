import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpRequest, HttpEvent } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + '/bucket/$id')
  }

  InsertProduct(productname:string, productdescription:string, productprice:number, productimg:string) {
    return this.http.post(this.API_URL + '/bucket', {productname:productname,productdescription:productdescription, productprice:productprice, productimg:productimg })
  }

  DeleteProduct(id:number):Observable<string> {
    return this.http.delete<string>(this.API_URL + `/bucket/${id}`)
  }
}