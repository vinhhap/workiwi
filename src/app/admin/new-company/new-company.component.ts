import { Component, OnInit } from '@angular/core';
import { PageTitleAdminService } from './../../shared/services/page-title-admin.service';
import { CompanyService } from "./../../shared/services/company.service";
import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'jb-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.less']
})
export class NewCompanyComponent implements OnInit {

  constructor(
    private pageTitleAdminService: PageTitleAdminService, 
    private companyService: CompanyService,
    private seoService: SeoService) {
      seoService.setTitle('Thêm công ty | Workiwi | Trang tuyển dụng việc làm cho Start Up');
      seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
      seoService.setMetaRobots('None');
    }

  ngOnInit() {
    this.pageTitleAdminService.changeTitle('<i class="fa fa-plus-circle" aria-hidden="true"></i> Thêm công ty');
  }

  onSave(form) {
    this.companyService.createNewCompany(form.form.value);
  }

  onReset(form) {
    form.form.reset();
  }

}
