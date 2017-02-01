import { AuthGuard } from './../shared/guards/auth.guard';
import { JobsListAdminComponent } from './jobs-list-admin/jobs-list-admin.component';
import { StatisticComponent } from './statistic/statistic.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { AdminComponent } from './admin.component';
import { NewCompanyComponent } from "./new-company/new-company.component";
import { CompanyListAdminComponent } from "./company-list-admin/company-list-admin.component";
import { EditCompanyComponent } from "./edit-company/edit-company.component";
import { Routes, RouterModule } from '@angular/router';

const ADMIN_ROUTES: Routes = [
    { path: "admin", component: AdminComponent, canActivateChild: [AuthGuard], children: [
        { path: "stat", component: StatisticComponent },
        { path: "jobs/new", component: NewJobComponent },
        { path: "jobs/edit/:id/:url", component: EditJobComponent },
        { path: "jobs", component: JobsListAdminComponent },
        { path: "companies/new", component: NewCompanyComponent },
        { path: "companies/edit/:id", component: EditCompanyComponent },
        { path: "companies", component: CompanyListAdminComponent },
        { path: "", redirectTo: "stat", pathMatch: "full"}
    ] }
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);