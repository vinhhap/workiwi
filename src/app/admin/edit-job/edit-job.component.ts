import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JobService } from "../../shared/services/job.service";
import { Job } from "../../shared/services/job";

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
              private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.sub = this.jobService.findJobById(this.jobId).subscribe(data => {
      this.job = data;
    });
  }

  onSave(form) {
    this.jobService.editJob(form.form.value, this.jobId, this.job);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
