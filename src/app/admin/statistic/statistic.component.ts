import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleAdminService } from "../../shared/services/page-title-admin.service";
import { StatisticService } from "../../shared/services/statistic.service";
import { Subscription } from "rxjs/Rx";
import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'jb-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit, OnDestroy {
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  public total;
  public fulltime;
  public parttime;
  public intern;

  constructor(private pageTitleAdminService: PageTitleAdminService,
              private statisticService: StatisticService,
              private seoService: SeoService) {
                seoService.setTitle('Thống kê | Workiwi | Trang tuyển dụng việc làm cho Start Up');
                seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
                seoService.setMetaRobots('None');
              }

  ngOnInit() {
    this.pageTitleAdminService.changeTitle('<i aria-hidden="true" class="fa fa-area-chart"></i> Thống kê');
    this.sub1 = this.statisticService.totalJobsNum().subscribe(val => {
      this.total = val;
    });
    this.sub2 = this.statisticService.totalJobsNumByType("fulltime").subscribe(val => {
      this.fulltime = val;
    });
    this.sub3 = this.statisticService.totalJobsNumByType("parttime").subscribe(val => {
      this.parttime = val;
    });
    this.sub4 = this.statisticService.totalJobsNumByType("intern").subscribe(val => {
      this.intern = val;
    });
  }
  
  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    if(this.sub3) {
      this.sub3.unsubscribe();
    }
    if(this.sub4) {
      this.sub4.unsubscribe();
    }
  }

}
