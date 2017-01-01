import { auth } from 'firebase';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'jb-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.less']
})
export class NavbarAdminComponent implements OnInit {
  
  public loggedIn: boolean;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(auth => this.loggedIn = !!auth);
  }

  onLogout() {
    this.authService.logout();
  }

}
