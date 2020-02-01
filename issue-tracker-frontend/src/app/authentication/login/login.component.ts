import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  selectedTab = 0;
  signupForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    if (gapi) {
      gapi.load('auth2', function () {
        gapi.auth2.init();
      });
    }
  }

  ngOnInit() {
    if (this.router.url === '/auth/register') {
      this.selectedTab = 1;
    } else if (this.router.url === '/auth/login') {
      this.selectedTab = 0;
    }
    this.signupForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[A-Za-z0-9]w{7,}$/')
      ])
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[A-Za-z0-9]w{7,}$/')
      ])
    });
  }


  googleLogin() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
      googleAuth.signIn({ scope: 'profile email' }).then(googleUser => {
        console.log(googleUser.getBasicProfile());
      });
    });
  }

  tabClick(tab) {
    if (tab.index === 0) {
      this.router.navigate(['../login'], { relativeTo: this.route });
      return;
    }
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
  getEmailErrorMessage() {
    return this.loginForm.get('email').errors.required
      ? 'Email is required'
      : this.loginForm.get('email').errors.email
        ? 'Not a valid email'
        : '';
  }
  getEmailSignupErrorMessage() {
    return this.signupForm.get('email').errors.required
      ? 'Email is required'
      : this.signupForm.get('email').errors.email
        ? 'Not a valid email'
        : '';
  }
  getPasswordErrorMessage() {
    return this.signupForm.get('password').errors.required
      ? 'Password is required'
      : this.signupForm.get('password').errors.pattern
        ? 'Not a valid password'
        : '';
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onRegister() {
    this.authService.signup(this.signupForm.value).subscribe(
      response => {
        console.log(response);
        this.openSnackBar('Registered..!!', 'Success');
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.log(error);
      }
    );
  }
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
