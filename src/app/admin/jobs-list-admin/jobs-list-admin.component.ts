import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-jobs-list-admin',
  templateUrl: './jobs-list-admin.component.html',
  styleUrls: ['./jobs-list-admin.component.less']
})
export class JobsListAdminComponent implements OnInit {

  private subscription: Subscription;
  private type: string

  public jobs$: Observable<Job[]>;

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      if(!this.type) {
        this.jobs$ = this.jobService.findAllJob();
      } else {
        this.jobs$ = this.jobService.findJobByType(this.type);
      }
    });
  }

  onRemove(key: string) {
    if(confirm("Bạn muốn xóa công việc này?")) {
      this.jobService.removeJob(key);
    }
  }

}
