import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts/shared/account.service';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { TransactionService } from '../transactions/shared/transaction.service';
import { Person } from './shared/person.model';
import { PersonService } from './shared/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styles: [
  ]
})
export class PersonsComponent implements OnInit {

  config: any;
  searchText: string = "";
  showAlertMessage = false;

  constructor(public personService: PersonService, public transactionService: TransactionService, public accountService: AccountService, public alertService: AlertService) { }

  ngOnInit(): void {

    this.personService.refreshList();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.personService.list.length
    };
  }

  populateForm(selectedRecord: Person) {
    this.personService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(personId: number) {
    var numofClosedAccounts = 0;
    //get accounts by person id
    this.accountService.refreshList(personId);
    var accounts = this.accountService.list;
    if (accounts.length !== 0) {
      for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].is_Closed) {
          numofClosedAccounts += 1;
        }
      }
      if (numofClosedAccounts === accounts.length) {
        var accountIds: number[] = [];
        for (let index = 0; index < accounts.length; index++) {
          accountIds[index] = accounts[index].code;
        }
        //get transactionIds
        var transactionIds: number[] = [];

        for (let index = 0; index < accountIds.length; index++) {
          transactionIds[index] = accountIds[index];
        }

        //delele person and associated accounts and transactions
        for (let index = 0; index < transactionIds.length; index++) {
          this.transactionService.deleteTransaction(transactionIds[index])
            .subscribe(
              res => {
                for (let index = 0; index < accountIds.length; index++) {
                  this.accountService.deleteAccount(accountIds[index])
                    .subscribe(
                      res => {
                        this.personService.deletePerson(personId)
                          .subscribe(
                            res => {
                              this.showMessageAlert(AlertType.DeleteSuccess);
                              this.personService.refreshList();
                            },
                            err => { console.log(err) }
                          )
                      },
                      err => { console.log(err) }
                    )
                }
              },
              err => { console.log(err) }
            )
        }
      }
      else {
        this.showMessageAlert(AlertType.Error, "Unable to delete person record. Close all open accounts related to the person.");
      }
    }
    else {
      this.personService.deletePerson(personId)
        .subscribe(
          res => {
            this.showMessageAlert(AlertType.DeleteSuccess);
            this.personService.refreshList();
          },
          err => { console.log(err) }
        )
    }
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
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
