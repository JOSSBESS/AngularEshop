import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {

  username: string =''
  password: string =''
  user:User = {username: '', role: 'user', password: '' , confirmpassword: '', email: ''}
  constructor(
    private _authService: AuthService,
    private _ProfileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void { }
  
  login() {
    this._authService.login(this.username, this.password)
    .subscribe(data => {

      localStorage.setItem('token',`${data}`);
      this._authService.userSubject.next(`${data}`)
      this.router.navigate(['/products'])
     
    })

    this._ProfileService.getUserInfo().subscribe(data => {
      this.user = data
      if(data.role === "admin")
        this.user.role = 'admin'
        else {
          this.user.role = 'user'
        }
        localStorage.setItem('role',this.user.role)
    })
  }

  
}
