import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { AuthenticationGuard } from './auth-guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonsComponent } from './persons/persons.component';
import { TransactionDetailComponent } from './transactions/transaction-details/transaction-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate:[AuthenticationGuard]},
  { path: 'persons', component: PersonsComponent, canActivate:[AuthenticationGuard]
  // children: [
  //     { path: 'detail/:id', component: PersonDetailComponent },
  //     { path: 'add', component: PersonDetailComponent },

  //   ] 
  },
  { path: 'person-detail/:id', component: PersonDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'add-person', component: PersonDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'account-detail/:id', component: AccountDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'add-account', component: AccountDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'transaction-detail/:id', component: TransactionDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'add-transaction', component: TransactionDetailComponent, canActivate:[AuthenticationGuard]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
