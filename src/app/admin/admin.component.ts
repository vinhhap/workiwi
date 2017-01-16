import { Subscription } from 'rxjs/Rx';
import { PageTitleAdminService } from './../shared/services/page-title-admin.service';
import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'jb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit, OnDestroy {

  private sub1: Subscription;
  public pageTitle: string = "";
  public results: Array<any> = [];
  public totalResults: number = 0;

  constructor(private elementRef: ElementRef,
              private pageTitleAdminService: PageTitleAdminService) { }

  ngOnInit() {
    this.sub1 = this.pageTitleAdminService.pageTitle$.subscribe(value => {
      this.pageTitle = value;
    });
  }

  onSearchResult($event) {
    if($event) {
      this.results = $event.results;
      this.totalResults = $event.totalResults;
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
