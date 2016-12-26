import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JobService } from "../../shared/services/job.service";
import { Job } from "../../shared/services/job";
import { Observable } from "Rxjs/rx";

@Component({
  selector: 'jb-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.less']
})
export class EditJobComponent implements OnInit {

  public job$: Observable<Job>;
  private jobId: string;

  constructor(private jobService: JobService,
              private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.job$ = this.jobService.findJobById(this.jobId);
  }

  onSave(form) {
    this.jobService.editJob(form.form.value, this.jobId);
  }
}
