import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';


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
    private _snackBar: MatSnackBar,
    private routeGuardService: AuthService
  ) {
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
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
    if (this.routeGuardService.isUserLoggedIn({})) {
      this.router.navigate(['/issues']);
    }
  }

  tabClick(tab) {
    if (tab.index === 0) {
      this.router.navigate(['../login'], { relativeTo: this.route });
      return;
    }
    this.router.navigate(['../register'], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onRegister() {
    this.authService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          this.openSnackBar(response.message, 'Error');
        } else {
          this.openSnackBar('Registered..!!', 'Success');
          this.router.navigate(['/auth/login']);
        }
      },
      error => {
        if (error && error.error) {
          this.openSnackBar(error.error.message, 'Error');
        } else {
          console.log(error);
          this.openSnackBar('Something went wrong..!!', 'Error');
        }
      }
    );
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          this.openSnackBar(response.message, 'Error');
        } else {
          if (response.message === 'Login Successful' && response.data) {
            localStorage.setItem('userdata', JSON.stringify({ ...response.data }));
            this.router.navigate(['/issues']);
          }
        }
      },
      error => {
        console.log(error);
        if (error && error.error) {
          this.openSnackBar(error.error.message, 'Error');
        } else {
          this.openSnackBar('Something went wrong..!!', 'Error');
        }
      }
    );
  }
}
