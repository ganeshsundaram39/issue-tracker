import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private baseUrl = environment.url + environment.version + 'issues';
  constructor(private http: HttpClient) { }
  createIssue(createIssueObject) {
    return this.http.post(this.baseUrl + "/create", createIssueObject);
  }
}
