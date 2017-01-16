import { AuthGuard } from './../shared/guards/auth.guard';
import { JobsListAdminComponent } from './jobs-list-admin/jobs-list-admin.component';
import { StatisticComponent } from './statistic/statistic.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';

const ADMIN_ROUTES: Routes = [
    { path: "admin", component: AdminComponent, canActivateChild: [AuthGuard], children: [
        { path: "stat", component: StatisticComponent },
        { path: "new", component: NewJobComponent },
        { path: "edit/:id/:url", component: EditJobComponent },
        { path: "jobs", component: JobsListAdminComponent },
        { path: "", redirectTo: "stat", pathMatch: "full"}
    ] }
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);