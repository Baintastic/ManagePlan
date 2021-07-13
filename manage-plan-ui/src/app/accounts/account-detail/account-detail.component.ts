import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/persons/shared/person.model';
import { PersonService } from 'src/app/persons/shared/person.service';
import { Account } from '../shared/account.model';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styles: [
  ]
})
export class AccountDetailComponent implements OnInit {
  
  constructor(public service: AccountService,public personService: PersonService ,private router: Router, private route: ActivatedRoute) { }

  isEditForm = true;
  personId: number = 0;
  
  ngOnInit(): void {
    if(this.router.url.includes("/add-account")){
      this.isEditForm = false;
    }
    this.personId = Number(this.route.snapshot.paramMap.get('personId'));

    console.log("person id account detail is",this.personId);

  }

  onSubmit(form: NgForm) {
    if(this.service.formData.code == 0){
    this.insertRecord(form);
    }
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
    console.log(form.value)
    console.log("person id insert is",this.personId);

      this.service.postAccount(form.value).subscribe(
        res => {
          this.service.refreshList(this.personId);
          this.router.navigate([`/person-detail/${this.personId}`]);
          this.resetForm(form);
        },
        err => {
          console.log(err);
        }
      );
    }

  updateRecord(form: NgForm) {
      this.service.putAccount().subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList(this.personId);
        },
        err => {
          console.log(err);
        }
      );
    }
    
  resetForm(form: NgForm) {
      form.form.reset();
      this.service.formData = new Account();
    }
}
