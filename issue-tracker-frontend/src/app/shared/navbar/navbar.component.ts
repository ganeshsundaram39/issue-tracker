import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private globalService: GlobalService, private router: Router) { }

  ngOnInit(): void {
  }
  profilePicWasClicked(status) {
    this.globalService.showBackdrop.next(status);
  }
  goToRoute(routeName) {
    if (routeName === 'profile') {
      this.router.navigate(['/profile']);
    }
    if (routeName === 'new-issue') {
      this.router.navigate(['/issues', 'new']);
    }
  }
  logout() {
    this.globalService.logout();
  }

}
