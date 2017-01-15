import { DeadlineDatePipe } from './../shared/pipes/deadline-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { jobsRouting } from './jobs.routing';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobsComponent } from './jobs.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { NavbarJobComponent } from './shared/navbar-job.component';
import { ShareButtonsModule } from "ng2-sharebuttons";
import { SearchBarJobsComponent } from './shared/search-bar-jobs.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
    declarations: [
        NavbarJobComponent,
        JobsListComponent,
        JobItemComponent,
        JobDetailComponent,
        JobsComponent,
        SearchBarJobsComponent,
        DeadlineDatePipe
    ],
    imports: [
        CommonModule,
        Ng2SimplePageScrollModule.forRoot(),
        jobsRouting,
        FormsModule,
        ShareButtonsModule,
        ReactiveFormsModule,
        SlimLoadingBarModule.forRoot(),
        Ng2AutoCompleteModule
    ]
})
export class JobsModule { }