import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { TransactionDetailComponent } from './transactions/transaction-details/transaction-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertModule } from './alert/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonDetailComponent,
    AccountsComponent,
    AccountDetailComponent,
    TransactionsComponent,
    HomeComponent,
    TransactionDetailComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AlertModule,
    NgbModule,
    NoopAnimationsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
