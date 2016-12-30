import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { Observable } from "Rxjs/rx";

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.less']
})
export class JobDetailComponent implements OnInit {

  public job$: Observable<Job>;
  private jobId: string;

  constructor(private jobService: JobService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params["id"];
    this.job$ = this.jobService.findJobById(this.jobId);
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
