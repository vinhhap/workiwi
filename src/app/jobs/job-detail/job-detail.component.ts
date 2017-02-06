import { Subscription, Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Job } from "../../shared/model/job";
import { JobService } from "../../shared/services/job.service";
import { ShareButton, ShareProvider } from "ng2-sharebuttons";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Company } from "../../shared/model/company";
import { CompanyService } from "../../shared/services/company.service";
import { SeoService } from "../../shared/services/seo.service";

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.less']
})
export class JobDetailComponent implements OnInit, OnDestroy {

  public job: Job;
  private jobId: string;
  private sub: Subscription;
  private sub2: Subscription;
  public facebookButton;
  public googlePlusButton;
  public linkedButton;
  public twitterButton;
  public description = "";
  public title = ""
  public image = "";
  public company: Company;
  public isLoading: boolean = true;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private slimLoadingBarService: SlimLoadingBarService,
              private companyService: CompanyService,
              private seoService: SeoService
  ) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.facebookButton = new ShareButton(
      ShareProvider.FACEBOOK,
      "<img src='assets/images/facebook.svg'>  ",
      "facebook social-btn"
    );
    this.googlePlusButton = new ShareButton(
      ShareProvider.GOOGLEPLUS,
      "<img src='assets/images/google-plus.svg'>  ",
      "google_plus social-btn"
    );
    this.linkedButton = new ShareButton(
      ShareProvider.LINKEDIN,
      "<img src='assets/images/linkedin.svg'>  ",
      "linked_in social-btn"
    );
    this.twitterButton = new ShareButton(
      ShareProvider.TWITTER,
      "<img src='assets/images/twitter.svg'>  ",
      "twitter social-btn"
    );
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(job => {
      this.job = job;
      if(this.job) {
        this.seoService.setTitle(`${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`);
        this.seoService.setMetaDescription('${this.job.jobTitle}, ${this.job.companyName}');
        this.seoService.setMetaRobots('Index, Follow');
        this.description = `${this.job.jobTitle} tại ${this.job.city}. Click vào link để xem chi tiết`;
        this.title = `${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`;
        this.image = this.job.logo;
        this.isLoading = false;
        if(this.job.companyKey) {
          this.sub2 = this.companyService.findCompanyById(this.job.companyKey).subscribe(val => {
            this.company = val;
            this.slimLoadingBarService.complete();
          });
        } else {
          this.slimLoadingBarService.complete();
        }
      }
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub2) {
      this.sub.unsubscribe();
    }
  }
}
