import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts/shared/account.service';
import { Transaction } from './shared/transaction.model';
import { TransactionService } from './shared/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styles: [
  ]
})
export class TransactionsComponent implements OnInit {

  constructor(public accountService: AccountService,public transactionService: TransactionService ) { }
  formData: Transaction = new Transaction();

  ngOnInit(): void {
    this.transactionService.refreshList(this.accountService.formData.code);
  }

  populateForm(selectedRecord: Transaction) {
    this.transactionService.formData = Object.assign({},selectedRecord);
  }
 
  onDelete(id:number)
  {
    this.transactionService.deleteTransaction(id)
    .subscribe(
      res=>{
         this.transactionService.refreshList(this.accountService.formData.code);
      },
      err=>{console.log(err)}
    )
  }

}
