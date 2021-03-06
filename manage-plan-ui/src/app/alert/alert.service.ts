import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private messageSource = new BehaviorSubject(new Alert());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(alertType: AlertType, input: string = "") {
    var alert = new Alert();
    if(alertType === AlertType.Success){
      alert.message = "Record was successfully created.";
      alert.class = "alert-success";
    }
    else if(alertType === AlertType.UpdateSuccess){
      alert.message = "Changes were successfully saved.";
      alert.class = "alert-success";
      alert.input = input;
    }
    else if(alertType === AlertType.DeleteSuccess){
      alert.message = "Record has been deleted.";
      alert.class = "alert-success";
      alert.input = input;
    }
    else if(alertType === AlertType.LoginSuccess){
      alert.message = "Login successful.";
      alert.class = "alert-success";
      alert.input = input;
    }
    else if(alertType === AlertType.Warning){
      alert.message =`This ${input} already exits.`;
      alert.class = "alert-warning";
    }
    else if(alertType === AlertType.Error){
      alert.message =`${input}`;
      alert.class = "alert-danger";
    }

    this.messageSource.next(alert)
  }
}
