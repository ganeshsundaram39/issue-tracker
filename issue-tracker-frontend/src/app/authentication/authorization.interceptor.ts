import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: "root",
})
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authenticationService.getUserData();
        let authRequest = req.clone();
        if (token && token['authToken']) {
            authRequest = req.clone({
                headers: req.headers.append("Authorization", token['authToken'])
            });
        }
        return next.handle(authRequest).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err && err['error'] && err['error']['message'] && err['error']['message'] == 'Not Authorized') {
                        localStorage.removeItem('userdata');
                        this.router.navigate(['/auth/login']);
                    }
                }
                return of(err);
            }));

    }
}