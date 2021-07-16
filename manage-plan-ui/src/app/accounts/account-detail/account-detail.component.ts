import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
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
  showAlertMessage = false;
  selectedAccountRecord: Account = new Account();
  recordExists = false;

  constructor(public accountService: AccountService, public alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.url.includes("/add-account")) {
      this.accountService.formData = new Account();
      this.accountService.formData.person_Code = Number(this.route.snapshot.paramMap.get('personId'));
      this.isEditForm = false;
    }
    else {
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
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.accountService.getAccountByAccountNumber(form.value.account_Number).subscribe(
      res => {
        var data = res as Account;
        if (data) {
          this.recordExists = true;
          this.showMessageAlert(AlertType.Warning, "account number");
        }
        else {

          this.accountService.postAccount(form.value).subscribe(
            res => {
              this.showMessageAlert(AlertType.Success);
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
        this.showMessageAlert(AlertType.UpdateSuccess);
        this.accountService.refreshList(form.value.person_Code);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  private showMessageAlert(alertType: AlertType, input: string = "") {
    this.alertService.changeMessage(alertType, input);
    this.showAlertMessage = true;
    this.closeAlertMessage();
  }

  private closeAlertMessage() {
    setTimeout(() => {
      this.showAlertMessage = false;
    }, 4000);
  }

  private resetForm(form: NgForm) {
    form.form.reset();
    this.accountService.formData = new Account();
  }
}
