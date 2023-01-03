import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLog: boolean = false;
  user:User = {username: '', role: 'user', password: '' , confirmpassword: '', email: ''}
  
  constructor(
    private _authService: AuthService,
    private _ProfileService:ProfileService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe(data => {
      if (data)
      this.isLog = true
      else {
        this.isLog = false
      }

     } )

  }

  logout () {
    this._authService.logout();

  }
}
 