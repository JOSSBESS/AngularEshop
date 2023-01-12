import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit{
  products: Product[] = [];
  isAdm:boolean = false;
  urllink:string =''; url = 'assets/insert.png'; file:string =''; name:string =''; 
  productname:string = ''; productdescription:string = ''; productprice:number = 0; productimg:string = '';
  constructor(
    private _productService: ProductService,
    private http: HttpClient
    ) { }

  ngOnInit(): void { 

    let role = localStorage.getItem("role");
    role === "admin" ? this.isAdm = true : this.isAdm= false;

    this._productService.getProducts().subscribe(data => {
    this.products = data
    })
  };

  onSelect(event:any){
    if(event.target.files[0]){
      this.file = event.target.files[0]
      this.urllink = `assets/products/${event.target.files[0].name}`
      this.name = event.target.files[0].name
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
      this.url = event.target.result;
      }
    }
   };

   upload() {
  
    this.http.post('assets/products/', this.file).subscribe(res =>
    console.log(res))

    this.productimg = this.urllink
    this._productService.InsertProduct(this.productname, this.productdescription, this.productprice, this.productimg)
  };
};
 