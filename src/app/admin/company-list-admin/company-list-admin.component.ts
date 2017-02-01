import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from "../../shared/services/company.service";
import { Company } from "../../shared/model/company";
import { Subscription } from "rxjs/Rx";
import { PageTitleAdminService } from "../../shared/services/page-title-admin.service";
import { SeoService } from "../../shared/services/seo.service"; 

@Component({
  selector: 'jb-company-list-admin',
  templateUrl: './company-list-admin.component.html',
  styleUrls: ['./company-list-admin.component.less']
})
export class CompanyListAdminComponent implements OnInit, OnDestroy {

  public companies: Company[] = [];
  private sub1: Subscription;

  constructor(
    private companyService: CompanyService,
    private pageTitleAdminService: PageTitleAdminService,
    private seoService: SeoService) {
      seoService.setTitle('Danh sách công ty | Workiwi | Trang tuyển dụng việc làm cho Start Up');
      seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
      seoService.setMetaRobots('None');
    }

  ngOnInit() {
    this.pageTitleAdminService.changeTitle('<i class="fa fa-address-card" aria-hidden="true"></i> Danh sách công ty')
    this.sub1 = this.companyService.findAllCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  onRemove(key: string) {
    if(confirm("Bạn muốn xóa công ty này?")) {
      this.companyService.removeCompany(key);
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
