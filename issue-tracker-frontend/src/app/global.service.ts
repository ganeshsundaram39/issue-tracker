import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public showBackdrop = new Subject<boolean>();

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
  logout() {
    localStorage.removeItem('userdata');
    this.router.navigate(['/auth/login']);
  }
}
