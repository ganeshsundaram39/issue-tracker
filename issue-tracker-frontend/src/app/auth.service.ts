import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }
  isUserLoggedIn({ redirected = false }) {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata && userdata.authToken) {
      return true;
    } else {
      if (redirected) {
        this.router.navigate(['/auth/login']);
      }
      return false;
    }
  }
}
