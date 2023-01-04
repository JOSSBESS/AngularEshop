import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../service/auth/auth.service";


@Injectable()

export class jwtInterceptor implements HttpInterceptor {
    constructor(
        private _authService: AuthService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authService.userSubject.value.replace(/"/g, '');
        if (token) {
                    request = request.clone({
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${token} `             
                    })
                })
            }
            
        return next.handle(request).pipe(
            catchError((err) =>{
                if(err.status === 401){
                }
                const error = err.error.message || err.statusText;
                return throwError(() => new Error('Warning!'+ error))   
            })
        )
    }
}
