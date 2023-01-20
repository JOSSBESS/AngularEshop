import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BucketService } from 'src/app/service/bucket/bucket.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item: Product = {id:0, productname: '',productdescription:'', productprice:0, productimg:'' }
  isAdm:boolean = false;
  isLog:boolean = false;
  constructor(
    private _productService:ProductService,
    private _bucketService:BucketService
  ) { }

  ngOnInit(): void {
  let role = localStorage.getItem("role");
  if(role === "admin"){
    this.isAdm = true
  }else 
    this.isAdm= false;
  }

  deleteProd(event:any){
    if(confirm('Are you sure you want to delete this product ?')) {
      event.preventDefault();
      this._productService.DeleteProduct(this.item.id).subscribe({
        next: res => window.location.reload(),
        error: err => console.error(err)
      })
    }
  };

  addToBucket(){
    this._bucketService.AddToBucket(this.item.id).subscribe({
      next: res => window.location.reload(),
      error: err => console.error(err)
    })
  };
}
