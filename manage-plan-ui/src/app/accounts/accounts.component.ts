import { Component, OnInit } from '@angular/core';
import { PersonService } from '../persons/shared/person.service';
import { Account } from './shared/account.model';
import { AccountService } from './shared/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styles: [
  ]
})
export class AccountsComponent implements OnInit {

  constructor(public personService: PersonService,public accountService: AccountService ) { }
  searchText: string = "";
  formData: Account = new Account();

  ngOnInit(): void {
    this.accountService.refreshList(this.personService.formData.code);
  }

  populateForm(selectedRecord: Account) {
    this.accountService.formData = Object.assign({},selectedRecord);
  }
 
  onDelete(id:number)
  {
    this.accountService.deleteAccount(id)
    .subscribe(
      res=>{
         this.accountService.refreshList(this.personService.formData.code);
      },
      err=>{console.log(err)}
    )
  }

}
