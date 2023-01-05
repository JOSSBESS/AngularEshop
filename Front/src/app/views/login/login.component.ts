import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {

  username: string =''
  password: string =''
 
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
          var user = JSON.parse(data)
          localStorage.setItem('role', user.userInf[3])
        })
        this.router.navigate(['/products'])
    })    
  }
}


