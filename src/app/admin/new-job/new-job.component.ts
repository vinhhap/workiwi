import { SeoService } from './../../shared/services/seo.service';
import { Component, OnInit } from '@angular/core';
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.less']
})
export class NewJobComponent implements OnInit {

  constructor(private jobService: JobService, private seoService: SeoService) {
    seoService.setTitle('Thêm công việc | Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('None');
  }

  ngOnInit() {
  }

  onSave(form) {
    this.jobService.createNewJob(form.form.value);
  }

  onReset(form) {
    form.form.reset();
  }
}
