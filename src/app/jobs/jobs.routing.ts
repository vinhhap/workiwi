import { JobsComponent } from './jobs.component';
import { Routes, RouterModule } from '@angular/router';

import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const JOBS_ROUTES: Routes = [
    { path: "jobs", component: JobsComponent, children: [
        { path: ":id/:url", component: JobDetailComponent },
        { path: "", component: JobsListComponent }
    ] } 
];

export const jobsRouting = RouterModule.forChild(JOBS_ROUTES);