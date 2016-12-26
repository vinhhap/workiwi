import { Component, OnInit, Input } from '@angular/core';
import { Job } from "../../shared/services/job";

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

}
