import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
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

  constructor(public accountService: AccountService, public personService: PersonService, public alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  isEditForm = true;
  showAlert = false;
  selectedAccountRecord: Account = new Account();
  recordExists = false;

  ngOnInit(): void {
    if (this.router.url.includes("/add-account")) {
      this.accountService.formData = new Account();
      this.accountService.formData.person_Code = Number(this.route.snapshot.paramMap.get('personId'));
      this.isEditForm = false;
    }
    else{
      var accountId = Number(this.route.snapshot.paramMap.get('id'));
      this.accountService.getAccountById(accountId).subscribe(
        res => {
          this.selectedAccountRecord = res as Account
          this.accountService.formData = Object.assign({}, this.selectedAccountRecord);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.accountService.formData.code == 0) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log(form.value)

    this.accountService.getAccountByAccountNumber(form.value.account_Number).subscribe(
      res => {
        var data = res as Account;
        if (data) {
          this.recordExists = true;
          this.alertService.changeMessage(AlertType.Warning, "account number")
          this.showAlert = true;
          this.closeAlert();
        }
        else {
          
          this.accountService.postAccount(form.value).subscribe(
            res => {
              this.alertService.changeMessage(AlertType.Success)
              this.showAlert = true;
              this.closeAlert();
              
              setTimeout(() => {
                this.router.navigate([`/person-detail/${form.value.person_Code}`]);
                this.accountService.refreshList(form.value.person_Code);
                this.resetForm(form);
              }, 2000);
            },
            err => {
              console.log(err);
            });
        }
      },
      err => {
        console.log(err);
      });
  }

  updateRecord(form: NgForm) {
    this.accountService.putAccount().subscribe(
      res => {
        this.alertService.changeMessage(AlertType.UpdateSuccess)
        this.showAlert = true;
        this.closeAlert();
        this.accountService.refreshList(form.value.person_Code);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.accountService.formData = new Account();
  }

  closeAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
