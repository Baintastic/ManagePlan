import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styles: [
  ]
})
export class PersonDetailComponent implements OnInit {
  isEditForm = true;
  constructor(public service: PersonService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === "/add-person"){
      this.isEditForm = false;
      return;
    }
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.code == 0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
      this.service.postPerson(form.value).subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList();
          this.router.navigate(['/persons']);
        },
        err => {
          console.log(err);
        }
      );
    }

  updateRecord(form: NgForm) {
      this.service.putPerson().subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
    
  resetForm(form: NgForm) {
      form.form.reset();
      this.service.formData = new Person();
    }

}
