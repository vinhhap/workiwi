import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarJobComponent } from './jobs/shared/navbar-job.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll';

import { routing } from './app.routing';
import { JobsComponent } from './jobs/jobs.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './admin/shared/navbar-admin.component';
import { JobFormAdminComponent } from './admin/job-form-admin/job-form-admin.component';
import { JobsListAdminComponent } from './admin/jobs-list-admin/jobs-list-admin.component';
import { SessionsComponent } from './sessions/sessions.component';

import { AngularFireModule } from "angularfire2";
import { firebaseConfig, authConfig } from "../environments/firebase.config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { NewJobComponent } from './admin/new-job/new-job.component';
import { JobService } from "./shared/services/job.service";
import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { LoginGuard } from "./shared/services/login.guard";
import { EditJobComponent } from './admin/edit-job/edit-job.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarJobComponent,
    JobsListComponent,
    JobItemComponent,
    JobDetailComponent,
    JobsComponent,
    AdminComponent,
    NavbarAdminComponent,
    JobFormAdminComponent,
    JobsListAdminComponent,
    SessionsComponent,
    NewJobComponent,
    EditJobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    CKEditorModule,
    Ng2SimplePageScrollModule.forRoot()
  ],
  providers: [JobService, AuthService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
