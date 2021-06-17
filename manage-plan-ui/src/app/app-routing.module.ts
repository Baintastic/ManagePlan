import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { HomeComponent } from './home/home.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonsComponent } from './persons/persons.component';
import { TransactionDetailComponent } from './transactions/transaction-details/transaction-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'persons', component: PersonsComponent,
  // children: [
  //     { path: 'detail/:id', component: PersonDetailComponent },
  //     { path: 'add', component: PersonDetailComponent },

  //   ] 
  },
  { path: 'person-detail/:id', component: PersonDetailComponent },
  { path: 'add-person', component: PersonDetailComponent },
  { path: 'account-detail/:id', component: AccountDetailComponent },
  { path: 'add-account', component: AccountDetailComponent },
  { path: 'transaction-detail/:id', component: TransactionDetailComponent },
  { path: 'add-transaction', component: TransactionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
