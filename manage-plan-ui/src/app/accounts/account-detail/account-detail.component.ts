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
  personId: number = 0;
  showAlert = false;
  selectedAccountRecord: Account = new Account();
  recordExists = false;

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('personId'));
    if (this.router.url.includes("/add-account")) {
      this.accountService.formData = new Account();
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
      console.log("person id account detail is", this.personId);
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
    console.log("person id insert is", this.personId);

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
              console.log("this.personId insiide is ",this.personId)

              setInterval(() => {
                this.router.navigate([`/person-detail/${this.personId}`]);
              }, 2000);
              this.accountService.refreshList(this.personId);
              this.resetForm(form);
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
        this.resetForm(form);
        this.ngOnInit();
        this.accountService.refreshList(this.personId);
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
    setInterval(() => {
      this.showAlert = false;
    }, 4000);
  }
}
