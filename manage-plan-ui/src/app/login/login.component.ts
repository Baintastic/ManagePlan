import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { Login } from './shared/login.model';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showAlertMessage = false;
  formData: Login = new Login();

  constructor(public loginService: LoginService, public alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.login(form);
  }

  login(form: NgForm) {
    this.loginService.authenticate(form.value)
      .subscribe(
        res => {
          var login = res as Login;
          localStorage.setItem('userToken',login.token)  
          this.showMessageAlert(AlertType.LoginSuccess);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        err => {
          this.showMessageAlert(AlertType.Error, "Login failed. Incorrect username or password.");
          console.log(err)
        }
      )
  }

  private showMessageAlert(alertType: AlertType, input: string = "") {
    this.alertService.changeMessage(alertType, input);
    this.showAlertMessage = true;
    this.closeAlertMessage();
  }

  private closeAlertMessage() {
    setTimeout(() => {
      this.showAlertMessage = false;
    }, 5000);
  }
}
