import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';


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
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    let role = localStorage.getItem("role");
    role === "admin" ? this.isAdm = true : this.isAdm= false;

    this._userService.getUserInfo().subscribe(data =>{
    this.name = data.name;
    this.email = data.email;
    })

  }
}
