import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  searchText: string = "";
  formData: Account = new Account();
  personId: number = 0;

  constructor(public accountService: AccountService, private route: ActivatedRoute) { }

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

}
