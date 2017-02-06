import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { Job } from "../../shared/model/job";
import { Company } from "../../shared/model/company";
import { CompanyService } from "../../shared/services/company.service";
import { Subscription } from "rxjs/Rx";
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-job-item-admin',
  templateUrl: './job-item-admin.component.html',
  styleUrls: ['./job-item-admin.component.less']
})
export class JobItemAdminComponent implements OnInit, OnDestroy {

  @Input() job: Job;
  public company: Company;
  private sub: Subscription;

  constructor(private companyService: CompanyService, private jobService: JobService, private zone: NgZone) { }

  ngOnInit() {
    if(this.job.companyKey) {
      this.sub = this.companyService.findCompanyById(this.job.companyKey).subscribe(val => {
        this.zone.run(() => {
          this.company = val;
        });
      });
    }
  }

  onRemove(key: string, type: string, city: string, companyKey: string, field: string) {
    if(confirm("Bạn muốn xóa công việc này?")) {
      this.jobService.removeJob(key, type, city, companyKey, field);
    }
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
