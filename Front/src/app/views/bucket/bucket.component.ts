import { Component, Input, OnInit } from '@angular/core';
import { Bucket } from 'src/app/model/Bucket';
import { BucketService } from 'src/app/service/bucket/bucket.service';


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  @Input() item: Bucket = {id:0,userid:0, productname:'',productprice:0}
  isAdm = false;
  constructor(
   private _bucketService: BucketService
  ) { }

  deleteBuck(event:any) {
    if(confirm('Are you sure you want to delete this product of your bucket ?')) {
      event.preventDefault();
      this._bucketService.deleteBucket(this.item.id).subscribe({
        next: res => window.location.reload(),
        error: err => console.error(err)
      })
    }
  };
  ngOnInit(): void {
  let role =localStorage.getItem('role')
    if(role === 'admin' ){
      this.isAdm = true
    }else {
    this.isAdm = false
    }
  }
};