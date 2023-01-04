import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/model/User';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {

  username: string =''
  password: string =''
  user:User = {id:-1, username: '', role: 'user', email: ''}
  constructor(
    private _authService: AuthService,
    private _profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void { }
  
  login() {
    this._authService.login(this.username, this.password)
    .subscribe(data => {

      localStorage.setItem('token',`${data}`);
      this._authService.userSubject.next(`${data}`)

        this._profileService.getUserInfo().subscribe(data =>{

          var userRole = JSON.parse(data)
          localStorage.setItem('role', userRole.userInf[3])
        })
        this.router.navigate(['/products'])
    })    
  }
}


