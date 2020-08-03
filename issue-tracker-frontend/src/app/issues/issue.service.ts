import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: "root",
})
export class IssueService {
  private baseUrl = environment.url + environment.version + "issues"

  constructor(private http: HttpClient) {}

  createIssue(createIssueObject) {
    const postData = new FormData()
    postData.append("title", createIssueObject.title)
    postData.append("content", createIssueObject.description)
    const files = createIssueObject.images
    for (let i = 0; i < files.length; i++) {
      postData.append("images[]", files[i], files[i]["name"])
    }
    return this.http.post(this.baseUrl + "/create", postData)
  }
}
