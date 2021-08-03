import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { Account } from './shared/account.model';
import { AccountService } from './shared/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styles: [
  ]
})
export class AccountsComponent implements OnInit {

  searchText: string = "";
  personId: number = 0;
  isClosed = false;
  showAlertMessage = false;

  constructor(public accountService: AccountService, public alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.refreshList(this.personId);
  }

  populateForm(selectedRecord: Account) {
    this.accountService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    this.accountService.deleteAccount(id)
      .subscribe(
        res => {
          this.accountService.refreshList(this.personId);
        },
        err => { console.log(err) }
      )
  }

  onClosedOrOpen(accountId: number) {
    this.accountService.getAccountById(accountId).subscribe(
      res => {
        var selectedAccountRecord = res as Account;
        this.accountService.formData = Object.assign({}, selectedAccountRecord);
        if (this.accountService.formData.outstanding_Balance === 0) {
          this.accountService.formData.is_Closed = !this.accountService.formData.is_Closed;
          this.accountService.putAccount().subscribe(
            res => {
              this.showMessageAlert(AlertType.UpdateSuccess);
              this.ngOnInit();
            },
            err => {
              console.log(err);
            }
          );
        }
        else{
          this.showMessageAlert(AlertType.Error, "Unable to close account due to an outstanding balance.");
        }
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
    }, 5000);
  }
}
