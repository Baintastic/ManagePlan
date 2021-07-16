import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';

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

  constructor(public transactionService: TransactionService, public alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

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
    form.value.capture_Date = this.getCurrentDate();
    form.value.transaction_Date = new Date(form.value.transaction_Date);

    this.transactionService.postTransaction(form.value).subscribe(
      res => {
        this.showMessageAlert(AlertType.Success);
        setTimeout(() => {
          this.router.navigate([`/account-detail/${form.value.account_Code}`]);
          this.transactionService.refreshList(form.value.account_Code);
          this.resetForm(form);
        }, 2000);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    form.value.capture_Date = this.getCurrentDate();
    form.value.transaction_Date = new Date(form.value.transaction_Date);
    console.log("form is", form)

    this.transactionService.putTransaction().subscribe(
      res => {
        this.showMessageAlert(AlertType.UpdateSuccess);
        this.transactionService.refreshList(form.value.account_Code);
        this.ngOnInit();
        this.resetForm(form);
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

  resetForm(form: NgForm) {
    form.form.reset();
    this.transactionService.formData = new Transaction();
  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentDate = mm + '/' + dd + '/' + yyyy;
    return new Date(currentDate);
  }

}
