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

@NgModule({
    declarations: [
        AdminComponent,
        NavbarAdminComponent,
        JobFormAdminComponent,
        JobsListAdminComponent,
        NewJobComponent,
        EditJobComponent,
        SidebarAdminComponent,
        StatisticComponent
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