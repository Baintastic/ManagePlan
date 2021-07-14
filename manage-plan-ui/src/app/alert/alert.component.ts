import {Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
  message: string = '';
  alertClass: string = '';
  constructor(public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.currentMessage.subscribe(result => this.message = result.message);
    this.alertService.currentMessage.subscribe(result => this.alertClass = result.class);
  }

}
