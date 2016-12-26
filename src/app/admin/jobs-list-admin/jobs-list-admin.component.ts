import { Component, OnInit } from '@angular/core';
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { Observable } from "Rxjs/rx";

@Component({
  selector: 'jb-jobs-list-admin',
  templateUrl: './jobs-list-admin.component.html',
  styleUrls: ['./jobs-list-admin.component.less']
})
export class JobsListAdminComponent implements OnInit {

  public jobs$: Observable<Job[]>;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs$ = this.jobService.findAllJob();
  }

}
