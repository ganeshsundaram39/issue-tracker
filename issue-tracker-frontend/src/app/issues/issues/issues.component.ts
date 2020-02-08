import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  showBackdrop = false;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.showBackdrop.subscribe(status => {
      this.showBackdrop = status;
    });
  }

}
