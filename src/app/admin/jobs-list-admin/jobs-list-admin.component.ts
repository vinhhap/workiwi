import { PageTitleAdminService } from './../../shared/services/page-title-admin.service';
import { SeoService } from './../../shared/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Job } from "../../shared/model/job";
import { JobService } from "../../shared/services/job.service";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-jobs-list-admin',
  templateUrl: './jobs-list-admin.component.html',
  styleUrls: ['./jobs-list-admin.component.less']
})
export class JobsListAdminComponent implements OnInit, OnDestroy {

  @Output() pageTitle = new EventEmitter();

  private sub1: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private type: string;
  private jobKey: string;
  private perPage: number = 15;
  public jobs: Job[];
  public isMore: boolean = true;
  public isLoading: boolean = false;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private pageTitleAdminService: PageTitleAdminService) {
    seoService.setTitle('Quản lý công việc | Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('None');
  }

  ngOnInit() {
    this.sub1 = this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      this.isMore = true;
      switch(this.type) {
        case "fulltime":
          this.pageTitleAdminService.changeTitle('<i aria-hidden="true" class="fa fa-battery-full"></i> Quản lý công việc [Full-time]');
          break;
        case "parttime":
          this.pageTitleAdminService.changeTitle('<i aria-hidden="true" class="fa fa-battery-half"></i> Quản lý công việc [Part-time]');
          break;
        case "intern":
          this.pageTitleAdminService.changeTitle('<i aria-hidden="true" class="fa fa-podcast"></i> Quản lý công việc [Thực tập]');
          break;
        default:
          this.pageTitleAdminService.changeTitle('<i aria-hidden="true" class="fa fa-globe"></i> Quản lý công việc [Toàn bộ]');
      }
      if(!this.type) {
        this.sub3 = this.jobService.loadFirstJobsPage(this.perPage).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      } else {
        this.sub3 = this.jobService.loadFirstJobsTypePage(this.perPage, this.type).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      }
    });
    
  }

  onLoadMore() {
    this.isLoading = true;
    if(!this.type) {
      this.sub4 = this.jobService.loadNextJobsPage(
        this.jobKey,
        this.perPage
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    } else {
      this.sub4 = this.jobService.loadNextJobsTypePage(
        this.jobKey,
        this.perPage,
        this.type
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    }
  }

   private subLoadMore(jobs) {
    if(jobs.length > 0 && jobs[jobs.length - 1].$key === this.jobKey) {
      this.isLoading = false;
      if(jobs.length <= 1) {
        this.isMore = false;
      }
      this.jobKey = jobs[0].$key;
      jobs.pop();
      this.jobs = this.jobs.concat(jobs.slice().reverse());
    }
  }

  private subFirstPage(jobs) {
    if(jobs.length > 0) {
      this.jobs = jobs.slice().reverse();
      this.jobKey = jobs[0].$key;
    } else {
      this.jobs = [];
    }
  }

  onRemove(key: string, type: string, city: string) {
    if(confirm("Bạn muốn xóa công việc này?")) {
      this.jobService.removeJob(key, type, city);
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub3.unsubscribe();
    if(this.sub4) {
      this.sub4.unsubscribe();
    }
  }
}
