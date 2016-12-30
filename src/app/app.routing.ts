import { RouterModule, Routes } from "@angular/router";

import { JobsComponent } from "./jobs/jobs.component";
import { JobsListComponent } from "./jobs/jobs-list/jobs-list.component";
import { JobDetailComponent } from "./jobs/job-detail/job-detail.component";
import { AdminComponent } from "./admin/admin.component";
import { JobFormAdminComponent } from "./admin/job-form-admin/job-form-admin.component";
import { JobsListAdminComponent } from "./admin/jobs-list-admin/jobs-list-admin.component";
import { NewJobComponent } from "./admin/new-job/new-job.component";
import { EditJobComponent } from "./admin/edit-job/edit-job.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { AuthGuard } from "./shared/services/auth.guard";
import { LoginGuard } from "./shared/services/login.guard";

const APP_ROUTES: Routes = [
    { path: "jobs", component: JobsComponent, children: [
        { path: ":id/:url", component: JobDetailComponent },
        { path: "", component: JobsListComponent }
    ] },
    { path: "admin", component: AdminComponent, canActivate: [AuthGuard], children: [
    // { path: "admin", component: AdminComponent, children: [
        { path: "new", component: NewJobComponent },
        { path: "edit/:id/:url", component: EditJobComponent },
        { path: "jobs", component: JobsListAdminComponent },
        { path: "", redirectTo: "jobs", pathMatch: "full"}
    ] },
    { path: "login", component: SessionsComponent, canActivate: [LoginGuard] },
    // { path: "login", component: SessionsComponent },
    { path: "", redirectTo: "jobs", pathMatch: "full"},
    { path: '**', redirectTo: 'jobs' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);