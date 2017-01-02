import { metaConfig } from './../environments/metadata.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { MetaModule } from 'ng2-meta';
import { routing } from './app.routing';

import { AngularFireModule } from "angularfire2";
import { firebaseConfig, authConfig } from "../environments/firebase.config";

import { AdminModule } from './admin/admin.module';
import { SessionsModule } from './sessions/sessions.module';
import { JobsModule } from './jobs/jobs.module';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { JobService } from "./shared/services/job.service";
import { AuthService } from "./shared/services/auth.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    JobsModule,
    SessionsModule,
    AdminModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MetaModule.forRoot(metaConfig)
  ],
  providers: [JobService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
