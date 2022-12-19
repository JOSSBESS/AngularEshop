import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit  {

  username: string =''
  email: string=''
  password: string =''
  confirmpassword: string=''

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }
  
  register() {
    this._authService.register(this.username, this.email, this.password, this.confirmpassword)
    .subscribe(() => { this.router.navigateByUrl('/products') })
  }
}
