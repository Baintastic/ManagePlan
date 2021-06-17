import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styles: [
  ]
})
export class TransactionDetailComponent implements OnInit {

  constructor(public service: TransactionService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.code == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
      this.service.postTransaction().subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList(this.service.formData.account_Code);
          this.router.navigate([`detail/${this.service.formData.account_Code}`]);
        },
        err => {
          console.log(err);
        }
      );
    }

  updateRecord(form: NgForm) {
      this.service.putTransaction().subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList(this.service.formData.account_Code);
        },
        err => {
          console.log(err);
        }
      );
    }
    
  resetForm(form: NgForm) {
      form.form.reset();
      this.service.formData = new Transaction();
    }

}
