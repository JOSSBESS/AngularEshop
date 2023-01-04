import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ProfileService } from 'src/app/service/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {id:-1, username: '', role: 'user', email: '' };
  isAdm:boolean = false;
  constructor(
    private _profileService:ProfileService
  ) { }

  ngOnInit(): void {
    this._profileService.getUserInfo().subscribe(data =>{
      var userRole = JSON.parse(data)
       userRole.userInf[3] === "admin" ? this.isAdm = true : this.isAdm= false;
    })



    this._profileService.getUserInfo().subscribe(data => {
     
    
     
    })
}}
