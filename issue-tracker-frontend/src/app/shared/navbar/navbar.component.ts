import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
  }
  profilePicWasClicked(status) {
    this.globalService.showBackdrop.next(status);
  }
  logout() {
    this.globalService.logout();
  }

}
