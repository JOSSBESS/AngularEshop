import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ProfileService } from 'src/app/service/profile/profile.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLog: boolean = false;
  isAdm: boolean = false;

  constructor(
    private _authService: AuthService,
    private _profileService:ProfileService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe(data => {
      data ? this.isLog = true: this.isLog = false;
    })

 
  }

  logout () {
    this._authService.logout();  
  }
}
 