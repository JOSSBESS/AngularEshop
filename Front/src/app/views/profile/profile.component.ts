import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name:string ='';
  email:string ='';
  oldpassword:string ='';
  newpassword:string ='';
  confirmpassword:string ='';
  id: number = 0;
  isAdm:boolean = false;

  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    let role = localStorage.getItem("role");
    console.log(role);
    this.id = Number(localStorage.getItem("id"));
    role === "admin" ? this.isAdm = true : this.isAdm= false;
    this._userService.getMeInfo().subscribe(data =>{
    this.name = data.name;
    this.email = data.email;
    })
  };

  update(){
    this._userService.UpdateUser(this.name, this.email, this.oldpassword, this.newpassword, this.confirmpassword,this.id).subscribe({
      next: res =>console.log(res),
      error: err => console.error(err)
    })
    this._authService.logout()
  };

  deleteAcc(event:any){
    if(confirm('Are you sure you want to delete your account ?')) {
      event.preventDefault();
      this._userService.deleteUser(Number(localStorage.getItem("id"))).subscribe({
        next: res => window.location.reload(),
        error: err => console.error(err)
      })
    }
  };
}
