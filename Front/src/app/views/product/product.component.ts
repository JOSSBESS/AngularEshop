import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item: Product = {productname: '',productdescription:'', productprice:0, productimg:'' }

  isAdm:boolean = false;
  constructor() { }

  ngOnInit(): void {
    let role = localStorage.getItem("role");
    role === "admin" ? this.isAdm = true : this.isAdm= false;
  }

}
