import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  readonly _baseUrl = "https://localhost:44343/api/Transaction";
  formData: Transaction = new Transaction();
  list: Transaction[] = [];

  postTransaction(formValue: any) {
    return this.http.post(this._baseUrl, formValue, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  putTransaction() {
    return this.http.put(`${this._baseUrl}`, this.formData);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

  getTransactionById(id: number) {
    return this.http.get(`${this._baseUrl}/${id}`);
  }

  refreshList(accountId: number) {
    this.http.get(`${this._baseUrl}/account/${accountId}`)
      .toPromise()
      .then(res => { this.list = res as Transaction[]; });
  }
}
