
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  users: User[] = [];
 
  constructor(
    private _userService:UserService,
    ) { }

  ngOnInit(): void {   
    this._userService.getAllUser().subscribe(data =>
    this.users = data
    )
  }
}
