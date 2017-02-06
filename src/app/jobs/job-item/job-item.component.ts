import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Job } from "../../shared/model/job";
import { Router } from "@angular/router";
import { Company } from "../../shared/model/company";
import { CompanyService } from "../../shared/services/company.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jb-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.less']
})
export class JobItemComponent implements OnInit, OnDestroy {
  
  @Input() job: Job;
  private sub: Subscription;
  public company: Company;

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
