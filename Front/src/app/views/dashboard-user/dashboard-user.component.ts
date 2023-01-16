import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  name:string ='';
  email:string ='';
  oldpassword:string ='';
  newpassword:string ='';
  confirmpassword:string ='';
  id: number = 0;
  constructor(
   private _userService:UserService,
   private router: Router
  ){}

  ngOnInit(): void {
  this.id = Number(localStorage.getItem('user-id'))

  this._userService.getUserInfo(this.id).subscribe(data =>{
    this.name = data.name;
    this.email = data.email;
    })
  }
   update(){
    this._userService.UpdateUser(this.name, this.email, this.oldpassword, this.newpassword, this.confirmpassword,this.id).subscribe({
      next: res =>this.router.navigate(['/', 'dashboard']),
      error: err => console.error(err)
    })
    
  };


}
