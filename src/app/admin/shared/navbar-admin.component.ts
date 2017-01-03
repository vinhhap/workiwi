import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { SearchService } from './../../shared/services/search.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'jb-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.less']
})
export class NavbarAdminComponent implements OnInit, OnDestroy {
  
  public loggedIn: boolean;
  public searchForm: FormGroup;
  public results: Array<any> = [];
  public totalResults: number = 0;

  private sub: Subscription;

  constructor(private authService:AuthService,
              private fb: FormBuilder,
              private searchService: SearchService,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(auth => this.loggedIn = !!auth);
    this.searchForm = this.fb.group({
      index: ["firebase"],
      type: ["job"],
      q: ["", Validators.required]
    });
  }

  onSearch() {
    this.results = [];
    this.totalResults = 0;
    this.sub = this.searchService.doSearch(this.searchForm.value).subscribe(value => {
      this.zone.run(() => {
        if(value.hasOwnProperty("hits")) {
          this.results = value["hits"];
          this.totalResults = value["total"];
        }
      });
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
