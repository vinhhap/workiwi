import { SeoService } from './shared/services/seo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
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
import { SearchService } from './shared/services/search.service';
import { CityListService } from "./shared/services/city-list.service";

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
    AdminModule
  ],
  providers: [
    JobService,
    AuthService,
    SeoService,
    SearchService,
    CityListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
