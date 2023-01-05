import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  isAdm:boolean = false;
  constructor(
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    let role = localStorage.getItem("role");
      role === "admin" ? this.isAdm = true : this.isAdm= false;
  
        this._profileService.getUserInfo().subscribe(data =>{
          var user = JSON.parse(data)
         
                user

        })
    }
}
