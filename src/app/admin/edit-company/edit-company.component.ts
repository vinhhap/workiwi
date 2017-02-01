import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from "../../shared/model/company";
import { CompanyService } from "../../shared/services/company.service";
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from "@angular/router";
import { PageTitleAdminService } from './../../shared/services/page-title-admin.service';
import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'jb-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.less']
})
export class EditCompanyComponent implements OnInit, OnDestroy {

  public company: Company;
  private companyId: string;
  private sub: Subscription;

  constructor(
    private companyService: CompanyService, 
    private route: ActivatedRoute,
    private pageTitleAdminService: PageTitleAdminService,
    private seoService: SeoService) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.params["id"];
    this.sub = this.companyService.findCompanyById(this.companyId).subscribe(company => {
      this.company = company;
      if(company) {
        this.seoService.setTitle(`Chỉnh sửa ${this.company.name} | Workiwi | Trang tuyển dụng việc làm cho Start Up`);
        this.seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
        this.seoService.setMetaRobots('None');
        this.pageTitleAdminService.changeTitle(`<i class="fa fa-pencil-square" aria-hidden="true"></i> Chỉnh sửa ${this.company.name}`);
      }
    });
  }

  onSave(form) {
    this.companyService.editCompany(form.form.value, this.companyId);
  }

  onRemove(key: string) {
    if(confirm("Bạn muốn xóa công ty này?")) {
      this.companyService.removeCompany(key);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
