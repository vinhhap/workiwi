import { SeoService } from './../../shared/services/seo.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JobService } from "../../shared/services/job.service";
import { Job } from "../../shared/model/job";

@Component({
  selector: 'jb-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.less']
})
export class EditJobComponent implements OnInit, OnDestroy {

  public job: Job;
  private jobId: string;
  private sub: Subscription;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private seoService: SeoService
  ) {
    
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(data => {
      this.job = data;
      if(this.job) {
        this.seoService.setTitle(`Chỉnh sửa ${this.job.jobTitle} | Workiwi | Trang tuyển dụng việc làm cho Start Up`);
        this.seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
        this.seoService.setMetaRobots('None');
      }
    });
  }

  onSave(form) {
    this.jobService.editJob(form.form.value, this.jobId, this.job);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
