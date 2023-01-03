import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ProfileService } from 'src/app/service/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User = {username: '', role: 'user', password: '' , confirmpassword: '', email: ''}
  constructor(
    private _ProfileService:ProfileService
  ) { }

  ngOnInit(): void {
    this._ProfileService.getUserInfo().subscribe(data => {
      this.user = data
      if(data.role === "admin")
        this.user.role = 'admin'
        else
          this.user.role = 'user'
    })
}}
