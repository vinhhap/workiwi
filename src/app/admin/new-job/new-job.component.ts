import { Component, OnInit } from '@angular/core';
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.less']
})
export class NewJobComponent implements OnInit {

  constructor(private jobService: JobService) { }

  ngOnInit() {
  }

  onSave(form) {
    this.jobService.createNewJob(form.form.value);
  }

  onReset(form) {
    form.form.reset();
  }
}
