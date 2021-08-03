import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../accounts/shared/account.service';
import { Transaction } from './shared/transaction.model';
import { TransactionService } from './shared/transaction.service';
import { Account } from '../accounts/shared/account.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styles: [
  ]
})
export class TransactionsComponent implements OnInit {

  accountId: number = 0;
  isAccountClosed = false;

  constructor(public transactionService: TransactionService, public accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccountById(this.accountId).subscribe(
      res => {
        var selectedAccountRecord = res as Account;
        this.isAccountClosed = selectedAccountRecord.is_Closed;
      },
      err => {
        console.log(err);
      }
    );
    this.transactionService.refreshList(this.accountId);
  }

  populateForm(selectedRecord: Transaction) {
    this.transactionService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(transactionId: number) {
    this.transactionService.deleteTransaction(transactionId)
      .subscribe(
        res => {
          this.transactionService.refreshList(this.accountId);
        },
        err => { console.log(err) }
      )
  }
}
