import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  readonly _baseUrl = "https://localhost:44343/api/Account";
  formData: Account = new Account();
  list: Account[] = [];

  postAccount(formValue: any) {
    return this.http.post(this._baseUrl, formValue, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  putAccount() {
    return this.http.put(`${this._baseUrl}`, this.formData);
  }

  deleteAccount(id: number) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

  refreshList(personId: number) {
    this.http.get(`${this._baseUrl}/person/${personId}`)
      .toPromise()
      .then(res => { this.list = res as Account[]; });
  }

  getAccount(id: number) {
    return this.http.get(`${this._baseUrl}/${id}`);
  }

}
