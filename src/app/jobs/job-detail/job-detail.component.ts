import { SeoService } from './../../shared/services/seo.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { ShareButton, ShareProvider } from "ng2-sharebuttons";
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.less']
})
export class JobDetailComponent implements OnInit {

  public job: Job;
  private jobId: string;
  private sub: Subscription;
  public facebookButton;
  public googlePlusButton;
  public linkedButton;
  public twitterButton;
  public description = "";
  public title = ""
  public image = "";

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    this.facebookButton = new ShareButton(
      ShareProvider.FACEBOOK,
      "<img src='assets/images/facebook.svg'>  ",
      "facebook"
    );
    this.googlePlusButton = new ShareButton(
      ShareProvider.GOOGLEPLUS,
      "<img src='assets/images/google-plus.svg'>  ",
      "google_plus"
    );
    this.linkedButton = new ShareButton(
      ShareProvider.LINKEDIN,
      "<img src='assets/images/linkedin.svg'>  ",
      "linked_in"
    );
    this.twitterButton = new ShareButton(
      ShareProvider.TWITTER,
      "<img src='assets/images/twitter.svg'>  ",
      "twitter"
    );
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(job => {
      this.job = job;
      if(this.job) {
        this.slimLoadingBarService.complete();
        this.seoService.setTitle(`${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`);
        this.seoService.setMetaDescription('${this.job.jobTitle}, ${this.job.companyName}');
        this.seoService.setMetaRobots('Index, Follow');
        this.description = `${this.job.jobTitle} tại ${this.job.city}. Click vào link để xem chi tiết`;
        this.title = `${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`;
        this.image = this.job.logo;
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
