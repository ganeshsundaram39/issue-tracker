import { Component, ViewChild, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IssueService } from '../issue.service';

@Component({
  selector: "app-issue-list",
  templateUrl: "./issue-list.component.html",
  styleUrls: ["./issue-list.component.scss"],
})
export class IssueListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'issueGenerationTime'];

  data = [];

  resultsLength = 0;
  isLoadingResults = true;
  noIssueFound = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private issueServer: IssueService,) { }

  ngOnInit() {
    this.issueServer.allIssue().subscribe(res => {
      this.data = res['data'];
      this.isLoadingResults = false;

      console.log(res);
    }, err => {
      console.log(err);
      this.data = [];
    })
  }

}


