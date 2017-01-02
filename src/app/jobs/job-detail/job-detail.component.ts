import { Subscription, Observable } from 'rxjs/Rx';
import { MetaService } from 'ng2-meta';
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
              private metaService: MetaService
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(job => {
      this.job = job;
      if(this.job) {
        this.metaService.setTitle(`${this.job.jobTitle} | ${this.job.jobType} | Workiwi`);
        this.metaService.setTag('og:image', this.job.logo);
        this.metaService.setTag('keywords', `${this.job.jobType}, ${this.job.jobTitle}, ${this.job.companyName}`);
        this.metaService.setTag('og:description', this.job.description);
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
