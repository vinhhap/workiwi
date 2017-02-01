import { PageTitleAdminService } from './../shared/services/page-title-admin.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { adminRouting } from './admin.routing';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { JobFormAdminComponent } from './job-form-admin/job-form-admin.component';
import { JobsListAdminComponent } from './jobs-list-admin/jobs-list-admin.component';
import { NavbarAdminComponent } from './shared/navbar-admin.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { SidebarAdminComponent } from './shared/sidebar-admin.component';
import { StatisticComponent } from './statistic/statistic.component';
import { StatisticService } from "../shared/services/statistic.service";
import { CompanyFormAdminComponent } from './company-form-admin/company-form-admin.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { CompanyListAdminComponent } from './company-list-admin/company-list-admin.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { JobItemAdminComponent } from './job-item-admin/job-item-admin.component';

@NgModule({
    declarations: [
        AdminComponent,
        NavbarAdminComponent,
        JobFormAdminComponent,
        JobsListAdminComponent,
        NewJobComponent,
        EditJobComponent,
        SidebarAdminComponent,
        StatisticComponent,
        CompanyFormAdminComponent,
        NewCompanyComponent,
        CompanyListAdminComponent,
        EditCompanyComponent,
        JobItemAdminComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        adminRouting
    ],
    providers: [
        AuthGuard,
        PageTitleAdminService,
        StatisticService
    ]
})
export class AdminModule {

}