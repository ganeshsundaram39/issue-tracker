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
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  logout() {
    this.globalService.logout();
  }

}
