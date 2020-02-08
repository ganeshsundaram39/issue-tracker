import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  loading = false;
  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
  }
  ngAfterViewChecked() {
    this.router.events.subscribe(
      (event: RouterEvent): void => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      }
    );
    this.cdRef.detectChanges();
  }
}
