import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "Rxjs/rx";
import { Job } from "../../shared/services/job";
import { JobService } from "../../shared/services/job.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.less']
})
export class JobsListComponent implements OnInit, OnDestroy {

  public jobs$: Observable<Job[]>;
  private subscription: Subscription;
  private type: string;

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
