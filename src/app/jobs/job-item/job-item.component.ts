import { Component, OnInit, Input } from '@angular/core';
import { Job } from "../../shared/model/job";
import { Router } from "@angular/router";

@Component({
  selector: 'jb-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.less']
})
export class JobItemComponent implements OnInit {
  
  @Input() job: Job;

  constructor() { }

  ngOnInit() {
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
