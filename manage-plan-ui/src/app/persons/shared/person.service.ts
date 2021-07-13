import { Injectable } from '@angular/core';
import { Person } from './person.model'
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  readonly _baseUrl = "https://localhost:44343/api/Person";
  formData: Person = new Person();
  list: Person[] = [];

  postPerson(formValue : any) {
      return this.http.post(this._baseUrl ,formValue, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
    }

  putPerson() {
      return this.http.put(`${this._baseUrl}` ,this.formData);
    }

  deletePerson(id:number)
    {
       return this.http.delete(`${this._baseUrl}/${id}`);
    }

  getPerson(id:number)
  {
      return this.http.get(`${this._baseUrl}/${id}`)
      .toPromise()
      .then(res => {this.formData = res as Person; });;
  }

  refreshList() {
      this.http.get(this._baseUrl)
        .toPromise()
        .then(res => {this.list = res as Person[]; });
        
    }
}
