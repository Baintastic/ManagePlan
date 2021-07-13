import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public transactionService: TransactionService, private route: ActivatedRoute ) { }
  formData: Transaction = new Transaction();
  accountId: number = 0;

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.transactionService.refreshList(this.accountId);
    console.log("account id is",this.accountId);

  }

  populateForm(selectedRecord: Transaction) {
    this.transactionService.formData = Object.assign({},selectedRecord);
  }
 
  onDelete(id:number)
  {
    this.transactionService.deleteTransaction(id)
    .subscribe(
      res=>{
         this.transactionService.refreshList(this.accountId);
      },
      err=>{console.log(err)}
    )
  }

}
