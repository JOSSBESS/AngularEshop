import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string ='';
  password: string ='';
  
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { }


  
  login() {
    this._authService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('token',data.token);
      this._authService.userSubject.next(data.token);

      this._userService.getMeInfo().subscribe(data =>{
        localStorage.setItem('role', data.role);
        localStorage.setItem("id",`${data.id}`)
        this._authService.userRoleSubject.next(data.role);
        this.router.navigate(['/products']);
      })
    })   
  }
}


