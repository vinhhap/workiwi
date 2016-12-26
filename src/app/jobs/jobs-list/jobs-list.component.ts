import { Component, OnInit } from '@angular/core';
import { Observable } from "Rxjs/rx";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.less']
})
export class JobsListComponent implements OnInit {

  public jobs$: Observable<Job[]>;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs$ = this.jobService.findAllJob();
    console.log(this.jobs$);
  }

}
