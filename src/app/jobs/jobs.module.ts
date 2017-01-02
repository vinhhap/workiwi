import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { jobsRouting } from './jobs.routing';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobsComponent } from './jobs.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { NavbarJobComponent } from './shared/navbar-job.component';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
    declarations: [
        NavbarJobComponent,
        JobsListComponent,
        JobItemComponent,
        JobDetailComponent,
        JobsComponent
    ],
    imports: [
        CommonModule,
        Ng2SimplePageScrollModule.forRoot(),
        jobsRouting,
        Angulartics2Module.forChild()
    ]
})
export class JobsModule { }