import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLog: boolean = false;
  isAdm: boolean = false;
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe(data => {
      data ? this.isLog = true: this.isLog = false;
    })
    this._authService.userRole.subscribe(data => {
      data ? this.isAdm = true: this.isAdm = false;
    }) 
  }
  logout () {
    this._authService.logout(); 
  }
}
 