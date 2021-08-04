import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './auth-guard/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'manage-plan-ui';
  showNavigationBar = false;

  constructor(private Authguardservice: AuthGuardService) { }

  ngOnInit(): void {
    if (this.Authguardservice.gettoken()) {
      this.showNavigationBar = true;
    }
  }
}
