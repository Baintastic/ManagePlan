import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../shared/account.model';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styles: [
  ]
})
export class AccountDetailComponent implements OnInit {
  isEditForm = true;

  constructor(public service: AccountService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === "/add-person"){
      this.isEditForm = false;
      return;
    }
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.code == 0){
    console.log("from is",form);
    this.insertRecord(form);
    }
     //we will use the id as identifier for updating or insertion
    
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
      this.service.postAccount().subscribe(
        res => {
          this.resetForm(form);
          console.log("log is",form)
          this.service.refreshList(this.service.formData.person_Code);
          this.router.navigate([`detail/${this.service.formData.person_Code}`]);
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
          this.service.refreshList(this.service.formData.person_Code);
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
