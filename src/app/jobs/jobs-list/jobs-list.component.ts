import { SearchService } from './../../shared/services/search.service';
import { SeoService } from './../../shared/services/seo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "Rxjs/rx";
import { Job } from "../../shared/model/job";
import { JobService } from "../../shared/services/job.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'jb-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.less']
})
export class JobsListComponent implements OnInit, OnDestroy {

  public jobs: Job[];
  public isMore: boolean = true;
  public isSearch: boolean = false;
  public totalSearch: number = 0;
  public type: string;
  public city: string;
  public query: string;
  public isLoading: boolean = false;
  private jobKey: string;
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private perPage: number = 10;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private searchService: SearchService,
              private slimLoadingBarService: SlimLoadingBarService) {
    seoService.setTitle('Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('Index, Follow');
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.sub1 = this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      this.city = params["city"];
      this.query = params["q"];
      this.isMore = true;
      this.isSearch = false;

      if(this.type) {
        this.sub2 = this.jobService.loadFirstJobsTypePage(this.perPage, this.type).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      } else if(this.city) {
        this.sub2 = this.jobService.loadFirstJobsCityPage(this.perPage, this.city).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      } else if(params["q"]) {
        this.sub2= this.searchService.doSearch({
          index: "firebase",
          type: "job",
          q: params["q"]
        }).subscribe(jobs => {
          this.isMore = false;
          this.isSearch = true;
          this.slimLoadingBarService.complete();
          let results = [];
          if(jobs) {
            this.totalSearch = jobs["total"];
            if(jobs["hits"] && jobs["hits"].length > 0) {
               results = jobs["hits"].map(job => {
                return {
                  $key: job._id,
                  jobTitle: job._source.jobTitle,
                  city: job._source.city,
                  companyName: job._source.companyName,
                  url: job._source.url,
                  logo: job._source.logo,
                  jobType: job._source.jobType,
                  deadline: job._source.deadline
                }
              });
              this.jobs = results.slice().reverse();
            } else {
              this.jobs = [];
            }
           
          }
        });
      } else {
        this.sub2 = this.jobService.loadFirstJobsPage(this.perPage).subscribe(jobs => {
          this.subFirstPage(jobs);
        });
      }
    });
  }

  onLoadMore() {
    this.isLoading = true;
    if(this.type) {
      this.sub3 = this.jobService.loadNextJobsTypePage(
        this.jobKey,
        this.perPage,
        this.type
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    } else if(this.city) {
      this.sub3 = this.jobService.loadNextJobsCityPage(
        this.jobKey,
        this.perPage,
        this.city
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    } else {
      this.sub3 = this.jobService.loadNextJobsPage(
        this.jobKey,
        this.perPage
      ).subscribe(jobs => {
        this.subLoadMore(jobs);
      });
    }
  }

  private subLoadMore(jobs) {
    this.isLoading = false;
    if(jobs.length <= 1) {
      this.isMore = false;
    }
    this.jobKey = jobs[0].$key;
    jobs.pop();
    this.jobs = this.jobs.concat(jobs.slice().reverse());
  }

  private subFirstPage(jobs) {
    this.slimLoadingBarService.complete();
    if(jobs.length > 0) {
      this.isMore = true;
      this.jobs = jobs.slice().reverse();
      if(jobs[0]) {
        this.jobKey = jobs[0].$key;
      }
    } else {
      this.jobs = [];
      this.isMore = false;
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
