import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void { }
  
  login() {
    this._authService.login(this.username, this.password)
    .subscribe(data => {
      localStorage.setItem('token',`${data}`);
      this.router.navigateByUrl('/products')
    })
  }
}
