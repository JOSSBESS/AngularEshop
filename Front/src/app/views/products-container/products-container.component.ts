import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit{
  products: Product[] = [];
  isAdm:boolean = false;
  urllink:string ="assets/products";
  url = "assets/insert.png"
  ImgName:string =''

  constructor(
    private _productService: ProductService
    ) { }

  ngOnInit(): void { 

    let role = localStorage.getItem("role");
      role === "admin" ? this.isAdm = true : this.isAdm= false;
    this._productService.getProducts().subscribe(data => {
    this.products = data
    });
  }

  onSelect(event:any){
    if(event.target.files[0]){
      this.ImgName = event.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload =(event: any) => {
      this.url = event.target.result;
      
    };
   }
  }
}



