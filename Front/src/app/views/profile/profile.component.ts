import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name:string ='';
  email:string ='';
  isAdm:boolean = false;

  constructor(
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    let role = localStorage.getItem("role");
    role === "admin" ? this.isAdm = true : this.isAdm= false;

    this._profileService.getUserInfo().subscribe(data =>{
    this.name = data.name;
    this.email = data.email;
    })

    this
  }
}
