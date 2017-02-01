import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Job } from "../../shared/model/job";
import { Company } from "../../shared/model/company";
import { CompanyService } from "../../shared/services/company.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-job-item-admin',
  templateUrl: './job-item-admin.component.html',
  styleUrls: ['./job-item-admin.component.less']
})
export class JobItemAdminComponent implements OnInit, OnDestroy {

  @Input() job: Job;
  public company: Company;
  private sub: Subscription;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    if(this.job.companyKey) {
      this.sub = this.companyService.findCompanyById(this.job.companyKey).subscribe(val => {
        this.company = val;
      });
    }
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
