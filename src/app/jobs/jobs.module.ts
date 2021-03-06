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
import { JobListCacheService } from "../shared/services/job-list-cache.service";
// import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { JobTypePipe } from "../shared/pipes/job-type.pipe";
import { ClientLoadingComponent } from './shared/client-loading.component';

@NgModule({
    declarations: [
        NavbarJobComponent,
        JobsListComponent,
        JobItemComponent,
        JobDetailComponent,
        JobsComponent,
        SearchBarJobsComponent,
        DeadlineDatePipe,
        JobTypePipe,
        ClientLoadingComponent
    ],
    imports: [
        CommonModule,
        Ng2SimplePageScrollModule.forRoot(),
        jobsRouting,
        FormsModule,
        ShareButtonsModule,
        ReactiveFormsModule,
        SlimLoadingBarModule.forRoot(),
        // InfiniteScrollModule
    ],
    providers: [
        JobListCacheService
    ]
})
export class JobsModule { }