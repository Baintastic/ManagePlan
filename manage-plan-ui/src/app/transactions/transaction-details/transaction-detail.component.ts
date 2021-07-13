import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styles: [
  ]
})
export class TransactionDetailComponent implements OnInit {

  constructor(public service: TransactionService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {  }
  accountId: number = 0;

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('accountId'));
    console.log("account id for trans is",this.accountId);

  }

  onSubmit(form: NgForm) {
    if(this.service.formData.code == 0) //we will use the id as identifier for updating or insertion
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log("account id for for insert is",this.accountId)
    this.fb.group({
      capture_Date: ['', Validators.required],
    }); 
    form.value.capture_Date = this.getCurrentDate();
    form.value.transaction_Date = new Date(form.value.transaction_Date);
    this.service.postTransaction(form.value).subscribe(
      res => {
        this.service.refreshList(this.accountId);
        this.router.navigate([`account-detail/${this.accountId}`]);
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
    }

  updateRecord(form: NgForm) {
    this.fb.group({
      capture_Date: ['', Validators.required],
    }); 
    form.value.capture_Date = this.getCurrentDate();
    form.value.transaction_Date = new Date(form.value.transaction_Date);
    console.log("form is",form)

    this.service.putTransaction().subscribe(
      res => {
        this.service.refreshList(this.accountId);
        this.resetForm(form);
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

    getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var currentDate = mm + '/' + dd + '/' + yyyy;
      return new Date(currentDate);
    }

}
