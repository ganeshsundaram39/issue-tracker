import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.url + environment.version + 'users';
  constructor(private http: HttpClient) { }
  signup(signupObject) {
    return this.http.post(this.baseUrl + '/signup', signupObject);
  }
  login(loginObj) {
    return this.http.post(this.baseUrl + '/login', loginObj);
  }
}
