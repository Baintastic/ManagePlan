import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/accounts/shared/account.service';
import { AlertType } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';
import { Account } from '../../accounts/shared/account.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styles: [
  ]
})
export class TransactionDetailComponent implements OnInit {

  showAlertMessage = false;
  selectedTransactionRecord: Transaction = new Transaction();
  recordExists = false;
  date : Date = new Date();

  constructor(public transactionService: TransactionService, public accountService: AccountService, public alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.router.url.includes("/add-transaction")) {
      this.transactionService.formData = new Transaction();
      this.transactionService.formData.account_Code = Number(this.route.snapshot.paramMap.get('accountId'));
    }
    else {
      var accountId = Number(this.route.snapshot.paramMap.get('id'));
      this.transactionService.getTransactionById(accountId).subscribe(
        res => {
          this.selectedTransactionRecord = res as Transaction
          this.transactionService.formData = Object.assign({}, this.selectedTransactionRecord);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.transactionService.formData.code == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    form.value.capture_Date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    form.value.transaction_Date = new Date(form.value.transaction_Date);
    this.transactionService.postTransaction(form.value).subscribe(
      res => {
        var isEditForm = false;
        this.UpdateAccountOutstandingBalance(form, isEditForm);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    var datestring = new Date().toLocaleDateString()
    var timestring = new Date().toLocaleTimeString()
    var date = new Date(datestring + ' ' + timestring);; 
   
    form.value.capture_Date = date;
    form.value.transaction_Date = new Date(form.value.transaction_Date);
   
    this.transactionService.putTransaction().subscribe(
      res => {
        var isEditForm = true;
        this.UpdateAccountOutstandingBalance(form, isEditForm);
      },
      err => {
        console.log(err);
      }
    );
  }

  private UpdateAccountOutstandingBalance(form: NgForm, isEditForm: boolean) {
    this.accountService.getAccountById(this.transactionService.formData.account_Code).subscribe(
      res => {
        var outstandingBalance = 0;
        var accountTransactions = this.transactionService.list;
        for (let index = 0; index < accountTransactions.length; index++) {
          if (accountTransactions[index].code !== this.transactionService.formData.code) {
            outstandingBalance += accountTransactions[index].amount;
          }
        }
        var selectedAccountRecord = res as Account;
        selectedAccountRecord.outstanding_Balance = outstandingBalance + form.value.amount;
        this.accountService.formData = Object.assign({}, selectedAccountRecord);

        this.accountService.putAccount().subscribe(
          res => {
            var alertType = AlertType.Success
            if (isEditForm) {
              alertType = AlertType.UpdateSuccess;
            }
            this.showMessageAlert(alertType);
            this.NavigateToAccountDetailPage(form);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  private NavigateToAccountDetailPage(form: NgForm) {
    setTimeout(() => {
      this.router.navigate([`/account-detail/${form.value.account_Code}`]);
      this.transactionService.refreshList(form.value.account_Code);
      this.resetForm(form);
    }, 2000);
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
    this.transactionService.formData = new Transaction();
  }

}
