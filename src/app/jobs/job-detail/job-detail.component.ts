import { SeoService } from './../../shared/services/seo.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.less']
})
export class JobDetailComponent implements OnInit {

  public job: Job;
  private jobId: string;
  private sub: Subscription;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(job => {
      this.job = job;
      if(this.job) {
        this.seoService.setTitle(`${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`);
        this.seoService.setMetaDescription('${this.job.jobTitle}, ${this.job.companyName}');
        this.seoService.setMetaRobots('Index, Follow');
      }
    });
  }

  getJobType(jobType: string) {
    switch(jobType) {
      case "fulltime":
        return "Full-time";
      case "parttime":
        return "Part-time";
      case "intern":
        return "Thực tập";
    }
  }
}
