import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {AuthInfo} from "../../shared/services/auth-info";

@Component({
  selector: 'jb-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.less']
})
export class NavbarAdminComponent implements OnInit {
  
  authInfo: AuthInfo;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  onLogout() {
    this.authService.logout();
  }

}
