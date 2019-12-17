import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }
  signup(signupObject) {
    return this.http.post(this.baseUrl + '/signup', signupObject);
  }
  login(loginObj) {
    return this.http.post(this.baseUrl + '/login', loginObj);
  }
}
