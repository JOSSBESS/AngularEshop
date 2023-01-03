import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";



@Injectable({providedIn: "root"})

export class RoleGuard implements CanActivate {
   
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
        let role = localStorage.getItem("role");
        if (role === "admin") {
            return true;
    }
    this.router.navigate(['/products'])
    return false;  
    }
}