import { Subscription } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from './../../shared/services/search.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, NgZone, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jb-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.less']
})
export class SidebarAdminComponent implements OnInit, OnDestroy {

  @Output() resultsChange = new EventEmitter();

  public searchForm: FormGroup;
  public loggedIn: boolean;

  private sub: Subscription;

  constructor(private authService:AuthService,
              private fb: FormBuilder,
              private searchService: SearchService,
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
    this.sub = this.searchService.doSearch(this.searchForm.value).subscribe(value => {
      this.zone.run(() => {
        if(value.hasOwnProperty("hits")) {
          this.resultsChange.emit({
            results: value["hits"],
            totalResults: value["total"]
          });
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
