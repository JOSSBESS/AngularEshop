import { Component,Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() account: User = {id:0, name:'', email:'', role:'' };
  
  constructor(
    private _userService:UserService,
    private router:Router
    ) { }
  accTarget(){
      this.router.navigate(['/dashtarget'])
      localStorage.setItem("user-id",`${this.account.id}`)
    };

  deleteAcc(event:any){
    if(confirm('Are you sure you want to delete this account ?')) {
      event.preventDefault();
      this._userService.deleteUser(this.account.id).subscribe({
        next: res => window.location.reload(),
        error: err => console.error(err)
      })
    }
  };
}

  

