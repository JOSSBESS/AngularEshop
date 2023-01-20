
import { Component, OnInit} from '@angular/core';
import { Bucket } from 'src/app/model/Bucket';
import { User } from 'src/app/model/User';
import { BucketService } from 'src/app/service/bucket/bucket.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  users: User[] = [];
  Bucket: Bucket[] = [];

  page: number = 0;
  tablesizes: number[] =[3,4,5,6,7,8,9,10];
  tablesize: number = 3;
 
  count: number = 0;
  constructor(
    private _userService:UserService,
    private _bucketService:BucketService
    ) { }

  ngOnInit(): void {   
    this.getData();
  }
  getData() {
    this._userService.getAllUser().subscribe(data =>
    this.users = data
    )
  }
  tablechange(event:any){
    this.page = event;
    this.getData();
  }
  tableSizeChange(event:any){
    this.tablesize = event.target.value;
    this.page = 1;
    this.getData();
  }
 
}
