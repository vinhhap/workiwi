import { SeoService } from './../../shared/services/seo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "Rxjs/rx";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.less']
})
export class JobsListComponent implements OnInit, OnDestroy {

  public jobs: Job[];
  public isMore: boolean = true;
  private jobKey: string;
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private type: string;
  private perPage: number = 10;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService) {
    seoService.setTitle('Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('Index, Follow');
  }

  ngOnInit() {
    this.sub1 = this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      this.isMore = true;
      if(!this.type) {
        this.sub2 = this.jobService.loadFirstJobsPage(this.perPage).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      } else {
        this.sub2 = this.jobService.loadFirstJobsTypePage(this.perPage, this.type).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      }
    });
  }

  onLoadMore() {
    if(!this.type) {
      this.sub3 = this.jobService.loadNextJobsPage(
        this.jobKey,
        this.perPage
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    } else {
      this.sub3 = this.jobService.loadNextJobsTypePage(
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

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    if(this.sub3) {
      this.sub3.unsubscribe();
    }
    
  }
}
