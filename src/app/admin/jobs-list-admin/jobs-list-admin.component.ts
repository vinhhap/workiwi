import { SeoService } from './../../shared/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-jobs-list-admin',
  templateUrl: './jobs-list-admin.component.html',
  styleUrls: ['./jobs-list-admin.component.less']
})
export class JobsListAdminComponent implements OnInit, OnDestroy {

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private type: string;
  private jobKey: string;
  private perPage: number = 15;
  public totalNum;
  public jobs: Job[];
  public isMore: boolean = true;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService) {
    seoService.setTitle('Quản lý | Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('None');
  }

  ngOnInit() {
    this.sub1 = this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      this.isMore = true;
      if(!this.type) {
        this.sub2 = this.jobService.totalJobsNum().subscribe(val => this.totalNum = val);
        this.sub3 = this.jobService.loadFirstJobsPage(this.perPage).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      } else {
        this.sub2 = this.jobService.totalJobsNumByType(this.type).subscribe(val => this.totalNum = val);
        this.sub3 = this.jobService.loadFirstJobsTypePage(this.perPage, this.type).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      }
    });
    
  }

  onLoadMore() {
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
    if(jobs.length <= 1) {
      this.isMore = false;
    }
    this.jobKey = jobs[0].$key;
    jobs.pop();
    this.jobs = this.jobs.concat(jobs.slice().reverse());
  }

  private subFirstPage(jobs) {
    if(jobs) {
      this.jobs = jobs.slice().reverse();
      if(jobs[0]) {
        this.jobKey = jobs[0].$key;
      }
    }
  }

  onRemove(key: string, type: string, city: string) {
    if(confirm("Bạn muốn xóa công việc này?")) {
      this.jobService.removeJob(key, type, city);
    }
  }

  get typeName(): string {
    switch(this.type) {
      case "fulltime":
        return "Full-time";
      case "parttime":
        return "Part-time";
      case "intern":
        return "Thực tập";
      default:
        return "";
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    if(this.sub4) {
      this.sub4.unsubscribe();
    }
  }
}
