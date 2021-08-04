import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  readonly _baseUrl = "https://localhost:44343/api/auth/login";
  formData: Login = new Login();
  list: Login[] = [];

  authenticate(formValue: any) {
    return this.http.post(this._baseUrl, formValue, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
