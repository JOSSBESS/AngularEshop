import { Component, OnInit } from '@angular/core';
import { Bucket } from 'src/app/model/Bucket';
import { BucketService } from 'src/app/service/bucket/bucket.service';

@Component({
  selector: 'app-bucket-container',
  templateUrl: './bucket-container.component.html',
  styleUrls: ['./bucket-container.component.css']
})
export class BucketContainerComponent  implements OnInit {
  Bucket: Bucket[] = [];
  constructor(
    private _bucketService:BucketService
    ) { }

  ngOnInit(): void {   
    this._bucketService.GetBucket(Number(localStorage.getItem('id'))).subscribe(data =>
    this.Bucket = data
    );
  }
}
